import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import {
  getPlanEnCuotas,
  getProductDetails,
  getVerifiedPrice,
  type Currency,
  type ProductID,
} from '@cerradorexperto/lib/pricing';

/**
 * Cobro en cuotas con una suscripción de Stripe.
 *
 * Stripe cobra cada cuota sola, reintenta las que fallan y avisa por webhook.
 * La suscripción se cancela al llegar a la última cuota: eso lo hace
 * /api/webhooks/stripe contando las facturas pagadas, que es exacto aunque
 * alguna cuota se atrase o falle.
 */

/** Busca el precio recurrente del plan, o lo crea la primera vez. */
async function obtenerPrecioRecurrente(
  productId: ProductID,
  currency: Currency,
  montoPorCuota: number,
  intervalo: 'month'
) {
  const lookupKey = `${productId}__${currency.toLowerCase()}__${intervalo}`;

  const existentes = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  });
  if (existentes.data.length > 0) return existentes.data[0];

  const detalle = getProductDetails(productId);
  const producto = await stripe.products.create({
    name: detalle?.description || productId,
    metadata: { productId },
  });

  return stripe.prices.create({
    product: producto.id,
    currency: currency.toLowerCase(),
    unit_amount: Math.round(montoPorCuota * 100),
    recurring: { interval: intervalo },
    lookup_key: lookupKey,
    metadata: { productId },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productId,
      currency = 'PEN',
      email,
      name,
      phone,
      country,
      customerId: customerIdEntrante,
    } = body as {
      productId: ProductID;
      currency?: Currency;
      email?: string;
      name?: string;
      phone?: string;
      country?: string;
      customerId?: string;
    };

    const plan = getPlanEnCuotas(productId);
    if (!plan) {
      return NextResponse.json(
        { error: `El producto "${productId}" no se vende en cuotas.` },
        { status: 400 }
      );
    }

    // El monto sale del catálogo del servidor, nunca del cliente:
    // si viniera del navegador, cualquiera podría pagar S/1.
    const montoPorCuota = getVerifiedPrice(productId, currency);
    if (!montoPorCuota) {
      return NextResponse.json(
        { error: `No hay precio definido para ${productId} en ${currency}.` },
        { status: 400 }
      );
    }

    // 1. Cliente
    let customerId = customerIdEntrante;
    if (!customerId) {
      if (!email) {
        return NextResponse.json(
          { error: 'Se requiere un correo para iniciar el plan en cuotas.' },
          { status: 400 }
        );
      }
      const existentes = await stripe.customers.list({ email, limit: 1 });
      customerId =
        existentes.data[0]?.id ||
        (
          await stripe.customers.create({
            email,
            name: name || undefined,
            phone: phone || undefined,
            metadata: { source: 'hugoherreracoach', country: country || '' },
          })
        ).id;
    }

    // 2. Precio recurrente
    const precio = await obtenerPrecioRecurrente(productId, currency, montoPorCuota, plan.intervalo);

    // 3. ¿Tiene ya un método de pago guardado? (cualquier tipo, no solo tarjeta:
    //    en Perú mucha gente paga con Link y filtrar por 'card' los deja fuera)
    const metodos = await stripe.paymentMethods.list({ customer: customerId, limit: 1 });
    const metodoGuardado = metodos.data[0]?.id;

    const metadata = {
      productId,
      programa: plan.programa,
      cuotasTotales: String(plan.cuotas),
      email: email || '',
      name: name || '',
      phone: phone || '',
      country: country || '',
    };

    // 4. Suscripción
    const suscripcion = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: precio.id }],
      // Con método guardado cobramos de una (1-clic). Sin él, el cliente
      // confirma la primera cuota en el formulario y ahí queda activa.
      payment_behavior: metodoGuardado ? 'error_if_incomplete' : 'default_incomplete',
      ...(metodoGuardado ? { default_payment_method: metodoGuardado } : {}),
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: undefined,
      },
      description: `${getProductDetails(productId)?.description || productId} — ${plan.cuotas} cuotas de ${currency} ${montoPorCuota}`,
      expand: ['latest_invoice.payment_intent'],
      metadata,
    });

    const factura: any = suscripcion.latest_invoice;
    const intento = factura?.payment_intent;

    return NextResponse.json({
      subscriptionId: suscripcion.id,
      customerId,
      status: suscripcion.status,
      cuotas: plan.cuotas,
      montoPorCuota,
      currency,
      // Cobro inmediato con método guardado
      cobradoDeInmediato: suscripcion.status === 'active',
      // Para el formulario: el cliente confirma la primera cuota
      clientSecret: intento?.client_secret ?? null,
    });
  } catch (error: any) {
    console.error('[Stripe Suscripción] Error creando el plan en cuotas:', error);
    return NextResponse.json(
      { error: error.message || 'No se pudo iniciar el plan en cuotas.' },
      { status: 500 }
    );
  }
}
