// src/lib/sendPurchaseNotification.ts

interface PurchaseNotificationParams {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerCountry?: string;
  customerAddress?: string;
  customerCity?: string;
  customerDepartment?: string;
  productName: string;
  amount: number | string;
  currency: string;
  transactionId: string;
  paymentMethod?: string;
  additionalDetails?: Record<string, any>;
}

export async function sendPurchaseNotificationToAdmin(params: PurchaseNotificationParams) {
  const apiKey = process.env.BREVO_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'hugoherreracoach@gmail.com';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@hugoherreracoach.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'Hugo Herrera Coach';

  if (!apiKey) {
    console.error('[Brevo Notification] Error: No se encontró BREVO_API_KEY en variables de entorno.');
    return { success: false, error: 'Falta BREVO_API_KEY' };
  }

  const {
    customerName,
    customerEmail,
    customerPhone,
    customerCountry,
    customerAddress,
    customerCity,
    customerDepartment,
    productName,
    amount,
    currency,
    transactionId,
    paymentMethod = 'Stripe (Tarjeta)',
    additionalDetails = {},
  } = params;

  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : amount;
  const formattedDate = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const locationText = [customerAddress, customerCity, customerDepartment, customerCountry]
    .filter(Boolean)
    .join(', ');

  const additionalDetailsRows = Object.entries(additionalDetails)
    .filter(([_, val]) => val !== undefined && val !== null && val !== '')
    .map(
      ([key, val]) => `
      <tr>
        <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9; text-transform: capitalize;">${key}:</td>
        <td style="padding: 8px 12px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${String(val)}</td>
      </tr>`
    )
    .join('');

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Nueva Compra Exitosa</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
      
      <!-- Encabezado -->
      <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 22px; font-weight: bold; letter-spacing: -0.025em;">🎉 ¡Nueva Venta Registrada!</h1>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Hugo Herrera Coach Web</p>
      </div>

      <!-- Resumen Principal -->
      <div style="padding: 24px 24px 16px;">
        <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
          <span style="display: block; font-size: 13px; color: #065f46; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Total Cobrado</span>
          <span style="display: block; font-size: 32px; font-weight: 800; color: #047857; margin-top: 4px;">
            ${currency.toUpperCase()} ${formattedAmount}
          </span>
          <span style="display: inline-block; background-color: #10b981; color: white; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-top: 8px;">
            Pago Confirmado vía ${paymentMethod}
          </span>
        </div>

        <!-- Tabla de Datos del Cliente -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
          👤 Datos del Comprador
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9; width: 35%;">Nombre:</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Email:</td>
            <td style="padding: 8px 12px; color: #2563eb; border-bottom: 1px solid #f1f5f9; font-weight: 500;">
              <a href="mailto:${customerEmail}" style="color: #2563eb; text-decoration: none;">${customerEmail}</a>
            </td>
          </tr>
          ${
            customerPhone
              ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Teléfono:</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">
              <a href="tel:${customerPhone}" style="color: #0f172a; text-decoration: none;">${customerPhone}</a>
            </td>
          </tr>`
              : ''
          }
          ${
            locationText
              ? `
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Ubicación:</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${locationText}</td>
          </tr>`
              : ''
          }
        </table>

        <!-- Tabla de Datos del Producto y Pago -->
        <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
          📦 Detalles del Producto y Transacción
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9; width: 35%;">Producto:</td>
            <td style="padding: 8px 12px; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${productName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">ID Transacción:</td>
            <td style="padding: 8px 12px; color: #475569; border-bottom: 1px solid #f1f5f9; font-family: monospace; font-size: 13px;">${transactionId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Fecha y Hora:</td>
            <td style="padding: 8px 12px; color: #475569; border-bottom: 1px solid #f1f5f9;">${formattedDate}</td>
          </tr>
          ${additionalDetailsRows}
        </table>
      </div>

      <!-- Pie de Página -->
      <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        Notificación automática generada por <strong>Hugo Herrera Coach Platform</strong>.<br/>
        Revisa los fondos en tu panel de <a href="https://dashboard.stripe.com" style="color: #6366f1; text-decoration: none; font-weight: bold;">Stripe Dashboard</a>.
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          email: senderEmail,
          name: senderName,
        },
        to: [
          {
            email: adminEmail,
            name: 'Hugo Herrera Admin',
          },
        ],
        subject: `🎉 Nueva Compra: ${currency.toUpperCase()} ${formattedAmount} - ${customerName} (${productName})`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Brevo Notification] Error en API Brevo (SMTP):', errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    console.log(`[Brevo Notification] ✅ Correo de venta enviado a ${adminEmail}. MessageId:`, data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error: any) {
    console.error('[Brevo Notification] Excepción enviando correo con Brevo:', error);
    return { success: false, error: error.message };
  }
}
