import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import * as Brevo from '@getbrevo/brevo';

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
      const { email, name, productId } = paymentIntent.metadata || {};
      const customerEmail = email || paymentIntent.receipt_email;
      const customerName = name || 'Cliente';

      console.log(`[Stripe Webhook] Pago exitoso para ${customerEmail} (${productId || 'Producto'})`);

      if (customerEmail) {
        if (productId === 'libro-digital') {
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
