// src/lib/blog-posts.ts

import { Post } from './types';

export const posts: Post[] = [
  {
    slug: 'virus-mental-vendedores',
    title: 'El "Virus" Mental que Sabotea al 90% de los Vendedores (y cómo eliminarlo en 7 días)',
    description: 'Ataca un dolor universal (el miedo al rechazo, la mentalidad de escasez) y promete una solución clara.',
    image: '/images/blog/virus-mental.jpg',
    category: 'Mentalidad',
    readingTime: 7,
    publishedAt: '2025-07-28',
    featured: true,
    highlights: [
      'Descubre los 3 pilares mentales que separan a los amateurs de los profesionales de élite.',
      'Aprende a transformar el rechazo en una herramienta de crecimiento (Mentalidad Anti-Frágil).',
      'Cambia tu enfoque de "vender productos" a "solucionar dolores" para ser indispensable.',
      'Adopta la mentalidad del "Discípulo Eterno" para una mejora continua e imparable.'
    ],
    leadMagnet: {
      title: 'Checklist de Mentalidad de Élite',
      cta: 'Descargar Checklist',
      link: '/lead-magnet/checklist-mentalidad'
    },
    secondaryCta: {
      text: 'Erradica este virus en una sesión de coaching',
      link: '/servicios/coaching'
    }
  },
  {
    slug: 'linkedin-maquina-prospeccion',
    title: 'Deja de "Quemar" Leads: Cómo Convertí mi LinkedIn en una Máquina de Prospección Automática',
    description: 'Ofrece una solución a un problema técnico y recurrente. Posiciona a LinkedIn como una herramienta activa, no pasiva.',
    image: '/images/blog/linkedin-machine.jpg',
    category: 'Prospección',
    readingTime: 9,
    publishedAt: '2025-08-04',
    highlights: [
        'Transforma tu perfil de LinkedIn de un simple CV a una potente página de ventas.',
        'Domina la estrategia de contenidos que posiciona tu autoridad y atrae prospectos calificados.',
        'Aprende a escribir mensajes de contacto que superan el 50% de tasa de respuesta.',
        'Implementa un sistema para que la prospección en LinkedIn trabaje para ti, no al revés.'
    ],
    leadMagnet: {
      title: '5 Plantillas de Mensajes para LinkedIn',
      cta: 'Obtener las 5 Plantillas',
      link: '/lead-magnet/plantillas-linkedin'
    },
    secondaryCta: {
      text: 'Implementa un sistema de prospección completo en tu empresa',
      link: '/servicios/asesoria-comercial'
    }
  },
  {
    slug: 'respuesta-objecion-muy-caro',
    title: 'Mi Respuesta Exacta a la Objeción "Es muy caro" que Aumenta el Cierre un 30%',
    description: 'Muestras una pieza clave de tu metodología, generando un deseo de conocer el resto.',
    image: '/images/blog/objecion-caro.jpg',
    category: 'Cierre de Ventas',
    readingTime: 6,
    publishedAt: '2025-08-11',
    highlights: [
        'Por qué "es muy caro" rara vez se trata del dinero y cómo descubrir la objeción real.',
        'La fórmula de 3 pasos (A.R.P.) para desarmar la objeción y mantener el control de la conversación.',
        'Cómo re-enmarcar el precio comparándolo con el costo de NO solucionar el problema.',
        'La técnica de cierre final para asegurar que la objeción ha sido resuelta de verdad.'
    ],
    leadMagnet: {
      title: 'Guía para Manejar las 5 Objeciones Más Comunes',
      cta: 'Descargar la Guía Ahora',
      link: '/lead-magnet/guia-objeciones'
    },
    secondaryCta: {
      text: 'Entrena a tu equipo para que domine cualquier objeción',
      link: '/servicios/entrenamiento-equipos'
    }
  },
  {
    slug: 'anatomia-venta-imposible',
    title: 'Anatomía de una Venta: El Caso de la Inmobiliaria que Duplicó su Facturación en 60 Días',
    description: 'Las historias venden más que los hechos. Este formato de "deconstrucción" de un éxito real genera una confianza inmensa.',
    image: '/images/blog/caso-exito.jpg',
    category: 'Caso de Éxito',
    readingTime: 8,
    publishedAt: '2025-08-18',
    highlights: [
        'El diagnóstico preciso del "Síndrome del Vendedor-Catálogo" que estancaba al equipo.',
        'La implementación del "Sistema de Calificación de 3 Filtros" para identificar compradores reales.',
        'Cómo enfocar el 80% del tiempo en el 20% de los prospectos que sí van a comprar.',
        'El resultado: duplicar la facturación en 60 días sin aumentar el presupuesto de marketing.'
    ],
    leadMagnet: {
      title: '¿Quieres un Diagnóstico para tu Negocio?',
      cta: 'Agendar Sesión Gratuita',
      link: '/agenda-diagnostico'
    },
    secondaryCta: {
      text: 'Descubre si una asesoría estratégica es para ti',
      link: '/servicios/asesoria-comercial'
    }
  },
  {
    slug: 'dueno-sistema-ventas',
    title: 'Si tu Negocio Depende de Ti para Vender, No Tienes un Negocio, Tienes un Empleo. Cómo Solucionarlo.',
    description: 'Habla directamente al dolor del dueño de negocio abrumado. Eleva la conversación de "vender más" a "construir un activo que genere ventas".',
    image: '/images/blog/sistema-ventas.jpg',
    category: 'Estrategia',
    readingTime: 7,
    publishedAt: '2025-08-25',
    highlights: [
        'La diferencia crucial entre ser un "Emprendedor-Orquesta" y un verdadero dueño de negocio.',
        'Cómo construir tu "Playbook de Ventas": el manual de instrucciones para que otros vendan como tú.',
        'Las claves para contratar y formar un equipo de ventas que no dependa de tu presencia constante.',
        'El rol de la tecnología (CRM) para acelerar tu sistema y darte libertad real.'
    ],
    leadMagnet: {
      title: 'Checklist para Elegir y Configurar tu CRM',
      cta: 'Descargar Checklist de CRM',
      link: '/lead-magnet/checklist-crm'
    },
    secondaryCta: {
      text: 'Te ayudo a construir el sistema de ventas para tu negocio',
      link: '/servicios/desarrollo-software'
    }
  }
];