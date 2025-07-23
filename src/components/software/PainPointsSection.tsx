'use client';

import { useState, type ReactElement, type ElementType } from 'react';
import {
    ChevronDown,
    CircleDollarSign,
    Shuffle,
    Unplug,
    Users
} from 'lucide-react';

// Interfaz para definir la forma de cada "punto de dolor" de manera segura.
interface PainPoint {
    icon: ElementType;
    title: string;
    description: string;
}

// Array con los nuevos datos, utilizando la interfaz y las referencias a los iconos.
const painPoints: PainPoint[] = [
    {
        icon: CircleDollarSign,
        title: "Tu web es un folleto digital, no un motor de ventas.",
        description: "Atrae curiosos, no compradores. Es un gasto que justificas, no un activo que produce. Operas a ciegas, sin datos ni control."
    },
    {
        icon: Shuffle,
        title: "Tu 'sistema' de ventas es un Excel y mil chats de WhatsApp.",
        description: "El seguimiento depende de la memoria de cada vendedor y los cierres son una lotería. Tu tiempo se fuga en la urgencia, no en la estrategia.."
    },
    {
        icon: Unplug,
        title: "Tu generación de clientes es alquilada, no propia.",
        description: "Dependes 100% de la publicidad, sin un activo propio que convierta. Le construyes el negocio a Meta y a Google, no a ti."
    },
    {
        icon: Users,
        title: "La inversión en marketing se fuga en el proceso.",
        description: "Tu inversión genera leads que tu equipo desperdicia por falta de un sistema. Es dinero que se fuga y ventas que le regalas a la competencia."
    }
];

export default function PainPointsSection(): ReactElement {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const activePoint = activeIndex !== null ? painPoints[activeIndex] : null;

    return (
        <section id="problemas" className="w-full bg-slate-50 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Título y subtítulo de la sección, actualizados con el nuevo contenido */}
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        Los síntomas de operar sin un sistema digital
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
                        Estos no son problemas aislados. Son las consecuencias predecibles de no tener una estructura comercial construida para vender.
                    </p>
                </div>

                {/* Contenedor principal que mantiene la lógica de cambio de layout */}
                <div className="mx-auto mt-10 max-w-7xl">

                    {/* VISTA MÓVIL: ACORDEÓN (visible solo en pantallas pequeñas) */}
                    <div className="space-y-4 lg:hidden">
                        {painPoints.map((point, index) => (
                            <div key={point.title} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="flex w-full items-center gap-4 p-4 text-left"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#0a4afc]/15">
                                        <point.icon className="h-6 w-6 text-[#0a4afc]" />
                                    </div>
                                    <span className="flex-grow text-xl leading-[1.3] font-semibold text-balance text-slate-800">{point.title}</span>
                                    <ChevronDown
                                        className={`h-6 w-6 flex-shrink-0 text-slate-500 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {/* Contenido del acordeón con transición suave */}
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <div className="px-4 pb-6">
                                        <p className="text-xl leading-[1.4] text-slate-600 text-balance">{point.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* VISTA DE ESCRITORIO: LISTA INTERACTIVA STICKY (visible solo en pantallas grandes) */}
                    <div className="hidden lg:grid lg:grid-cols-3 max-w-full lg:gap-16 lg:items-center">
                        {/* Columna Izquierda: Lista de botones */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24 space-y-2">
                                {painPoints.map((point, index) => (
                                    <button
                                        key={point.title}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                                            activeIndex === index
                                                ? 'bg-white scale-105 shadow-xl'
                                                : 'bg-transparent text-slate-600 hover:bg-slate-200/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8">
                                                <point.icon className={`h-6 w-6 transition-colors ${activeIndex === index ? 'text-[#0a4afc]' : 'text-slate-500'}`} />
                                            </div>
                                            <span className={`font-semibold text-lg transition-colors ${activeIndex === index ? 'text-slate-900' : ''}`}>
                                                {point.title}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Columna Derecha: Panel de detalles del punto activo */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-8 lg:p-12 shadow-xl min-h-[300px] flex flex-col justify-center sticky top-24">
                                {activePoint && (
                                    <div>
                                        <div className="flex flex-col sm:flex-row items-center gap-x-4">
                                            <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-[#0a4afc]/15">
                                                <activePoint.icon className="h-7 w-7 text-[#0a4afc]" aria-hidden="true" />
                                            </div>
                                            <h3 className="mt-4 lg:mt-0 text-2xl lg:text-3xl font-bold text-slate-900">
                                                {activePoint.title}
                                            </h3>
                                        </div>
                                        <p className="mt-4 text-xl lg:text-2xl leading-[1.4] text-slate-700">
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