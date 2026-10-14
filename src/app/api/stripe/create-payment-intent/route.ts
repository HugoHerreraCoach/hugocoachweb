import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { esProductoLiderExperto, montoLiderExperto } from '@liderexperto/lib/productos';
import { primeraIp } from '@/lib/metaConversions';

/** Texto limpio y acotado: lo que llega del navegador nunca se guarda tal cual. */
const texto = (valor: unknown, max = 200) =>
  typeof valor === 'string' ? valor.trim().slice(0, max) : '';

/** Dirección de envío en el formato que Stripe guarda en `shipping`. */
function limpiarEnvio(raw: any) {
  const line1 = texto(raw?.line1);
  if (!line1) return undefined;
  return {
    name: texto(raw.name) || 'Cliente',
    phone: texto(raw.phone, 30) || undefined,
    address: {
      line1,
      line2: texto(raw.line2) || undefined,
      city: texto(raw.city) || undefined,
      state: texto(raw.state) || undefined,
      postal_code: texto(raw.postal_code, 20) || undefined,
      country: texto(raw.country, 2).toUpperCase() || 'PE',
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      email,
      name,
      phone,
      country,
      address,
      productId,
      description,
      shipping,
    } = body;
    let { currency = 'USD' } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Monto inválido.' }, { status: 400 });
    }

    // Productos del embudo de Líder Experto (libro con sus bumps, Lobos): el monto sale del
    // catálogo del servidor, no del navegador. Así nadie puede pagar menos de lo que vale, ni el
    // id decir que lleva audiolibro cuando se pagó solo el libro.
    if (typeof productId === 'string' && esProductoLiderExperto(productId)) {
      currency = 'PEN';
      const esperado = montoLiderExperto(productId);
      if (esperado === undefined || Math.abs(esperado - Number(amount)) > 0.005) {
        return NextResponse.json(
          { error: 'El monto no coincide con tu pedido. Recarga la página e inténtalo de nuevo.' },
          { status: 400 }
        );
      }
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
          phone: phone || undefined,
          metadata: { source: 'hugoherreracoach', country: country || '' },
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
      shipping: limpiarEnvio(shipping),
      metadata: {
        productId: productId || 'custom',
        email: email || '',
        name: name || '',
        phone: phone || '',
        country: country || '',
        address: texto(address, 450),
        description: description || '',
        // Del navegador del comprador: el webhook los usa para reportar la compra a Meta
        // (el pago se confirma después, cuando ya no tenemos su petición a mano).
        fbp: texto(req.cookies.get('_fbp')?.value, 100),
        fbc: texto(req.cookies.get('_fbc')?.value, 200),
        ip: texto(primeraIp(req.headers.get('x-forwarded-for')), 60),
        ua: texto(req.headers.get('user-agent'), 400),
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
