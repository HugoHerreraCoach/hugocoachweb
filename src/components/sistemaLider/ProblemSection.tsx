'use client';

import { useState } from 'react';
import {
    Filter,
    Workflow,
    TrendingDown,
    Repeat,
    Gauge,
    ShieldAlert,
    ChevronDown
} from 'lucide-react';
import type { ElementType } from 'react';


interface PainPoint {
    icon: ElementType;
    title: string;
    description: string;
}


const painPoints: PainPoint[] = [
    {
        icon: Filter,
        title: 'Eres el Cuello de Botella',
        description: 'Las ventas importantes, las soluciones a problemas complejos y el crecimiento dependen 100% de ti. Tu negocio no avanza si tú no lo empujas personalmente cada día.'
    },
    {
        icon: Workflow, 
        title: 'Tu Equipo Opera por Iniciativa, no por Proceso',
        description: 'Cada vendedor tiene su propio método. No hay un guion, ni un proceso medible. Es imposible replicar lo que funciona, y por lo tanto, es imposible escalar.'
    },
    {
        icon: TrendingDown, 
        title: 'El Crecimiento es Inestable',
        description: 'Tus ventas suben y bajan sin un patrón claro. Esta incertidumbre te frena a la hora de invertir, contratar o tomar riesgos calculados para el futuro de la empresa.'
    },
    {
        icon: Repeat,
        title: 'Capacitar Vendedores Drena tu Tiempo',
        description: 'Inviertes semanas de tu valioso tiempo en formar a los nuevos, solo para que no rindan o se vayan. Tu sistema de onboarding no es una máquina predecible, es un trabajo manual repetitivo.'
    },
    {
        icon: Gauge,
        title: 'Diriges sin Indicadores Claros',
        description: 'Tomas decisiones basadas en la intuición porque no tienes un panel de control con los indicadores comerciales clave. Vas a ciegas, sin saber qué palanca mover para mejorar los resultados.'
    },
    {
        icon: ShieldAlert,
        title: 'Estás Atrapado en la Operación Diaria',
        description: 'Tu rol se ha convertido en el de un supervisor a tiempo completo. Resuelves las urgencias del día a día en lugar de diseñar el crecimiento del mañana.'
    },
];

export function ProblemSection(): React.ReactElement {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const activePoint = painPoints[activeIndex];

    return (
        <section className="w-full bg-slate-50 py-20 lg:py-28">
            <div className="mx-auto max-w-full px-6 lg:px-8">
                {/* Título y subtítulo de la sección, centrados y con estilos impactantes */}
                <div className="mx-auto max-w-7xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        ¿Tu situación actual se parece a esto?
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
                        Si reconoces estos puntos, es porque estás operando sin un sistema.
                    </p>
                </div>

                {/* Contenedor principal para las vistas móvil y de escritorio */}
                <div className="mx-auto mt-8 lg:mt-16 max-w-7xl">
                    {/* VISTA MÓVIL: ACORDEÓN */}
                    <div className="space-y-4 lg:hidden">
                        {painPoints.map((point, index) => (
                            <div key={point.title} className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                    className="flex w-full items-center gap-4 p-4 text-left"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#0a4afc]/15">
                                        <point.icon className="h-5 w-5 text-[#0a4afc]" />
                                    </div>
                                    <span className="flex-grow text-lg font-semibold text-slate-800">{point.title}</span>
                                    <ChevronDown
                                        className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {/* Contenido del acordeón que se expande/contrae suavemente */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <div className="px-4 pb-4 pl-16">
                                        <p className="text-lg leading-[1.4] text-slate-600">{point.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* VISTA DE ESCRITORIO: LISTA INTERACTIVA STICKY */}
                    <div className="hidden lg:grid lg:grid-cols-3 max-w-full lg:gap-16 lg:place-items-center">
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24 space-y-2">
                                {painPoints.map((point, index) => (
                                    <button
                                        key={point.title}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer ${activeIndex === index
                                                ? 'bg-white scale-105 shadow-lg' 
                                                : 'bg-transparent text-slate-600 hover:bg-slate-200/60' 
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Contenedor del icono */}
                                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8">
                                                {/* Icono que cambia de color según el estado activo */}
                                                <point.icon className={`h-6 w-6 transition-colors ${activeIndex === index ? 'text-[#0a4afc]' : 'text-slate-500'}`} />
                                            </div>
                                            {/* Título del punto de dolor que cambia de color según el estado activo */}
                                            <span className={`font-semibold text-lg transition-colors ${activeIndex === index ? 'text-slate-900' : ''}`}>{point.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Columna derecha: Panel de detalles del punto activo */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-8 shadow-xl min-h-[250px] flex flex-col justify-center">
                                {/* Solo renderiza el contenido si hay un punto activo */}
                                {activePoint && (
                                    <div>
                                        <div className="flex items-center gap-x-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a4afc]/15">
                                                <activePoint.icon className="h-7 w-7 text-[#0a4afc]" aria-hidden="true" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-900 text-balance">
                                                {activePoint.title}
                                            </h3>
                                        </div>
                                        <p className="mt-4 text-2xl leading-relaxed text-slate-700">
                                            {activePoint.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}