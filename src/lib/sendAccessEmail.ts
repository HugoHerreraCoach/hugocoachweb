// src/lib/sendAccessEmail.ts
// Correo de ENTREGA al comprador. Es la pieza que faltaba: hasta ahora el
// cliente pagaba, la página /gracias le prometía un correo, y ese correo
// no existía en ninguna parte.

interface AccessEmailParams {
  customerName: string;
  customerEmail: string;
  productId: string;
  /** Párrafo opcional al inicio, para entregas manuales o reenvíos. */
  mensajeInicial?: string;
}

const SOPORTE_EMAIL = 'info@hugoherreracoach.com';
const SITIO = 'https://hugoherreracoach.com';
const ASSETS = `${SITIO}/images`;

/** Paleta del sitio principal (los hex más usados en src/components). */
const AZUL = '#0a4afc';
const AZUL_OSCURO = '#153eb5';
const TINTA = '#0f172a';

const REDES = [
  { nombre: 'Instagram', icono: 'firma-instagram.png', url: 'https://www.instagram.com/hugoherreracoach' },
  { nombre: 'Facebook', icono: 'firma-facebook.png', url: 'https://www.facebook.com/hugoherreracoach/' },
  { nombre: 'LinkedIn', icono: 'firma-linkedin.png', url: 'https://www.linkedin.com/in/hugoherreracoach/' },
  { nombre: 'TikTok', icono: 'firma-tiktok.png', url: 'https://www.tiktok.com/@hugoherreracoach' },
  { nombre: 'WhatsApp', icono: 'firma-whatsapp.png', url: 'https://api.whatsapp.com/send?phone=51900239201' },
];

/** Los 6 entregables del paquete "Cerrador Experto", tal como se prometen en el checkout. */
const CONTENIDO_LIBRO = [
  'Libro Digital "Cerrador Experto"',
  'Kit de Cierre de Emergencia',
  'El Guion Exacto para Ventas por Teléfono',
  'El Modelo para Ventas High Ticket',
  'El Anti-Visto: Las 7 Plantillas de WhatsApp',
  'Afirmaciones del Cerrador Experto',
];

const esLibro = (productId: string) => productId.includes('libro-digital');
const esLibroFisico = (productId: string) => productId.includes('libro-fisico');
const esLobos = (productId: string) => productId.includes('comunidad-lobos');

/** Botón con el degradado azul que usan los CTA del sitio. */
function bloqueBoton(url: string, texto: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 26px auto;">
      <tr>
        <td align="center" bgcolor="${AZUL}" style="background-color: ${AZUL}; background-image: linear-gradient(to bottom, ${AZUL}, ${AZUL_OSCURO}); border-radius: 6px;">
          <a href="${url}" style="display: inline-block; padding: 16px 34px; font-size: 17px; font-weight: 600; color: #ffffff; text-decoration: none; letter-spacing: 0.01em;">
            ${texto}
          </a>
        </td>
      </tr>
    </table>`;
}

function bloqueLista(items: string[]) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 8px 0 22px;">
      ${items
        .map(
          (item) => `
      <tr>
        <td style="padding: 8px 0; font-size: 15px; color: #1e293b; border-bottom: 1px solid #eef2f7;">
          <span style="color: ${AZUL}; font-weight: bold; margin-right: 10px;">&#10003;</span>${item}
        </td>
      </tr>`
        )
        .join('')}
    </table>`;
}

/** Franja superior con el logo. El logo es oscuro, por eso el fondo va blanco. */
function bloqueEncabezado() {
  return `
      <div style="background-color: #ffffff; padding: 30px 24px 24px; text-align: center;">
        <img src="${ASSETS}/firma-logo.png" alt="Hugo Herrera" width="190"
             style="display: block; margin: 0 auto; width: 190px; max-width: 60%; height: auto; border: 0;" />
      </div>
      <div style="height: 4px; background-color: ${AZUL}; background-image: linear-gradient(to right, ${AZUL}, ${AZUL_OSCURO}); font-size: 0; line-height: 0;">&nbsp;</div>`;
}

/** Firma con foto y redes, igual que la firma de correo de la marca. */
function bloqueFirma() {
  const iconos = REDES.map(
    (r) => `<a href="${r.url}" style="text-decoration: none; margin: 0 5px;"><img src="${ASSETS}/${r.icono}" alt="${r.nombre}" width="26" height="26" style="width: 26px; height: 26px; border: 0; vertical-align: middle;" /></a>`
  ).join('');

  return `
      <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
          <tr>
            <td width="64" style="width: 64px; vertical-align: top;">
              <img src="${ASSETS}/firma-hugo.jpg" alt="Hugo Herrera" width="56" height="56"
                   style="width: 56px; height: 56px; border-radius: 50%; display: block; border: 0;" />
            </td>
            <td style="vertical-align: top; padding-left: 14px;">
              <p style="margin: 0; font-size: 16px; font-weight: 700; color: ${TINTA};">Hugo Herrera</p>
              <p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">Entrenador de ventas y liderazgo</p>
              <p style="margin: 6px 0 0; font-size: 13px;">
                <a href="${SITIO}" style="color: ${AZUL}; text-decoration: none; font-weight: 600;">hugoherreracoach.com</a>
              </p>
            </td>
          </tr>
        </table>
        <div style="text-align: center; margin-top: 18px;">${iconos}</div>
      </div>`;
}

/**
 * Arma asunto + cuerpo según lo que compró la persona.
 * El asunto del libro es literalmente el que la página /gracias le dice que busque
 * ("[ACCESO] Tu arsenal de cierre está listo"). No cambiarlo sin cambiar esa página.
 */
function construirCorreo(params: AccessEmailParams): { subject: string; html: string } | null {
  const { customerName, productId } = params;
  const nombre = customerName.split(' ')[0] || 'Hola';
  const driveUrl = process.env.CERRADOR_EXPERTO_DRIVE_URL || '';

  const bloques: string[] = [];
  let subject = '[ACCESO] Tu compra está confirmada';

  if (params.mensajeInicial) {
    bloques.push(`
      <p style="font-size: 16px; line-height: 1.6; color: #334155; margin: 0 0 20px;">
        ${params.mensajeInicial}
      </p>`);
  }

  if (esLibro(productId)) {
    subject = '[ACCESO] Tu arsenal de cierre está listo';
    bloques.push(`
      <p style="font-size: 16px; line-height: 1.6; color: #334155; margin: 0 0 8px;">
        Tu pago está confirmado. Aquí tienes todo lo que compraste, listo para descargar:
      </p>
      ${bloqueLista(CONTENIDO_LIBRO)}
      ${
        driveUrl
          ? bloqueBoton(driveUrl, 'DESCARGAR MI ARSENAL')
          : `<p style="font-size: 15px; color: #b91c1c;">[Falta configurar CERRADOR_EXPERTO_DRIVE_URL]</p>`
      }
      <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin: 0 0 24px;">
        El libro está en la carpeta principal y los 5 bonos dentro de la subcarpeta
        <strong>&laquo;Bonos&raquo;</strong>. Descárgalos a tu equipo para tenerlos siempre
        a la mano: el acceso no vence.
      </p>`);
  }

  if (esLibroFisico(productId)) {
    // Mientras el checkout no capture dirección, se la pedimos aquí.
    bloques.push(`
      <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 18px; margin: 0 0 24px;">
        <p style="font-size: 15px; font-weight: bold; color: #92400e; margin: 0 0 8px;">
          &#128230; Falta un dato para enviarte el libro f&iacute;sico
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #78350f; margin: 0;">
          Resp&oacute;ndeme a este correo con tu <strong>direcci&oacute;n completa, distrito, ciudad y un
          tel&eacute;fono de contacto</strong>, y lo despacho.
        </p>
      </div>`);
  }

  if (esLobos(productId)) {
    subject = esLibro(productId)
      ? '[ACCESO] Tu arsenal de cierre y tu lugar en Lobos de Ventas'
      : '[ACCESO] Tu lugar en Lobos de Ventas está confirmado';
    bloques.push(`
      <p style="font-size: 16px; line-height: 1.6; color: #334155; margin: 0 0 16px;">
        Bienvenido a <strong>Lobos de Ventas</strong>. Estoy activando tu acceso a la plataforma.
      </p>
      <div style="background-color: #eff6ff; border-left: 4px solid ${AZUL}; border-radius: 6px; padding: 18px; margin: 0 0 24px;">
        <p style="font-size: 15px; line-height: 1.6; color: #1e3a8a; margin: 0;">
          <strong>En las pr&oacute;ximas horas</strong> te llegar&aacute; un correo de <strong>Hotmart</strong> con tu
          usuario y contrase&ntilde;a para entrar al Arsenal de +300 lecciones. Revisa tambi&eacute;n tu carpeta
          de Spam o Promociones: ese correo llega desde Hotmart, no desde m&iacute;.
        </p>
      </div>`);
  }

  // Producto sin entrega definida (ej. liderexperto, que tiene su propio flujo).
  // Mejor no enviar nada que enviar un correo vacío: el admin igual recibe su aviso.
  if (bloques.length === 0) return null;

  const html = `
  <!DOCTYPE html>
  <html lang="es">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${subject}</title></head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #eef2f7; margin: 0; padding: 24px 12px;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dbe3ec;">

      ${bloqueEncabezado()}

      <div style="padding: 30px 26px 10px;">
        <p style="font-size: 18px; font-weight: 700; color: ${TINTA}; margin: 0 0 18px;">${nombre},</p>
        ${bloques.join('\n')}
      </div>

      <div style="padding: 0 26px 26px;">
        <div style="border-top: 1px solid #e2e8f0; padding-top: 18px;">
          <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin: 0;">
            Si algo no te llega o no abre, resp&oacute;ndeme a este correo o escribe a
            <a href="mailto:${SOPORTE_EMAIL}" style="color: ${AZUL}; text-decoration: none; font-weight: 600;">${SOPORTE_EMAIL}</a>
            y lo resuelvo.
          </p>
        </div>
      </div>

      ${bloqueFirma()}

    </div>
  </body>
  </html>`;

  return { subject, html };
}

export async function sendAccessEmailToCustomer(params: AccessEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@hugoherreracoach.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'Hugo Herrera';

  if (!apiKey) {
    console.error('[Access Email] Falta BREVO_API_KEY.');
    return { success: false, error: 'Falta BREVO_API_KEY' };
  }
  if (!params.customerEmail || !params.customerEmail.includes('@')) {
    console.error('[Access Email] Email de comprador inválido:', params.customerEmail);
    return { success: false, error: 'Email inválido' };
  }

  const correo = construirCorreo(params);
  if (!correo) {
    console.warn(
      `[Access Email] Sin plantilla de entrega para productId="${params.productId}". No se envía nada a ${params.customerEmail}.`
    );
    return { success: false, error: 'Producto sin plantilla de entrega' };
  }
  const { subject, html } = correo;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': apiKey, accept: 'application/json' },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: params.customerEmail, name: params.customerName }],
        replyTo: { email: SOPORTE_EMAIL, name: 'Soporte Hugo Herrera' },
        subject,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Access Email] Error de Brevo:', errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    console.log(`[Access Email] ✅ Entrega enviada a ${params.customerEmail} (${params.productId}). MessageId:`, data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error: any) {
    console.error('[Access Email] Excepción enviando correo:', error);
    return { success: false, error: error.message };
  }
}
