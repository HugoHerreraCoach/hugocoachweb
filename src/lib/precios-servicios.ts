// src/lib/precios-servicios.ts
// Fuente única de precios de los servicios de Hugo Herrera (USD).
// Si cambia un precio, se cambia aquí y se refleja en toda la web.
// Todos los precios incluyen honorarios, pasajes y hospedaje en el Perú.

export const PRECIOS = {
    sesionEstrategica: 500,
    fullDay: 2000,
    coachingEquipos: 4000,
    conferencia: 5000,
    conferenciaVirtual: 2500,
    conferenciaInternacionalDesde: 7500,
    comboConferenciaTaller: 6000,
    programaAceleracion: 10000,
    coaching1a1: 1000,
    lobosDeVentas: 297,
    libroCerradorExperto: 7,
} as const;

export const EQUIPO = { min: 4, max: 20 } as const;
export const FULL_DAY_MAX_PERSONAS = 30;
/** Tope del entrenamiento rápido dentro de la Sesión Estratégica (para no competir con el Coaching para Equipos). */
export const SESION_ENTRENAMIENTO_MAX_PERSONAS = 10;
export const INMERSION_DIAS = 5;

// Ítems del programa de Aceleración Comercial valorizados por separado.
// La inmersión se valora a 5 días del taller full day; las sesiones, al precio de la Sesión Estratégica.
export const VALOR_PROGRAMA_ACELERACION = [
    { label: 'Revisión de cómo vende tu empresa y qué ofreces', valor: 1500 },
    { label: `${INMERSION_DIAS} días en tu empresa entrenando a tus jefes de ventas y vendedores`, valor: PRECIOS.fullDay * INMERSION_DIAS },
    { label: '4 reuniones de 2 horas con los jefes de tu equipo', valor: PRECIOS.sesionEstrategica * 4 },
    { label: '3 meses de seguimiento mensual con tu equipo', valor: 4500 },
    { label: 'Lobos de Ventas para toda tu empresa (+350 videos)', valor: 1500 },
    { label: 'Programa Líder Experto (libro + curso en video)', valor: 500 },
    { label: 'Bono: Diseño de asistente IA para WhatsApp', valor: 2000 },
] as const;

export const VALOR_TOTAL_PROGRAMA_ACELERACION = VALOR_PROGRAMA_ACELERACION.reduce(
    (total, item) => total + item.valor,
    0,
);

/** 5000 -> "5,000" */
export const formatMonto = (monto: number): string => monto.toLocaleString('en-US');

/** 5000 -> "USD 5,000". Siempre con el código de la moneda: en la región "$" también significa pesos. */
export const formatUsd = (monto: number): string => `USD ${formatMonto(monto)}`;
