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

    // Crear y confirmar el cobro off-session (1-Click Upsell)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency: currency.toLowerCase(),
      customer: customerId,
      payment_method: defaultPaymentMethod,
      off_session: true,
      confirm: true,
      description: description || `1-Click Upsell: ${productId}`,
      metadata: {
        productId,
        isUpsell: 'true',
      },
    });

    if (paymentIntent.status === 'succeeded') {
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
