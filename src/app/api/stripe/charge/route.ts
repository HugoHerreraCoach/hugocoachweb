import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      currency = 'USD',
      email,
      name,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      description,
    } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Monto de pago inválido.' }, { status: 400 });
    }

    // 1. Buscar o crear cliente en Stripe
    let customerId: string | undefined;
    if (email) {
      const existingCustomers = await stripe.customers.list({ email, limit: 1 });
      if (existingCustomers.data.length > 0) {
        customerId = existingCustomers.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({
          email,
          name: name || undefined,
        });
        customerId = newCustomer.id;
      }
    }

    // 2. Crear Método de Pago de Tarjeta
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber.replace(/\s+/g, ''),
        exp_month: parseInt(expiryMonth, 10),
        exp_year: parseInt(expiryYear.length === 2 ? `20${expiryYear}` : expiryYear, 10),
        cvc: String(cvc),
      },
      billing_details: {
        name: name || undefined,
        email: email || undefined,
      },
    });

    // 3. Vincular el método de pago al cliente
    if (customerId) {
      await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerId });
    }

    const unitAmount = Math.round(amount * 100);

    // 4. Crear y confirmar PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency: currency.toLowerCase(),
      customer: customerId,
      payment_method: paymentMethod.id,
      off_session: true,
      confirm: true,
      setup_future_usage: 'off_session',
      description: description || 'Compra de Programa Líder Experto',
      metadata: {
        email: email || '',
        name: name || '',
      },
    });

    if (paymentIntent.status === 'succeeded') {
      return NextResponse.json({
        success: true,
        transactionId: paymentIntent.id,
        customerId,
        message: '¡Pago procesado exitosamente con Stripe!',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: paymentIntent.status,
          error: 'El pago requiere verificación adicional de tu banco.',
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error al procesar cobro con Stripe en liderexperto:', error);
    return NextResponse.json(
      { error: error.message || 'No se pudo procesar el pago con tarjeta.' },
      { status: 500 }
    );
  }
}
