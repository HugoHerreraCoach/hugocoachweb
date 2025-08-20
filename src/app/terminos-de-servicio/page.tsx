// app/terminos-de-servicio/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos de Servicio | Hugo Herrera Coach",
    description:
        "Condiciones de uso del sitio, contratación de productos/servicios, propiedad intelectual, limitación de responsabilidad y reembolsos.",
    alternates: { canonical: "/terminos-de-servicio" },
};

const LAST_UPDATED = "19 de agosto de 2025";
const CONTACT_EMAIL = "soporte@hugoherreracoach.com";

export default function TermsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Términos de Servicio",
        url: "https://www.hugoherreracoach.com/terminos-de-servicio",
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
            <h1>Términos de Servicio</h1>
            <p><strong>Última actualización:</strong> {LAST_UPDATED}</p>

            <p>
                Bienvenido a <strong>hugoherreracoach.com</strong> (el “Sitio”). Al acceder
                o utilizar nuestros contenidos, productos y servicios (los “Servicios”),
                aceptas estos Términos. Si no estás de acuerdo, no utilices el Sitio.
            </p>

            <h2 id="uso">1. Uso del Sitio</h2>
            <ul>
                <li>Debes tener capacidad legal para contratar.</li>
                <li>No puedes usar el Sitio para fines ilícitos, difamar, vulnerar derechos de terceros ni intentar acceder sin autorización a sistemas o datos.</li>
                <li>Podemos suspender o terminar el acceso si incumples estos Términos.</li>
            </ul>

            <h2 id="cuentas">2. Cuentas y acceso</h2>
            <p>
                Algunos Servicios requieren cuenta. Eres responsable de mantener la
                confidencialidad de tus credenciales y de toda actividad realizada con ellas.
                Notifícanos cualquier uso no autorizado.
            </p>

            <h2 id="compras">3. Compras y pagos</h2>
            <ul>
                <li>Mostramos precios en moneda local o USD. Los impuestos/aplicaciones de pasarela pueden añadirse al checkout.</li>
                <li>Nos reservamos el derecho de rechazar o cancelar pedidos ante errores evidentes de precio o sospecha de fraude.</li>
                <li>Las pasarelas de pago son operadas por terceros. No almacenamos datos completos de tarjetas.</li>
            </ul>

            <h2 id="digitales">4. Productos digitales y acceso a contenidos</h2>
            <ul>
                <li>Los infoproductos, cursos y materiales descargables son de uso personal e intransferible.</li>
                <li>Podemos aplicar medidas anti-abuso (por ejemplo, límites de dispositivos o descargas) para proteger la propiedad intelectual.</li>
            </ul>

            <h2 id="eventos">5. Servicios profesionales y eventos</h2>
            <ul>
                <li>Las asesorías, entrenamientos y conferencias se rigen por las condiciones específicas acordadas en cada propuesta/orden.</li>
                <li>En eventos presenciales, nos reservamos el derecho de reprogramar por causas de fuerza mayor. Si no pudieras asistir a la nueva fecha, podrás solicitar opciones equivalentes (p. ej., crédito para otro evento o acceso online).</li>
            </ul>

            <h2 id="reembolsos">6. Reembolsos y cancelaciones</h2>
            <ul>
                <li><strong>Digitales:</strong> en general, no reembolsables una vez entregado el acceso o realizada la descarga, salvo fallas técnicas imputables a nosotros que impidan el uso razonable.</li>
                <li><strong>Servicios:</strong> cancelaciones con al menos 7 días hábiles pueden reprogramarse sin penalidad. Cancelaciones fuera de plazo pueden implicar cargos.</li>
                <li>Cuando aplique, el reembolso se efectuará por el mismo medio de pago.</li>
            </ul>

            <h2 id="propiedad">7. Propiedad intelectual</h2>
            <ul>
                <li>Todo el contenido del Sitio y de los Servicios (textos, videos, guiones, marcas, logotipos) nos pertenece o se utiliza con licencia.</li>
                <li>No se permiten reproducciones, distribución o creación de obras derivadas sin autorización escrita.</li>
            </ul>

            <h2 id="conducta">8. Conducta prohibida</h2>
            <ul>
                <li>Scraping, ingeniería inversa, uso de bots para extracción masiva de datos o saturación del Sitio.</li>
                <li>Publicar contenido ilegal, ofensivo, o que infrinja derechos de terceros.</li>
            </ul>

            <h2 id="responsabilidad">9. Descargos y limitación de responsabilidad</h2>
            <p>
                Los Servicios se proporcionan “tal cual” y “según disponibilidad”. En la
                medida permitida por la ley, excluimos garantías implícitas. No seremos
                responsables por pérdidas indirectas, lucro cesante o daños emergentes
                derivados del uso o imposibilidad de uso del Sitio/Servicios, salvo dolo o
                culpa inexcusable.
            </p>

            <h2 id="datos">10. Datos personales</h2>
            <p>
                El tratamiento de tus datos se rige por nuestra{" "}
                <a href="/politica-de-privacidad">Política de Privacidad</a>. Al usar el Sitio
                consientes dicho tratamiento en los términos allí descritos.
            </p>

            <h2 id="terceros">11. Enlaces y servicios de terceros</h2>
            <p>
                El Sitio puede contener enlaces a sitios de terceros. No somos responsables
                de su contenido ni de sus prácticas. Revisa sus políticas antes de proporcionar datos.
            </p>

            <h2 id="modificaciones">12. Modificaciones</h2>
            <p>
                Podemos actualizar estos Términos. La versión vigente será la publicada aquí, con su fecha de actualización.
            </p>

            <h2 id="ley">13. Ley aplicable y jurisdicción</h2>
            <p>
                Estos Términos se rigen por las leyes del Perú. Cualquier controversia se
                somete a los jueces y tribunales de Lima, salvo normas imperativas distintas.
            </p>

            <h2 id="contacto">14. Contacto</h2>
            <p>
                Soporte y consultas: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <hr />
            <p className="text-sm opacity-70">
                Nota informativa: este texto es una plantilla general y no constituye
                asesoría legal. Adáptalo a tus procesos y consúltalo con tu asesor/a legal.
            </p>
        </main>
    );
}
