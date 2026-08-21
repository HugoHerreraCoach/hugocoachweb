import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import * as Brevo from '@getbrevo/brevo';
import { sendPurchaseNotificationToAdmin } from '@/lib/sendPurchaseNotification';
import { sendAccessEmailToCustomer } from '@/lib/sendAccessEmail';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/** Lista "Compradores CE" en Brevo. */
const LISTA_COMPRADORES_CE = 13;

async function addContactToBrevo(email: string, firstName: string, listId: number) {
  try {
    if (!process.env.BREVO_API_KEY) return;
    const contactsApi = new Brevo.ContactsApi();
    contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    const createContact = new Brevo.CreateContact();
    createContact.email = email;
    createContact.attributes = { NOMBRE: firstName };
    createContact.listIds = [listId];
    createContact.updateEnabled = true;

    await contactsApi.createContact(createContact);
    console.log(`[Stripe Webhook] Contacto ${email} añadido a Brevo (Lista ${listId}).`);
  } catch (error) {
    console.error('[Stripe Webhook] Error al añadir contacto a Brevo:', error);
  }
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: any;

  // La firma es obligatoria. Sin esto, cualquiera que conozca la URL podría
  // simular una compra y hacer que le enviemos los accesos a quien quiera.
  if (!webhookSecret) {
    console.error('[Stripe Webhook] Falta STRIPE_WEBHOOK_SECRET. Se rechaza el evento.');
    return NextResponse.json({ error: 'Webhook no configurado.' }, { status: 500 });
  }
  if (!signature) {
    console.error('[Stripe Webhook] Petición sin firma de Stripe. Rechazada.');
    return NextResponse.json({ error: 'Falta la firma de Stripe.' }, { status: 400 });
  }

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error('[Stripe Webhook] Firma inválida:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Manejo de eventos
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      const metadata = paymentIntent.metadata || {};
      const { email, name, productId, phone, country, address, description, isUpsell } = metadata;
      const customerEmail = email || paymentIntent.receipt_email || paymentIntent.customer_email || 'Sin email';
      const customerName = name || 'Cliente';
      const rawAmount = (paymentIntent.amount_received || paymentIntent.amount || 0) / 100;
      const currency = (paymentIntent.currency || 'USD').toUpperCase();
      const productName = description || (productId ? `Producto: ${productId}` : 'Compra en Hugo Herrera Coach');

      // Los cobros de una suscripción llegan también por aquí. Si los tratáramos
      // como compras sueltas, el cliente recibiría su correo de acceso una vez
      // por cuota. Esos los maneja 'invoice.paid'.
      if (paymentIntent.invoice) {
        console.log(`[Stripe Webhook] ${paymentIntent.id} es cobro de una cuota; lo maneja invoice.paid.`);
        break;
      }

      // Lobos vive en Hotmart, no se entrega solo: hay que matricular a mano.
      const requiereMatriculaHotmart = !!productId?.includes('comunidad-lobos');
      const incluyeLibroFisico = !!productId?.includes('libro-fisico');

      console.log(`[Stripe Webhook] Pago exitoso para ${customerEmail} (${productName}) - Monto: ${currency} ${rawAmount}`);

      // 1. ENTREGA AL COMPRADOR. Es lo primero porque es lo único que el cliente ve.
      if (customerEmail && customerEmail !== 'Sin email') {
        try {
          await sendAccessEmailToCustomer({
            customerName,
            customerEmail,
            productId: productId || '',
          });
        } catch (accessErr) {
          console.error('[Stripe Webhook] ❌ FALLÓ LA ENTREGA al comprador:', customerEmail, accessErr);
        }
      } else {
        console.error('[Stripe Webhook] ❌ Pago sin email de comprador, imposible entregar:', paymentIntent.id);
      }

      // 2. Notificación al administrador
      try {
        await sendPurchaseNotificationToAdmin({
          customerName,
          customerEmail,
          customerPhone: phone || undefined,
          customerCountry: country || undefined,
          customerAddress: address || undefined,
          productName: isUpsell === 'true' ? `[1-CLICK UPSELL] ${productName}` : productName,
          amount: rawAmount,
          currency,
          transactionId: paymentIntent.id,
          paymentMethod: 'Stripe (Tarjeta)',
          additionalDetails: {
            'ID Producto': productId || 'N/A',
            'Tipo de Pago': isUpsell === 'true' ? '1-Click Upsell' : 'Checkout Regular',
            'Estado': paymentIntent.status,
            ...(requiereMatriculaHotmart
              ? { '⚠️ ACCIÓN REQUERIDA': `MATRICULAR a ${customerEmail} en Hotmart (Lobos de Ventas). El cliente ya pagó y está esperando.` }
              : {}),
            ...(incluyeLibroFisico
              ? { '📦 ACCIÓN REQUERIDA': `ENVIAR libro físico. Se le pidió la dirección por correo — revisa la respuesta de ${customerEmail}.` }
              : {}),
          },
        });
      } catch (notifyErr) {
        console.error('[Stripe Webhook] Error al enviar email de notificación:', notifyErr);
      }

      // 3. Registrar como comprador en Brevo
      if (customerEmail && customerEmail !== 'Sin email' && productId?.includes('libro-digital')) {
        await addContactToBrevo(customerEmail, customerName, LISTA_COMPRADORES_CE);
      }
      break;
    }
    // ---- CUOTAS DE UN PLAN (suscripción de Stripe) ----
    case 'invoice.paid': {
      const invoice = event.data.object;
      const subId =
        invoice.subscription || invoice.parent?.subscription_details?.subscription;
      if (!subId) break;

      const suscripcion = await stripe.subscriptions.retrieve(
        typeof subId === 'string' ? subId : subId.id
      );
      const meta = suscripcion.metadata || {};
      const cuotasTotales = parseInt(meta.cuotasTotales || '0', 10);
      const customerEmail = meta.email || invoice.customer_email || 'Sin email';
      const customerName = meta.name || 'Cliente';
      const monto = (invoice.amount_paid || 0) / 100;
      const currency = (invoice.currency || 'PEN').toUpperCase();

      // Contamos facturas pagadas: es exacto aunque una cuota se atrase o falle.
      const facturas = await stripe.invoices.list({
        subscription: typeof subId === 'string' ? subId : subId.id,
        status: 'paid',
        limit: 100,
      });
      const cuotaActual = facturas.data.length;

      console.log(`[Stripe Webhook] Cuota ${cuotaActual}/${cuotasTotales} cobrada a ${customerEmail}`);

      // La primera cuota es la que da el acceso.
      if (cuotaActual === 1 && customerEmail !== 'Sin email') {
        try {
          await sendAccessEmailToCustomer({
            customerName,
            customerEmail,
            productId: meta.productId || '',
          });
        } catch (err) {
          console.error('[Stripe Webhook] ❌ FALLÓ LA ENTREGA tras la primera cuota:', err);
        }
      }

      const esUltima = cuotasTotales > 0 && cuotaActual >= cuotasTotales;

      // Al llegar a la última cuota cerramos el plan: si no, seguiría cobrando.
      if (esUltima && suscripcion.status !== 'canceled') {
        await stripe.subscriptions.cancel(suscripcion.id);
        console.log(`[Stripe Webhook] Plan completado (${cuotaActual}/${cuotasTotales}). Suscripción cancelada.`);
      }

      try {
        await sendPurchaseNotificationToAdmin({
          customerName,
          customerEmail,
          customerPhone: meta.phone || undefined,
          customerCountry: meta.country || undefined,
          productName: `[CUOTA ${cuotaActual} de ${cuotasTotales}] ${meta.productId || 'Plan en cuotas'}`,
          amount: monto,
          currency,
          transactionId: invoice.id,
          paymentMethod: 'Stripe (Plan en cuotas)',
          additionalDetails: {
            'Cuota': `${cuotaActual} de ${cuotasTotales}`,
            'Suscripción': suscripcion.id,
            'Estado del plan': esUltima ? 'COMPLETADO — plan cerrado' : 'En curso',
            ...(cuotaActual === 1
              ? { '⚠️ ACCIÓN REQUERIDA': `MATRICULAR a ${customerEmail} en Hotmart (${meta.programa || 'Lobos de Ventas'}).` }
              : {}),
          },
        });
      } catch (err) {
        console.error('[Stripe Webhook] Error notificando la cuota:', err);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const subId =
        invoice.subscription || invoice.parent?.subscription_details?.subscription;
      if (!subId) break;

      const suscripcion = await stripe.subscriptions.retrieve(
        typeof subId === 'string' ? subId : subId.id
      );
      const meta = suscripcion.metadata || {};
      const customerEmail = meta.email || invoice.customer_email || 'Sin email';

      console.error(`[Stripe Webhook] ⚠️ Cuota RECHAZADA de ${customerEmail} (${invoice.id})`);

      try {
        await sendPurchaseNotificationToAdmin({
          customerName: meta.name || 'Cliente',
          customerEmail,
          customerPhone: meta.phone || undefined,
          productName: `[CUOTA RECHAZADA] ${meta.productId || 'Plan en cuotas'}`,
          amount: (invoice.amount_due || 0) / 100,
          currency: (invoice.currency || 'PEN').toUpperCase(),
          transactionId: invoice.id,
          paymentMethod: 'Stripe (Plan en cuotas)',
          additionalDetails: {
            'Estado': 'PAGO RECHAZADO',
            'Intentos de Stripe': String(invoice.attempt_count || 1),
            '⚠️ ACCIÓN REQUERIDA': `La cuota de ${customerEmail} no se pudo cobrar. Stripe reintentará solo, pero conviene escribirle.`,
          },
        });
      } catch (err) {
        console.error('[Stripe Webhook] Error notificando la cuota rechazada:', err);
      }
      break;
    }

    default:
      console.log(`[Stripe Webhook] Evento no manejado: ${event.type}`);
  }

  // Siempre 200: si devolviéramos error, Stripe reintenta y el cliente
  // recibiría el correo de entrega dos veces.
  return NextResponse.json({ received: true });
}
