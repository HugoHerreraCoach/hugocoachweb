import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendPurchaseNotificationToAdmin } from '@/lib/sendPurchaseNotification';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, productId, amount, currency = 'USD', description } = body;

    if (!customerId) {
      return NextResponse.json(
        { error: 'ID de cliente requerido para pago de 1-Clic.' },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Monto inválido para el Upsell.' }, { status: 400 });
    }

    // Buscar datos del cliente para la notificación
    let customerEmail = 'Cliente';
    let customerName = 'Cliente';
    try {
      const customer = await stripe.customers.retrieve(customerId);
      if (!customer.deleted) {
        customerEmail = customer.email || 'Sin email';
        customerName = customer.name || 'Cliente';
      }
    } catch (cErr) {
      console.warn('No se pudo obtener datos del cliente para upsell:', cErr);
    }

    // Buscar método de pago registrado del cliente
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    if (!paymentMethods.data || paymentMethods.data.length === 0) {
      return NextResponse.json(
        { error: 'No se encontró una tarjeta guardada para este cliente.' },
        { status: 400 }
      );
    }

    const defaultPaymentMethod = paymentMethods.data[0].id;
    const unitAmount = Math.round(amount * 100);
    const productTitle = description || `1-Click Upsell: ${productId}`;

    // Crear y confirmar el cobro off-session (1-Click Upsell)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency: currency.toLowerCase(),
      customer: customerId,
      payment_method: defaultPaymentMethod,
      off_session: true,
      confirm: true,
      description: productTitle,
      metadata: {
        productId,
        isUpsell: 'true',
        customerEmail,
        customerName,
      },
    });

    if (paymentIntent.status === 'succeeded') {
      try {
        await sendPurchaseNotificationToAdmin({
          customerName,
          customerEmail,
          productName: `[1-CLICK UPSELL] ${productTitle}`,
          amount,
          currency: currency.toUpperCase(),
          transactionId: paymentIntent.id,
          paymentMethod: 'Stripe (1-Click Guardado)',
          additionalDetails: {
            'ID Producto': productId,
            'Tipo de Venta': '1-Click Upsell Inmediato',
            'Customer ID': customerId,
          },
        });
      } catch (notifyErr) {
        console.error('[Upsell Brevo Notification] Error:', notifyErr);
      }

      return NextResponse.json({
        success: true,
        paymentIntentId: paymentIntent.id,
        message: '¡Pago de 1-Clic procesado exitosamente!',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: paymentIntent.status,
          message: 'El pago requiere autenticación adicional.',
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error procesando 1-Click Upsell:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la oferta de 1-Clic.' },
      { status: 500 }
    );
  }
}
