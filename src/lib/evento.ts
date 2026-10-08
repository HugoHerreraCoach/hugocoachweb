// src/lib/evento.ts
// Datos del evento insignia, alineados con lo que Conexipema publica en conexipema.com.
// Si cambia una cifra o una frase, se cambia solo aquí.

export const CONEXIPEMA_URL = 'https://conexipema.com/';

export const EVENTO = {
    nombre: 'Negocios Legendarios',
    fecha: '16 de agosto de 2026',
    lugar: 'Coliseo Gran Qhapac Ñan, Cajamarca',
    cifra: '+7,000',
    cifraEtiqueta: 'asistentes',
    // Frase tal como la usa conexipema.com. No subirla a "más grande del Perú" sin respaldo.
    claim: 'El festival de negocios y ventas más grande del norte del Perú',
    productora: 'Conexipema',
} as const;

// Trayectoria de eventos masivos. Cifras tomadas de conexipema.com (totales) y de la sección
// Casos de éxito de esta web (asistentes por evento). Se editan solo aquí.
export const TRAYECTORIA = {
    asistentes: '+10,000',
    ciudades: '8',
} as const;

export interface EventoAnterior {
    nombre: string;
    ciudad: string;
    asistentes: string;
    foto: string;
    alt: string;
}

export const EVENTOS_ANTERIORES: EventoAnterior[] = [
    {
        nombre: 'Negocios Inquebrantables',
        ciudad: 'Arequipa',
        asistentes: '4,000',
        foto: '/images/casosdeexito/arequipa.jpg',
        alt: 'Coliseo de Arequipa lleno de público durante Negocios Inquebrantables',
    },
    {
        nombre: 'Construye tu Riqueza',
        ciudad: 'Cajamarca',
        asistentes: '2,000',
        foto: '/images/casosdeexito/cajamarca.jpg',
        alt: 'Público sentado en el evento Construye tu Riqueza en Cajamarca',
    },
    {
        nombre: 'Ventas y Persuasión',
        ciudad: 'Jaén',
        asistentes: '500',
        foto: '/images/casosdeexito/jaen.jpg',
        alt: 'Hugo Herrera con otros ponentes frente al público en Jaén',
    },
];

/** Ponentes que han estado en mis eventos. */
export const PONENTES = ['Jürgen Klarić', 'Alex Dey', 'Michael Tracy', 'Brian Tracy (en vivo, por videollamada)'];
