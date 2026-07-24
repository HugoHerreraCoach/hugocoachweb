import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD', email, name, productId, description } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Monto inválido.' }, { status: 400 });
    }

    // 1. Buscar o crear cliente en Stripe
    let customerId: string | undefined;
    if (email) {
      const existingCustomers = await stripe.customers.list({
        email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({
          email,
          name: name || undefined,
          metadata: { source: 'hugoherreracoach' },
        });
        customerId = newCustomer.id;
      }
    }

    // 2. Convertir monto a la unidad mínima de moneda (ej: USD $7.00 -> 700 centavos)
    const unitAmount = Math.round(amount * 100);

    // 3. Crear PaymentIntent en Stripe habilitando guardado de tarjeta para 1-Click Upsell
    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency: currency.toLowerCase(),
      customer: customerId,
      setup_future_usage: 'off_session', // Habilita 1-Click Upsells posteriores
      description: description || `Compra de ${productId || 'producto'}`,
      metadata: {
        productId: productId || 'custom',
        email: email || '',
        name: name || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId,
    });
  } catch (error: any) {
    console.error('Error al crear PaymentIntent de Stripe:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar el pago con Stripe.' },
      { status: 500 }
    );
  }
}
