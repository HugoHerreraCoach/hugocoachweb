// app/politica-de-privacidad/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad | Hugo Herrera Coach",
    description:
        "Cómo recopilamos, usamos y protegemos tus datos personales. Información sobre comunicaciones comerciales, cookies, derechos ARCO y RGPD.",
    alternates: { canonical: "/politica-de-privacidad" },
};

const LAST_UPDATED = "19 de agosto de 2025";
const CONTACT_EMAIL = "soporte@hugoherreracoach.com";

export default function PrivacyPolicyPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Política de Privacidad",
        url: "https://www.hugoherreracoach.com/politica-de-privacidad",
        inLanguage: "es",
        dateModified: "2025-08-19",
        isPartOf: {
            "@type": "WebSite",
            name: "Hugo Herrera Coach",
            url: "https://www.hugoherreracoach.com",
        },
    };

    return (
        <main className="mx-auto max-w-4xl px-6 py-12 prose prose-neutral">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1>Política de Privacidad</h1>
            <p><strong>Última actualización:</strong> {LAST_UPDATED}</p>
            <p>
                En <strong>Hugo Herrera Coach</strong> (“nosotros”, “nuestro”) nos tomamos
                en serio la protección de tus datos personales. Esta Política explica
                qué datos recopilamos, con qué fines, la base legal aplicable, por cuánto
                tiempo los conservamos, con quién los compartimos y cómo puedes ejercer
                tus derechos.
            </p>

            <nav aria-label="Índice" className="not-prose my-6 p-4 rounded-xl border">
                <p className="m-0 font-semibold">Contenido</p>
                <ul className="mt-2 grid gap-1 list-disc list-inside">
                    <li><a href="#responsable">1. Responsable del tratamiento</a></li>
                    <li><a href="#datos">2. Datos que tratamos</a></li>
                    <li><a href="#fines">3. Fines y bases legales</a></li>
                    <li><a href="#comerciales">4. Comunicaciones comerciales</a></li>
                    <li><a href="#cookies">5. Cookies y tecnologías similares</a></li>
                    <li><a href="#terceros">6. Encargados y transferencias</a></li>
                    <li><a href="#retencion">7. Plazos de conservación</a></li>
                    <li><a href="#derechos">8. Derechos de las personas</a></li>
                    <li><a href="#menores">9. Menores de edad</a></li>
                    <li><a href="#seguridad">10. Seguridad</a></li>
                    <li><a href="#cambios">11. Cambios a esta Política</a></li>
                    <li><a href="#contacto">12. Contacto</a></li>
                </ul>
            </nav>

            <h2 id="responsable">1. Responsable del tratamiento</h2>
            <p>
                <strong>Hugo Herrera Coach</strong> — Perú. Correo:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                Para efectos de la normativa peruana aplicable (Ley N.º 29733 y su reglamento),
                actuamos como <em>responsable del banco de datos personales</em>. En caso de
                residentes de la Unión Europea, actuamos como <em>controller</em> conforme al RGPD.
            </p>

            <h2 id="datos">2. Datos que tratamos</h2>
            <ul>
                <li><strong>Identificación y contacto:</strong> nombre, correo, teléfono/WhatsApp.</li>
                <li><strong>Datos transaccionales:</strong> productos/servicios adquiridos, montos, fechas.</li>
                <li><strong>Datos de marketing:</strong> preferencias, aperturas/clics, etiquetas/segmentos.</li>
                <li><strong>Datos técnicos:</strong> IP, dispositivo, navegador, páginas visitadas, UTM, cookies.</li>
                <li><strong>Soporte/atención:</strong> mensajes enviados por formularios, email o WhatsApp.</li>
            </ul>

            <h2 id="fines">3. Fines y bases legales</h2>
            <p>Tratamos datos para los siguientes fines y bases legales:</p>
            <ul>
                <li>
                    <strong>Prestación de servicios y cumplimiento contractual</strong>
                    (por ejemplo, gestionar compras, accesos a cursos, facturación, soporte).
                    <em> Base legal:</em> ejecución de contrato/medidas precontractuales.
                </li>
                <li>
                    <strong>Atención de consultas y soporte.</strong> <em>Base legal:</em>{" "}
                    interés legítimo y/o medidas precontractuales.
                </li>
                <li>
                    <strong>Marketing propio</strong> (envío de promociones, newsletters, invitaciones a
                    eventos, segmentación y perfilado básico para personalizar contenidos).
                    <em> Base legal:</em> consentimiento y/o interés legítimo cuando exista
                    relación previa y se ofrezcan productos/servicios similares, siempre con
                    opción de oposición sencilla en cada mensaje.
                </li>
                <li>
                    <strong>Análisis y mejora</strong> (métricas de uso, A/B testing, analítica).
                    <em> Base legal:</em> interés legítimo y, cuando sea necesario, consentimiento de cookies.
                </li>
                <li>
                    <strong>Cumplimientos legales</strong> (contables, tributarios, protección del consumidor).
                    <em> Base legal:</em> obligación legal.
                </li>
            </ul>

            <h2 id="comerciales">4. Comunicaciones comerciales</h2>
            <p>
                Podemos enviarte comunicaciones comerciales por email, SMS o WhatsApp sobre
                nuestros libros, infoproductos, servicios y eventos. Siempre podrás{" "}
                <strong>retirar tu consentimiento</strong> u <strong>optar por no recibir</strong>{" "}
                más mensajes desde el enlace de baja de cada email o escribiendo a{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. No enviamos
                comunicaciones automatizadas sin base legal válida (consentimiento previo
                o relación previa permitida) y respetamos los registros de exclusión.
            </p>

            <h2 id="cookies">5. Cookies y tecnologías similares</h2>
            <p>
                Usamos cookies propias y de terceros para recordar tus preferencias, medir
                rendimiento y personalizar campañas. En el banner de cookies podrás
                <strong> aceptar, rechazar o configurar</strong> categorías (p. ej., analítica,
                publicidad). Puedes cambiar tu decisión en cualquier momento desde el
                enlace “Preferencias de cookies” del sitio.
            </p>

            <h2 id="terceros">6. Encargados y transferencias</h2>
            <p>
                Trabajamos con proveedores que actúan como <em>encargados del tratamiento</em> (por ejemplo:
                plataformas de email marketing, analítica, pasarelas de pago, alojamiento y CRM).
                Algunos pueden estar ubicados fuera de Perú y/o del EEE. En esos casos,
                adoptamos <strong>garantías adecuadas</strong> (cláusulas contractuales tipo,
                acuerdos de encargado) y, cuando corresponda, recabamos tu consentimiento.
            </p>

            <h2 id="retencion">7. Plazos de conservación</h2>
            <ul>
                <li><strong>Clientes/contratos:</strong> mientras dure la relación y los plazos legales (p. ej., tributarios).</li>
                <li><strong>Marketing:</strong> hasta que retires tu consentimiento o te opongas, y/o un máximo razonable desde tu última interacción significativa.</li>
                <li><strong>Logs técnicos/analítica:</strong> períodos acotados acordes a fines de seguridad y métricas.</li>
            </ul>

            <h2 id="derechos">8. Derechos de las personas</h2>
            <p>
                Puedes ejercer <strong>acceso, rectificación, cancelación, oposición</strong> (ARCO),
                <strong> portabilidad</strong> y <strong>revocación del consentimiento</strong> enviando
                un correo a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. En Perú, también
                puedes acudir a la Autoridad Nacional de Protección de Datos Personales.
                Si te encuentras en la UE, puedes dirigir reclamos ante tu autoridad local.
            </p>

            <h2 id="menores">9. Menores de edad</h2>
            <p>
                Nuestros contenidos y servicios no están dirigidos a menores de 16 años.
                Si detectamos datos de menores sin autorización válida, los eliminaremos.
            </p>

            <h2 id="seguridad">10. Seguridad</h2>
            <p>
                Implementamos medidas técnicas y organizativas razonables para proteger
                tus datos (control de accesos, cifrado en tránsito, respaldo y políticas
                de minimización).
            </p>

            <h2 id="cambios">11. Cambios a esta Política</h2>
            <p>
                Podemos actualizar esta Política para reflejar cambios legales u
                operativos. Publicaremos la versión vigente con su fecha de actualización.
            </p>

            <h2 id="contacto">12. Contacto</h2>
            <p>
                Para consultas de privacidad, escribe a{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <hr />
            <p className="text-sm opacity-70">
                Nota informativa: este texto es una plantilla general y no constituye
                asesoría legal. Adáptalo a tus procesos internos y consúltalo con tu
                asesor/a legal.
            </p>
        </main>
    );
}
