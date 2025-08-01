// src/lib/blog-posts.ts

import { Post } from './types';

export const posts: Post[] = [
  {
    slug: 'virus-mental-vendedores',
    title: 'El "Virus" Mental que Sabotea al 90% de los Vendedores (y cómo eliminarlo)',
    description: 'El 90% de los vendedores se auto-sabotean sin saberlo. Te entrego el sistema para erradicar el "virus" que frena tus resultados y construir una mentalidad de élite.',
    image: '/images/blog/virusMentalHeader.jpg',
    category: 'Mentalidad',
    readingTime: 7,
    publishedAt: '2025-07-28',
    featured: true,
    highlights: [
      'Los 3 pilares que separan a un amateur de un cerrador de élite.',
      'Convierte el rechazo en tu mejor herramienta de crecimiento.',
      'Deja de vender productos. Empieza a solucionar dolores concretos.',
      'El sistema de mejora continua para no estancarte jamás.'
    ],
    leadMagnet: {
      title: '50 preguntas para calificar clientes',
      cta: 'Descargar Guís',
      link: '/recursos/preguntas'
    },
    secondaryCta: {
      text: 'Erradica este virus en una sesión de coaching',
      link: '/servicios/coaching'
    }
  },
  {
    slug: 'linkedin-maquina-prospeccion',
    title: 'Convierte tu LinkedIn en una Máquina de Prospección Automática',
    description: 'Tu perfil de LinkedIn es un CV o una máquina de generar reuniones. La mayoría lo usa como lo primero. Aquí te enseño el sistema paso a paso para convertirlo en lo segundo.',
    image: '/images/blog/quemarLeadsHeader.jpg',
    category: 'Prospección',
    readingTime: 9,
    publishedAt: '2025-08-04',
    highlights: [
        'Transforma tu perfil de CV a una página de ventas 24/7.',
        'El método de contenido que te posiciona como autoridad, no como spam.',
        'El guion exacto para superar el 50% de respuestas en frío.',
        'Un sistema para que LinkedIn te traiga prospectos mientras duermes.'
    ],
    leadMagnet: {
      title: 'Radiografía de tu Sistema Comercial',
      cta: 'Obtener Radiografía',
      link: '/recursos/radiografia'
    },
    secondaryCta: {
      text: 'Implementa un sistema de prospección completo en tu empresa',
      link: '/servicios/asesoria-comercial'
    }
  },
  {
    slug: 'respuesta-objecion-muy-caro',
    title: 'Mi Respuesta a "Es muy caro" que Aumenta el Cierre un 30%',
    description: 'Escuchar "es muy caro" no es el fin, es el inicio de la venta real. Te entrego mi guion probado de 3 pasos para desarmar esta objeción y re-enfocar la conversación en el valor.',
    image: '/images/blog/muyCaroHeader.jpg',
    category: 'Cierre de Ventas',
    readingTime: 6,
    publishedAt: '2025-08-11',
    highlights: [
        'Descubre la verdadera razón detrás del "es muy caro".',
        'Mi fórmula A.R.P.: 3 pasos para desarmar la objeción al instante.',
        'Cómo anclar el precio al costo real de la inacción.',
        'La técnica de cierre para confirmar que la objeción fue resuelta.'
    ],
    leadMagnet: {
      title: 'Mapa Definitivo de Objeciones',
      cta: 'Descargar el Mapa Ahora',
      link: '/recursos/objeciones'
    },
    secondaryCta: {
      text: 'Entrena a tu equipo para que domine cualquier objeción',
      link: '/servicios/entrenamiento-equipos'
    }
  },
  {
    slug: 'anatomia-venta-imposible',
    title: 'Caso de Estudio: Cómo una Inmobiliaria Duplicó su Facturación en 60 Días',
    description: 'Duplicar la facturación en 60 días no es magia, es método. Desgloso el caso real para que copies la estrategia: diagnóstico, sistema y ejecución.',
    image: '/images/blog/anatomiaDeVentaHeader.jpg',
    category: 'Caso de Éxito',
    readingTime: 8,
    publishedAt: '2025-08-18',
    highlights: [
        'Diagnóstico: El error del "Vendedor-Catálogo" que estancaba al equipo.',
        'El sistema de 3 filtros para dejar de perseguir malos prospectos.',
        'Enfoca el 80% de tu energía en el 20% de clientes que sí van a cerrar.',
        'Resultado: Facturación x2 en 60 días. Cero aumento en marketing.'
    ],
    leadMagnet: {
      title: '¿Quieres un Diagnóstico para tu Negocio?',
      cta: 'Obtener Diagnóstico Gratis',
      link: '/recursos/radiografia'
    },
    secondaryCta: {
      text: 'Descubre si una asesoría estratégica es para ti',
      link: '/servicios/asesoria-comercial'
    }
  },
  {
    slug: 'dueno-sistema-ventas',
    title: 'Si tu Negocio Depende de Ti para Vender, Tienes un Empleo',
    description: 'Si vives "apagando fuegos", no tienes un negocio, tienes un autoempleo. Te enseño a construir un sistema de ventas que funcione sin ti, para que pases de ser vendedor a ser dueño.',
    image: '/images/blog/negocioLibreHeader.jpg',
    category: 'Estrategia',
    readingTime: 7,
    publishedAt: '2025-08-25',
    highlights: [
        'Pasa de ser el "Hombre-Orquesta" a un verdadero dueño de negocio.',
        'Construye tu Guion de Ventas: el manual para clonar a tu mejor vendedor.',
        'Contrata y entrena un equipo que venda sin tu supervisión constante.',
        'Usa la tecnología (CRM) para construir libertad, no más trabajo.'
    ],
    leadMagnet: {
      title: 'Sistema de Capacitación de Vendedores en 30 días',
      cta: 'Descargar Sistema Gratis',
      link: '/recursos/capacitacion'
    },
    secondaryCta: {
      text: 'Te ayudo a construir el sistema de ventas para tu negocio',
      link: '/servicios/desarrollo-software'
    }
  }
];