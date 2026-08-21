import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendPurchaseNotificationToAdmin } from '@/lib/sendPurchaseNotification';
import { validarEnvio, type DatosEnvio } from '@cerradorexperto/lib/envio';

/**
 * Dirección de envío del libro físico.
 *
 * Se pide DESPUÉS de pagar, en /gracias: el libro digital es una compra de
 * impulso y meter seis campos antes del botón cuesta conversión. La dirección
 * se guarda en el campo `shipping` del PaymentIntent, que es donde Stripe
 * espera encontrarla.
 */

function incluyeLibroFisico(productId?: string) {
  return !!productId?.includes('libro-fisico');
}

/** ¿A esta compra le falta la dirección? */
export async function GET(req: NextRequest) {
  const pi = req.nextUrl.searchParams.get('pi');
  if (!pi || !pi.startsWith('pi_')) {
    return NextResponse.json({ requiereDireccion: false });
  }

  try {
    const intent = await stripe.paymentIntents.retrieve(pi);
    const requiere = incluyeLibroFisico(intent.metadata?.productId);
    const yaTiene = !!intent.shipping?.address?.line1;

    return NextResponse.json({
      requiereDireccion: requiere && !yaTiene,
      yaRegistrada: requiere && yaTiene,
      // Solo lo necesario para prellenar. Nada de montos ni correo.
      nombre: intent.metadata?.name || '',
    });
  } catch {
    return NextResponse.json({ requiereDireccion: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId, ...datos } = (await req.json()) as { paymentIntentId: string } & DatosEnvio;

    if (!paymentIntentId?.startsWith('pi_')) {
      return NextResponse.json({ error: 'Compra no identificada.' }, { status: 400 });
    }

    const error = validarEnvio(datos);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!incluyeLibroFisico(intent.metadata?.productId)) {
      return NextResponse.json({ error: 'Esta compra no incluye envío físico.' }, { status: 400 });
    }

    const shipping = {
      name: datos.nombre,
      phone: datos.telefono,
      address: {
        line1: datos.direccion,
        line2: datos.referencia || undefined,
        city: datos.distrito,
        state: datos.departamento,
        country: 'PE',
      },
    };

    await stripe.paymentIntents.update(paymentIntentId, {
      shipping,
      metadata: { ...intent.metadata, dni: datos.dni, envioRegistrado: 'true' },
    });

    // El cliente también queda con la dirección, para futuros envíos.
    if (typeof intent.customer === 'string') {
      await stripe.customers.update(intent.customer, { shipping }).catch(() => {});
    }

    // Aviso a Hugo para que despache.
    try {
      await sendPurchaseNotificationToAdmin({
        customerName: datos.nombre,
        customerEmail: intent.metadata?.email || 'Sin email',
        customerPhone: datos.telefono,
        customerAddress: datos.direccion,
        customerCity: datos.distrito,
        customerDepartment: datos.departamento,
        customerCountry: 'Perú',
        productName: '📦 DIRECCIÓN DE ENVÍO RECIBIDA — Libro físico',
        amount: (intent.amount_received || 0) / 100,
        currency: (intent.currency || 'PEN').toUpperCase(),
        transactionId: paymentIntentId,
        paymentMethod: 'Stripe',
        additionalDetails: {
          DNI: datos.dni,
          Referencia: datos.referencia || '—',
          '📦 ACCIÓN REQUERIDA': 'Despachar el libro físico a esta dirección.',
        },
      });
    } catch (err) {
      console.error('[Dirección de envío] No se pudo avisar al admin:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('[Dirección de envío] Error guardando:', error);
    return NextResponse.json({ error: 'No se pudo guardar la dirección.' }, { status: 500 });
  }
}
