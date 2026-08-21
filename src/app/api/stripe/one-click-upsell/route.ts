import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

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

    // Sin filtro de tipo: en Perú mucha gente paga con Link, y buscar solo
    // 'card' dejaba fuera a esos clientes con un "no hay tarjeta guardada".
    const paymentMethods = await stripe.paymentMethods.list({ customer: customerId });

    if (!paymentMethods.data || paymentMethods.data.length === 0) {
      return NextResponse.json(
        { error: 'No se encontró un método de pago guardado para este cliente.' },
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
        email: customerEmail,
        name: customerName,
      },
    });

    if (paymentIntent.status === 'succeeded') {
      // La entrega al comprador y el aviso al admin los dispara
      // /api/webhooks/stripe con el evento payment_intent.succeeded.
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
