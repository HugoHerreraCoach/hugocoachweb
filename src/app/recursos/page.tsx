//src/app/recursos/page.tsx

import { ResourceCard } from '@/components/ui/ResourceCard';
// Importamos los íconos
import { Map, ListChecks, Activity, GraduationCap, MessagesSquare } from 'lucide-react';
import type { Metadata } from 'next';

// Metadatos para SEO y posicionamiento
export const metadata: Metadata = {
    title: 'Recursos | Hugo Herrera Coach',
    description: 'Recursos gratuitoa para mejorar tus ventas.',
};


// Separamos los datos del diseño. Esto es escalable.
const resourcesData = [
    {
        tag: 'PARA VENDEDORES',
        title: 'Mapa Definitivo de Objeciones',
        description: 'El sistema probado para desarmar la excusa, descubrir la objeción real y tomar el control de la conversación para provocar el cierre.',
        ctaText: 'Obtener Sistema',
        ctaLink: '/recursos/objeciones',
        icon: <Map className="h-6 w-6 text-slate-600" />
    },
    {
        tag: 'PARA VENDEDORES',
        title: '50 Preguntas Estratégicas de Calificación',
        description: 'Deja de perder tu tiempo con prospectos que no van a comprar. Este es el guion de preguntas exacto para filtrar a los curiosos y detectar a los compradores reales en minutos.',
        ctaText: 'Obtener Guion',
        ctaLink: '/recursos/preguntas',
        icon: <ListChecks className="h-6 w-6 text-slate-600" />
    },
    {
        tag: 'PARA DUEÑOS DE NEGOCIO',
        title: 'Radiografía de tu Sistema Comercial',
        description: 'La herramienta de diagnóstico para dueños que están cansados de "apagar fuegos". Identifica los 15 errores ocultos que frenan tu crecimiento y obtén claridad total sobre qué palanca mover para escalar.',
        ctaText: 'Obtener Diagnóstico',
        ctaLink: '/recursos/radiografia',
        icon: <Activity className="h-6 w-6 text-slate-600" />
    },
    {
        tag: 'PARA LÍDERES DE EQUIPO',
        title: 'Sistema de Capacitación de 30 Días',
        description: 'El plan de estudios probado para transformar a un vendedor nuevo en un cerrador de élite. Deja de repetir la misma capacitación, instala un sistema que construya a tu equipo por ti.',
        ctaText: 'Obtener Plan de Acción',
        ctaLink: '/recursos/capacitacion',
        icon: <GraduationCap className="h-6 w-6 text-slate-600" />
    },
    {
        tag: 'PARA VENDEDORES',
        title: 'Plantillas de Seguimiento por WhatsApp',
        description: 'La estrategia de 7 días para convertir conversaciones en ventas sin sonar insistente y sin dejar que los prospectos se enfríen.',
        ctaText: 'Obtener Plantillas',
        ctaLink: '/recursos/seguimiento', // La URL de la página que ya creaste
        icon: <MessagesSquare className="h-6 w-6 text-slate-600" /> // El nuevo ícono
    }
];

export default function RecursosPage() {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 py-20 lg:py-28">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        Sistemas de Venta Gratuitos para Ejecutar Hoy
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed text-slate-600">
                        Menos teoría, más herramientas. Escoge el sistema que necesitas para escalar tus resultados. Cada recurso es una pieza probada de mi metodología, diseñada para ser implementada, no solo leída.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
                    {resourcesData.map((resource) => (
                        <ResourceCard
                            key={resource.title}
                            tag={resource.tag}
                            title={resource.title}
                            description={resource.description}
                            ctaText={resource.ctaText}
                            ctaLink={resource.ctaLink}
                            icon={resource.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}