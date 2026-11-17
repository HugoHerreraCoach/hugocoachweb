import { LLAMADA_GRATIS_URL } from '@/lib/servicios';

/**
 * Catálogo y constructores puros de enlaces para `info.hugoherreracoach.com`.
 *
 * Regla de atribución hacia ConexiGO:
 * Se envían parámetros `utm_*` estándar (`utm_source=instagram`, `utm_medium=bio_info`)
 * SIN agregar `?origen=` para no pisar el pasaporte `web-principal` de Meta Pixel + CAPI
 * en `conexigo.com` ni contaminar los conjuntos de anuncios pagados.
 */

export const WHATSAPP_CONEXIGO_COMERCIAL = '51938530423';

export const MENSAJE_WHATSAPP_DESDE_INFO =
  'Hola Hugo, vengo de tu Instagram y quiero ver cómo funciona ConexiGO en mi negocio';

export interface UtmInfoParams {
  campana: string;
  contenido: string;
}

export function construirUrlConexigoDesdeInfo({
  campana,
  contenido,
  ruta = '/',
}: UtmInfoParams & { ruta?: string }): string {
  const rutaNormalizada = ruta.startsWith('/') ? ruta : `/${ruta}`;
  const url = new URL(rutaNormalizada, 'https://conexigo.com');
  url.searchParams.delete('origen');
  url.searchParams.set('utm_source', 'instagram');
  url.searchParams.set('utm_medium', 'bio_info');
  url.searchParams.set('utm_campaign', campana);
  url.searchParams.set('utm_content', contenido);
  return url.toString();
}

export function construirUrlWhatsappConexigo(
  mensaje: string = MENSAJE_WHATSAPP_DESDE_INFO,
): string {
  const textoLimpio = mensaje.trim();
  return `https://wa.me/${WHATSAPP_CONEXIGO_COMERCIAL}?text=${encodeURIComponent(textoLimpio)}`;
}

export interface MetricaAutoridadInfo {
  valor: string;
  etiqueta: string;
}

export const PERFIL_HUGO_INFO = {
  nombre: 'Hugo Herrera',
  handle: '@hugoherreracoach',
  rol: 'Fundador de ConexiGO · Entrenador de Ventas',
  avatarSrc: '/subdomains/info/images/hugo-perfil-cuadrado.jpg',
  metricas: [
    { valor: '+20,000', etiqueta: 'entrenados en ventas' },
    { valor: '120+', etiqueta: 'equipos comerciales' },
    { valor: '4.9 ★', etiqueta: 'en Google (180+ reseñas)' },
  ] satisfies readonly MetricaAutoridadInfo[],
} as const;

export interface AnclaSeccionInfo {
  id: string;
  etiqueta: string;
  destacado?: boolean;
}

export const ANCLAS_NAVEGACION_INFO: readonly AnclaSeccionInfo[] = [
  { id: 'conexigo', etiqueta: 'ConexiGO IA', destacado: true },
  { id: 'libros', etiqueta: 'Libros' },
  { id: 'recursos', etiqueta: 'Recursos' },
  { id: 'empresas', etiqueta: 'Empresas' },
];

export const CONEXIGO_SHOWCASE_INFO = {
  insignia: 'NUEVO · MI CRM CON IA',
  titulo: 'El CRM con IA que responde y vende en tu WhatsApp 24/7.',
  subtitulo:
    'Entrené a +20,000 vendedores y creé ConexiGO para que ningún cliente quede en visto: Migo IA contesta al instante, filtra prospectos y une a tu equipo en un solo número.',
  puntosClave: [
    {
      titulo: 'Migo IA atiende por chat y voz 24/7',
      detalle: 'Responde en segundos con tu catálogo y confirma citas por teléfono.',
    },
    {
      titulo: 'Todo tu equipo en 1 solo WhatsApp',
      detalle: 'Reparte conversaciones y mira desde tu celular quién cierra y quién tarda.',
    },
    {
      titulo: 'Cero seguimientos olvidados',
      detalle: 'Embudo visual, recordatorios automáticos y métricas reales de cierre.',
    },
  ],
  ctaPrimarioTexto: 'Probar Migo IA y ver planes',
  ctaPrimarioHref: construirUrlConexigoDesdeInfo({
    campana: 'perfil_hugo',
    contenido: 'hero_cta_principal',
  }),
  ctaWhatsappTexto: 'Hablar por WhatsApp',
  ctaWhatsappHref: construirUrlWhatsappConexigo(),
  ctaFooterHref: construirUrlConexigoDesdeInfo({
    campana: 'perfil_hugo',
    contenido: 'footer_link',
  }),
  notaPrecio: 'Pruébalo en vivo en la web · Planes desde S/ 50/mes sin contratos forzosos',
  activosVisuales: {
    wordmark: {
      src: '/subdomains/info/images/conexigo-wordmark-dark.webp',
      alt: 'ConexiGO',
      width: 260,
      height: 111,
    },
    previewBandeja: {
      src: '/subdomains/info/images/conexigo-preview-chats.webp',
      alt: 'Bandeja unificada de WhatsApp e Instagram en ConexiGO con Migo IA respondiendo',
      width: 660,
      height: 1435,
    },
    previewMigo: {
      src: '/subdomains/info/images/conexigo-preview-migo.webp',
      alt: 'Configuración y saludo automático de Migo IA en ConexiGO',
      width: 660,
      height: 1435,
    },
    migoAvatar: {
      src: '/subdomains/info/images/migo-mark.webp',
      alt: 'Migo IA, asistente comercial de ConexiGO',
      width: 160,
      height: 222,
    },
  },
  capsulaMigo: {
    titulo: 'Migo IA · Tu vendedor y copiloto 24/7',
    subtitulo: 'Atiende WhatsApp, Instagram y confirma citas por llamada de voz.',
  },
} as const;

export interface LibroOHerramientaInfo {
  id: string;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  precioEtiqueta: string;
  botonTexto: string;
  href: string;
  imagen: {
    src: string;
    alt: string;
    width: number;
    height: number;
    modoEncuadre?: 'portada' | 'escena';
  };
}

export const LIBROS_Y_HERRAMIENTAS_INFO: readonly LibroOHerramientaInfo[] = [
  {
    id: 'lider-experto',
    etiqueta: 'LIBRO FÍSICO · DUEÑOS Y LÍDERES',
    titulo: 'Líder Experto',
    descripcion:
      'El paso a paso para armar un equipo comercial que cierre ventas todos los meses sin depender de ti.',
    precioEtiqueta: 'Libro GRATIS (solo cubres el envío)',
    botonTexto: 'Pedir mi copia gratis',
    href: 'https://liderexperto.hugoherreracoach.com/',
    imagen: {
      src: '/subdomains/info/images/liderExperto.jpg',
      alt: 'Portada del libro físico Líder Experto de Hugo Herrera',
      width: 458,
      height: 638,
    },
  },
  {
    id: 'cerrador-experto',
    etiqueta: 'SISTEMA DIGITAL · CIERRE 1 A 1',
    titulo: 'Cerrador Experto',
    descripcion:
      '139 respuestas probadas, palabra por palabra, para rebatir «está caro» o «lo voy a pensar» y cobrar hoy.',
    precioEtiqueta: 'Acceso inmediato · $7 USD',
    botonTexto: 'Obtener las 139 respuestas',
    href: 'https://cerradorexperto.hugoherreracoach.com/',
    imagen: {
      src: '/subdomains/info/images/cerradorExperto.jpg',
      alt: 'Portada del libro digital Cerrador Experto de Hugo Herrera',
      width: 920,
      height: 1300,
    },
  },
  {
    id: 'totalscript-ia',
    etiqueta: 'HERRAMIENTA WEB · COPYWRITING',
    titulo: 'TotalScript IA',
    descripcion:
      'Genera tu próximo guion de llamada, anuncio o mensaje comercial en 10 segundos con mi estructura.',
    precioEtiqueta: 'Registro gratuito',
    botonTexto: 'Generar guiones gratis',
    href: 'https://totalscript.hugoherreracoach.com/',
    imagen: {
      src: '/subdomains/info/images/totalscript-showcase.webp',
      alt: 'Interfaz de TotalScript IA generando un guion comercial estructurado en 10 segundos',
      width: 880,
      height: 492,
      modoEncuadre: 'escena',
    },
  },
];

export interface RecursoGratuitoInfo {
  id: string;
  titulo: string;
  descripcion: string;
  botonTexto: string;
  href: string;
  src: string;
  width: number;
  height: number;
}

export const RECURSOS_GRATUITOS_INFO: readonly RecursoGratuitoInfo[] = [
  {
    id: 'radiografia',
    titulo: 'Radiografía de Sistema Comercial',
    descripcion: 'Detecta los 15 errores ocultos que frenan la facturación de tu negocio.',
    botonTexto: 'Descargar radiografía',
    href: 'https://hugoherreracoach.com/recursos/radiografia',
    src: '/subdomains/info/images/radiografia.png',
    width: 700,
    height: 931,
  },
  {
    id: 'objeciones',
    titulo: 'Mapa para Desarmar Objeciones',
    descripcion: 'Distingue excusas de objeciones reales y mantén el control de la llamada.',
    botonTexto: 'Descargar mapa',
    href: 'https://hugoherreracoach.com/recursos/objeciones',
    src: '/subdomains/info/images/objeciones.png',
    width: 700,
    height: 921,
  },
  {
    id: 'preguntas',
    titulo: 'Guion de Calificación Estratégica',
    descripcion: 'Filtra curiosos en minutos e invierte tu agenda solo en compradores reales.',
    botonTexto: 'Descargar guion',
    href: 'https://hugoherreracoach.com/recursos/preguntas',
    src: '/subdomains/info/images/preguntas.png',
    width: 700,
    height: 848,
  },
  {
    id: 'capacitacion',
    titulo: 'Inducción de Vendedores en 30 Días',
    descripcion: 'La ruta para integrar vendedores nuevos y hacerlos producir desde el primer mes.',
    botonTexto: 'Descargar ruta',
    href: 'https://hugoherreracoach.com/recursos/capacitacion',
    src: '/subdomains/info/images/capacitacion.jpg',
    width: 700,
    height: 989,
  },
];

export const EMPRESAS_CTA_INFO = {
  etiqueta: 'ENTRENAMIENTO EN EMPRESAS Y CONFERENCIAS',
  titulo: '¿Quieres que entrene en vivo a tu equipo comercial?',
  descripcion:
    'Inmersiones presenciales en cualquier ciudad del Perú, conferencias y el programa de Aceleración Comercial con garantía de resultados.',
  ctaPrimarioTexto: 'Agendar llamada gratis de 20 min',
  ctaPrimarioHref: LLAMADA_GRATIS_URL,
  notaAsesor: 'Videollamada sin compromiso con un asesor de mi equipo.',
  ctaSecundarioTexto: 'Ver servicios y precios para empresas',
  ctaSecundarioHref: 'https://hugoherreracoach.com/servicios/aceleracion-comercial',
} as const;
