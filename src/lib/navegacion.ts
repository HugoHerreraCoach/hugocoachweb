// src/lib/navegacion.ts
// Fuente única de la navegación: la leen el menú (escritorio y móvil) y el pie de página.
// Los servicios salen del catálogo (`servicios.ts`), así nombres y descripciones nunca se desincronizan.
// Regla del menú: dos puertas claras, "empresas y equipos" y "personas"; Recursos es solo contenido gratis y herramientas.

import { CONEXIPEMA_URL } from '@/lib/evento';
import {
    CONEXIGO_URL,
    serviciosEmpresas,
    serviciosVendedores,
} from '@/lib/servicios';

export interface EnlaceNav {
    etiqueta: string;
    href: string;
    descripcion?: string;
    externo?: boolean;
    /** Lo que más se quiere vender: se resalta en el menú. */
    destacado?: boolean;
    /** Etiqueta corta que acompaña al destacado en el menú móvil. */
    insignia?: string;
}

/** Columna del pie de página. */
export interface ColumnaNav {
    titulo?: string;
    enlaces: EnlaceNav[];
}

/** Columna de un desplegable: título opcional, filas y un enlace discreto al final. */
export interface ColumnaMenu {
    titulo?: string;
    enlaces: EnlaceNav[];
    pie?: EnlaceNav;
}

export interface ItemNav {
    etiqueta: string;
    /** 'lista' abre un desplegable de una o dos columnas; 'enlace' va directo. */
    tipo: 'lista' | 'enlace';
    href?: string;
    externo?: boolean;
    columnas?: ColumnaMenu[];
    /** Lado desde el que se abre el panel; los ítems del extremo derecho usan 'derecha' para no salirse de pantalla. */
    alineacion?: 'izquierda' | 'derecha';
    /** Rutas en las que este ítem se marca como "estás aquí". */
    activoEn?: string[];
}

const servicioPorId = (id: string) => {
    const servicio = serviciosEmpresas.find((item) => item.id === id);
    if (!servicio) throw new Error(`Servicio no encontrado en el catálogo: ${id}`);
    return servicio;
};

const vendedorPorId = (id: string) => {
    const servicio = serviciosVendedores.find((item) => item.id === id);
    if (!servicio) throw new Error(`Producto no encontrado en el catálogo: ${id}`);
    return servicio;
};

const enlaceVendedor = (id: string): EnlaceNav => {
    const servicio = vendedorPorId(id);
    return {
        etiqueta: servicio.nombre,
        href: servicio.href,
        descripcion: servicio.resumen,
        externo: servicio.isExternal,
    };
};

const enlacesEmpresas: EnlaceNav[] = serviciosEmpresas.map((s) => ({
    etiqueta: s.nombre,
    href: s.detalleHref,
    descripcion: s.corto,
}));

const libroLiderExperto: EnlaceNav = {
    etiqueta: 'Libro: Líder Experto',
    href: 'https://liderexperto.hugoherreracoach.com/',
    descripcion: 'Construye equipos que venden más y mejor.',
    externo: true,
};

const conexigo: EnlaceNav = {
    etiqueta: 'ConexiGO',
    href: CONEXIGO_URL,
    descripcion: 'El sistema donde tu equipo registra clientes y ventas.',
    externo: true,
};

const softwareAMedida: EnlaceNav = {
    etiqueta: 'Software y embudos a medida',
    href: '/servicios/desarrollo-software',
    descripcion: 'Programas hechos para tu operación.',
};

const blog: EnlaceNav = { etiqueta: 'Blog de ventas', href: '/blog', descripcion: 'Guías y estrategias para vender más.' };

const recursosGratuitos: EnlaceNav = {
    etiqueta: 'Recursos gratuitos',
    href: '/recursos',
    descripcion: 'Plantillas y herramientas para usar hoy.',
};

const totalScript: EnlaceNav = {
    etiqueta: 'TotalScript',
    href: 'https://totalscript.hugoherreracoach.com/',
    descripcion: 'App con IA que crea guiones de venta.',
    externo: true,
};

const miHistoria: EnlaceNav = { etiqueta: 'Mi historia', href: '/mi-historia', descripcion: 'Quién soy y cómo trabajo.' };

const casosDeExito: EnlaceNav = { etiqueta: 'Casos de éxito', href: '/casos-de-exito', descripcion: 'Resultados de otros equipos.' };

const misEventos: EnlaceNav = {
    etiqueta: 'Mis eventos',
    href: CONEXIPEMA_URL,
    descripcion: 'Conexipema: eventos masivos de ventas y negocios.',
    externo: true,
};

/** Para empresas y equipos: solo lo que más se quiere vender, sin precios (los precios viven en /servicios). */
const paraEmpresas: EnlaceNav[] = [
    {
        etiqueta: servicioPorId('aceleracion-comercial').nombre,
        href: servicioPorId('aceleracion-comercial').detalleHref,
        descripcion: servicioPorId('aceleracion-comercial').corto,
        destacado: true,
        insignia: 'Programa completo',
    },
    {
        etiqueta: 'Conferencias y talleres',
        href: '/servicios/conferencias',
        descripcion: 'Para eventos y entrenamientos de un día',
    },
    {
        etiqueta: 'Coaching para equipos',
        href: servicioPorId('coaching-equipos').detalleHref,
        descripcion: servicioPorId('coaching-equipos').corto,
    },
    {
        etiqueta: servicioPorId('sesion-estrategica').nombre,
        href: servicioPorId('sesion-estrategica').detalleHref,
        descripcion: servicioPorId('sesion-estrategica').corto,
    },
];

/** Para personas: lo que se compra por cuenta propia (programa online, coaching personal y libros). */
const paraPersonas: EnlaceNav[] = [
    enlaceVendedor('lobos-de-ventas'),
    enlaceVendedor('coaching-1a1'),
    enlaceVendedor('libro-cerrador-experto'),
    libroLiderExperto,
];

export const navPrincipal: ItemNav[] = [
    {
        etiqueta: 'Servicios',
        tipo: 'lista',
        activoEn: ['/servicios'],
        columnas: [
            {
                titulo: 'Para empresas y equipos',
                enlaces: paraEmpresas,
                pie: { etiqueta: 'Ver servicios y precios', href: '/servicios' },
            },
            {
                titulo: 'Para personas',
                enlaces: paraPersonas,
                pie: { etiqueta: 'Ver todo para personas', href: '/servicios#vendedores' },
            },
        ],
    },
    { etiqueta: 'Casos de éxito', tipo: 'enlace', href: casosDeExito.href, activoEn: ['/casos-de-exito'] },
    {
        etiqueta: 'Recursos',
        tipo: 'lista',
        activoEn: ['/blog', '/recursos'],
        columnas: [{ enlaces: [blog, recursosGratuitos, conexigo] }],
    },
    {
        etiqueta: 'Sobre mí',
        tipo: 'lista',
        alineacion: 'derecha',
        activoEn: ['/mi-historia'],
        columnas: [{ enlaces: [miHistoria, misEventos] }],
    },
];

/** Columnas del pie de página: mismos nombres que el menú, sin descripciones. */
const sinDescripcion = (enlaces: EnlaceNav[]): EnlaceNav[] =>
    enlaces.map(({ etiqueta, href, externo }) => ({ etiqueta, href, externo }));

export const columnasFooter: ColumnaNav[] = [
    {
        titulo: 'Para empresas y equipos',
        enlaces: [...sinDescripcion(enlacesEmpresas), { etiqueta: 'Comparar los 5 servicios', href: '/servicios' }],
    },
    { titulo: 'Para personas', enlaces: sinDescripcion(paraPersonas) },
    {
        titulo: 'Recursos',
        enlaces: sinDescripcion([blog, recursosGratuitos, totalScript, conexigo, softwareAMedida]),
    },
    {
        titulo: 'Sobre mí',
        enlaces: [
            ...sinDescripcion([miHistoria, casosDeExito]),
            { etiqueta: 'Eventos con Conexipema', href: CONEXIPEMA_URL, externo: true },
        ],
    },
];
