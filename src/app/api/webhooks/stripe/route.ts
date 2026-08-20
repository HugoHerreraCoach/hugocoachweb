import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import * as Brevo from '@getbrevo/brevo';
import { sendPurchaseNotificationToAdmin } from '@/lib/sendPurchaseNotification';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error('Error de firma de Webhook de Stripe:', err.message);
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

      console.log(`[Stripe Webhook] Pago exitoso para ${customerEmail} (${productName}) - Monto: ${currency} ${rawAmount}`);

      // 1. Enviar notificación detallada por correo al administrador vía Brevo
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
          },
        });
      } catch (notifyErr) {
        console.error('[Stripe Webhook] Error al enviar email de notificación:', notifyErr);
      }

      // 2. Añadir a lista de Brevo si corresponde
      if (customerEmail && customerEmail !== 'Sin email') {
        if (productId === 'libro-digital' || productId?.includes('libro-digital')) {
          await addContactToBrevo(customerEmail, customerName, 13);
        }
      }
      break;
    }
    default:
      console.log(`[Stripe Webhook] Evento no manejado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
