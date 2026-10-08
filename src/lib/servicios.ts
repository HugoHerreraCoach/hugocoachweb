// src/lib/servicios.ts
// Catálogo único de servicios de Hugo Herrera. Lo usan la home, el menú,
// el pie de página, /servicios y la página de conferencias.
// Los precios salen de `precios-servicios.ts`. Todos incluyen honorarios, pasajes y hospedaje en el Perú.

import {
    EQUIPO,
    FULL_DAY_MAX_PERSONAS,
    INMERSION_DIAS,
    PRECIOS,
    SESION_ENTRENAMIENTO_MAX_PERSONAS,
    formatUsd,
} from '@/lib/precios-servicios';

/** Videollamada gratuita de 20 min con un asesor del equipo de Hugo: el único botón principal de toda la web. */
export const LLAMADA_GRATIS_URL = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';
/** Sesión Estratégica de 2h (de pago). */
export const SESION_ESTRATEGICA_URL = 'https://calendly.com/hugoherrerateam/sesion-estrategica';
export const CONEXIGO_URL = 'https://conexigo.com/';
/** WhatsApp de Hugo: el segundo canal de contacto, el más natural en Perú. */
export const WHATSAPP_URL =
    'https://api.whatsapp.com/send?phone=51900239201&text=%C2%A1Hola%20Hugo!%20%F0%9F%98%8A%20Vengo%20de%20tu%20p%C3%A1gina%20web.%20Mi%20nombre%20es...';

export const BONO_CONEXIGO =
    'ConexiGO: el sistema donde tu equipo registra clientes y ventas, con juegos y premios. Incluido mientras dura el programa.';

/**
 * Cupo real de la inmersión de 5 días. Hugo debe mantener esto al día:
 * si no hay cupo, no se anuncia. Con `proximaFecha` vacía solo se muestra el máximo mensual.
 */
export const CUPO_INMERSION = {
    empresasPorMes: 1,
    /** Ejemplo: 'noviembre de 2026'. Dejar vacío si no se quiere anunciar. */
    proximaFecha: '',
};

export const TODO_INCLUIDO = 'Todo incluido en el Perú: honorarios, pasajes y hospedaje. Zonas de difícil acceso se cotizan.';

/** Ruta de un icono 3D de la home (PNG optimizado en public/images/home/iconos). */
const icono = (nombre: string): string => `/images/home/iconos/${nombre}.png`;

export interface ServicioEmpresa {
    id: string;
    nombre: string;
    /** Frase muy corta para menús (máx. 7 palabras). */
    corto: string;
    /** Una línea: qué problema resuelve. */
    resumen: string;
    para: string;
    /** Monto en USD, para mostrarlo grande con el componente Precio. */
    monto: number;
    precio: string;
    /** Lo que cubre el precio, sin repetir la moneda. */
    unidad: string;
    incluye: string[];
    nota?: string;
    bono?: string;
    garantia?: string;
    /** Escasez real, con número. */
    escasez?: string;
    cta: string;
    ctaHref: string;
    /** Página con el detalle. */
    detalleHref: string;
    destacado?: boolean;
    /** El programa principal: se resalta en la escalera de la home. */
    estrella?: boolean;
    /** Icono 3D decorativo (PNG). */
    icono?: string;
}

const escasezInmersion = `Máximo ${CUPO_INMERSION.empresasPorMes} empresa por mes.${
    CUPO_INMERSION.proximaFecha ? ` Próxima fecha disponible: ${CUPO_INMERSION.proximaFecha}.` : ''
}`;

/** Escalera de menor a mayor precio. */
export const serviciosEmpresas: ServicioEmpresa[] = [
    {
        id: 'sesion-estrategica',
        icono: icono('servicio-sesion'),
        nombre: 'Sesión Estratégica',
        corto: 'Asesoría virtual de 2 horas',
        resumen: 'Una asesoría virtual de 2 horas conmigo: consultoría para el dueño o entrenamiento rápido para tu equipo.',
        para: 'Para dueños y gerentes que quieren asesoría, o para entrenar rápido a un equipo pequeño',
        monto: PRECIOS.sesionEstrategica,
        precio: formatUsd(PRECIOS.sesionEstrategica),
        unidad: '2 horas por videollamada',
        incluye: [
            'Sesión en vivo conmigo, por videollamada',
            `Eliges el enfoque: consultoría para el dueño o gerente, o entrenamiento rápido para tu equipo (hasta ${SESION_ENTRENAMIENTO_MAX_PERSONAS} personas)`,
            'Te llevas un plan con pasos y herramientas listas para usar',
            'Se abona al contratar un programa dentro de 30 días',
        ],
        nota: 'Es virtual: la haces desde donde estés. Presencial solo si estás en Cajamarca.',
        cta: 'Agendar sesión virtual',
        ctaHref: SESION_ESTRATEGICA_URL,
        detalleHref: '/servicios#sesion-estrategica',
    },
    {
        id: 'full-day',
        icono: icono('servicio-taller'),
        nombre: 'Taller Full Day',
        corto: 'Un día de práctica con tu equipo',
        resumen: 'Un día entero de práctica real de cierre con tu equipo.',
        para: 'Para equipos que necesitan un día intenso de práctica',
        monto: PRECIOS.fullDay,
        precio: formatUsd(PRECIOS.fullDay),
        unidad: '8 horas',
        incluye: [
            `Hasta ${FULL_DAY_MAX_PERSONAS} personas, con práctica real de cierre`,
            'Guion de ventas adaptado a tu producto',
            'Libro digital "Cerrador Experto" para cada vendedor',
        ],
        nota: `${TODO_INCLUIDO} Tú pones la sala y los equipos. Más de ${FULL_DAY_MAX_PERSONAS} personas: lo cotizamos.`,
        cta: 'Agendar llamada gratis',
        ctaHref: LLAMADA_GRATIS_URL,
        detalleHref: '/servicios/conferencias#full-day',
    },
    {
        id: 'coaching-equipos',
        icono: icono('servicio-coaching-equipos'),
        nombre: 'Coaching para Equipos',
        corto: '4 semanas, para equipos de 4 a 20 personas',
        resumen: `4 semanas de acompañamiento para equipos de ${EQUIPO.min} a ${EQUIPO.max} personas.`,
        para: `Para equipos comerciales de ${EQUIPO.min} a ${EQUIPO.max} personas`,
        monto: PRECIOS.coachingEquipos,
        precio: formatUsd(PRECIOS.coachingEquipos),
        unidad: `Precio fijo, ${EQUIPO.min} a ${EQUIPO.max} personas`,
        incluye: [
            '4 sesiones en vivo de 2 horas por videollamada, una por semana',
            'Guía de ventas hecha a la medida de tu equipo',
            'Coach por WhatsApp durante las 4 semanas',
            'Libro digital "Cerrador Experto" y acceso del equipo a "Lobos de Ventas"',
            'Medimos tus ventas antes y después',
        ],
        nota: 'El precio no cambia si son 4 o 20 vendedores.',
        bono: BONO_CONEXIGO,
        cta: 'Agendar llamada gratis',
        ctaHref: LLAMADA_GRATIS_URL,
        detalleHref: '/servicios#coaching-equipos',
    },
    {
        id: 'conferencia',
        icono: icono('servicio-conferencia'),
        nombre: 'Conferencia + Sistema',
        corto: 'Para eventos y convenciones',
        resumen: 'Reúne a toda tu organización en un evento y déjale un método para vender.',
        para: 'Para eventos de empresa y convenciones comerciales',
        monto: PRECIOS.conferencia,
        precio: formatUsd(PRECIOS.conferencia),
        unidad: 'Por conferencia',
        incluye: [
            'Conferencia a medida de tu equipo y tu industria',
            'Sesión práctica con tu equipo (hasta 2 horas)',
            'Manual de ventas hecho a tu medida y 15 días para resolver dudas conmigo',
            'Libro digital "Cerrador Experto" y acceso a "Lobos de Ventas"',
        ],
        nota: `${TODO_INCLUIDO} Virtual: ${formatUsd(PRECIOS.conferenciaVirtual)}. Internacional: desde ${formatUsd(PRECIOS.conferenciaInternacionalDesde)}.`,
        cta: 'Agendar llamada gratis',
        ctaHref: LLAMADA_GRATIS_URL,
        detalleHref: '/servicios/conferencias',
        destacado: true,
    },
    {
        id: 'aceleracion-comercial',
        icono: icono('aceleracion'),
        nombre: 'Aceleración Comercial',
        corto: '5 días en tu empresa, con garantía',
        resumen: `${INMERSION_DIAS} días en tu empresa y garantía de +10% en la facturación de tu equipo comercial, o te devolvemos tu inversión.`,
        para: 'Para empresas que quieren cambiar cómo vende todo su equipo',
        monto: PRECIOS.programaAceleracion,
        precio: formatUsd(PRECIOS.programaAceleracion),
        unidad: `${INMERSION_DIAS} días en tu empresa + 3 meses`,
        incluye: [
            'Revisión previa de cómo vende tu empresa y cuánto factura hoy',
            `${INMERSION_DIAS} días en tu empresa: entreno a tus jefes de ventas y a tus vendedores, con llamadas reales en vivo`,
            '4 reuniones de 2 horas con los jefes de tu equipo',
            '3 meses de seguimiento: una reunión al mes para ajustar',
            'Lobos de Ventas para tu equipo y asistente de IA para WhatsApp',
        ],
        nota: `${TODO_INCLUIDO} Pago 50% al firmar y 50% al completar la inmersión.`,
        bono: BONO_CONEXIGO,
        garantia:
            'Garantía +10% o te devuelvo todo: si en los 90 días después de la inmersión la facturación de tu equipo comercial no sube al menos 10% frente a la facturación acordada el día 0, te devuelvo el 100% de lo que pagaste por el programa. Condición: tu equipo asiste a las jornadas y llena el reporte semanal.',
        escasez: escasezInmersion,
        cta: 'Agendar llamada gratis',
        ctaHref: LLAMADA_GRATIS_URL,
        detalleHref: '/servicios/aceleracion-comercial',
        destacado: true,
        estrella: true,
    },
];

/** Misma visita, dos productos. Solo se muestra en la página de conferencias y talleres. */
export const comboConferenciaTaller: ServicioEmpresa = {
    id: 'combo',
    nombre: 'Combo Conferencia + Taller',
        corto: 'Conferencia y taller en un viaje',
    resumen: 'Conferencia y taller en el mismo viaje.',
    para: 'Para organizaciones que quieren inspirar y entrenar a su equipo en una sola visita',
    monto: PRECIOS.comboConferenciaTaller,
    precio: formatUsd(PRECIOS.comboConferenciaTaller),
    unidad: '2 días en tu ciudad',
    incluye: [
        'Conferencia para toda tu organización',
        `Taller full day de 8 horas para tu equipo comercial (hasta ${FULL_DAY_MAX_PERSONAS} personas)`,
        `Ahorras ${formatUsd(PRECIOS.conferencia + PRECIOS.fullDay - PRECIOS.comboConferenciaTaller)} frente a contratarlos por separado`,
        'Todo el material de la conferencia y del taller',
    ],
    nota: `${TODO_INCLUIDO} Tú pones la sala y los equipos del taller.`,
    cta: 'Agendar llamada gratis',
    ctaHref: LLAMADA_GRATIS_URL,
    detalleHref: '/servicios/conferencias#combo',
};

export interface ServicioVendedor {
    id: string;
    nombre: string;
    resumen: string;
    monto: number;
    precio: string;
    href: string;
    isExternal?: boolean;
    /** Imagen real del producto (portada, mockup o foto), WebP optimizado. */
    imagen: { src: string; alt: string; ajuste: 'contain' | 'cover' };
}

export const serviciosVendedores: ServicioVendedor[] = [
    {
        id: 'libro-cerrador-experto',
        imagen: { src: '/images/home/productos/libro-cerrador-experto.webp', alt: 'Portada del libro Cerrador Experto: 139 maneras de cerrar una venta', ajuste: 'contain' },
        nombre: 'Libro: Cerrador Experto',
        resumen: 'Libro digital con 139 respuestas para cerrar ventas.',
        monto: PRECIOS.libroCerradorExperto,
        precio: formatUsd(PRECIOS.libroCerradorExperto),
        href: 'https://cerradorexperto.hugoherreracoach.com/',
        isExternal: true,
    },
    {
        id: 'lobos-de-ventas',
        imagen: { src: '/images/home/productos/lobos-de-ventas.webp', alt: 'Programa Lobos de Ventas: módulos, manual de objeciones y certificado', ajuste: 'contain' },
        nombre: 'Lobos de Ventas',
        resumen: 'Un programa de 30 días para mejorar tus ventas.',
        monto: PRECIOS.lobosDeVentas,
        precio: formatUsd(PRECIOS.lobosDeVentas),
        href: 'https://lobosdeventas.hugoherreracoach.com/',
        isExternal: true,
    },
    {
        id: 'coaching-1a1',
        imagen: { src: '/images/home/productos/coaching-1a1.webp', alt: 'Hugo Herrera tomando notas con una clienta durante una sesión de coaching', ajuste: 'cover' },
        nombre: 'Coaching 1:1',
        resumen: 'Sesiones personales para mejorar tus ventas.',
        monto: PRECIOS.coaching1a1,
        precio: formatUsd(PRECIOS.coaching1a1),
        href: '/servicios/coaching',
    },
];
