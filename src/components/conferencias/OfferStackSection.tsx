// src/components/conferencias/OfferStackSection.tsx
'use client';

import { useState } from 'react';
import {
    Presentation,
    Settings2,
    BookOpen,
    Award,
    FileText,
    BadgeDollarSign,
    ChevronDown,
    type LucideProps,
} from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Interfaz para definir la estructura de cada componente del sistema.
interface SystemComponent {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    title: string;
    description: string;
}

// Datos centralizados de los componentes del sistema.
const systemComponents: SystemComponent[] = [
    {
        icon: Presentation,
        title: 'Sesión práctica con tu equipo',
        description: 'Hasta 2 horas para enseñarle a tu equipo, paso a paso, cómo cerrar más ventas.',
    },
    {
        icon: Settings2,
        title: 'Manual de Ventas a Medida',
        description: 'Un manual hecho para tu empresa, con tu forma de vender paso a paso. Sirve de guía para todo el equipo.',
    },
    {
        icon: BookOpen,
        title: 'Soporte Directo (15 Días)',
        description: 'Durante 15 días tu equipo puede escribirme sus dudas de venta y yo les respondo.',
    },
    {
        icon: Award,
        title: 'Acceso a "Lobos de Ventas"',
        description: 'Acceso de por vida a más de 350 videos para que sigas entrenando a tu equipo.',
    },
    {
        icon: FileText,
        title: 'Libro digital "Cerrador Experto"',
        description: 'Cada vendedor recibe el libro digital con 139 respuestas probadas para que no pierdan ventas por una duda del cliente.',
    },
    {
        icon: BadgeDollarSign,
        title: 'Crédito de USD 500 para tu siguiente programa',
        description: 'Recibes USD 500 de crédito para usar en otro programa o taller conmigo.',
    },
];

export const OfferStackSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Dejamos el primero abierto por defecto

    const handleToggle = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full text-white py-20 sm:py-28 overflow-hidden bg-gradient-to-t from-black to-slate-900 bg-fixed">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        No vendo solo una conferencia. Dejo un método completo.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 text-balance">
                        La conferencia es el primer paso. Esto es lo que recibe tu equipo:
                    </p>
                </div>

                {/* El Blueprint Interactivo */}
                <div className="relative mt-12 lg:mt-20">
                    {/* Eje Central / System Bus */}
                    <div
                        className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-700"
                        aria-hidden="true"
                    />

                    <div className="space-y-8">
                        {systemComponents.map((item: SystemComponent, index: number) => {
                            const IconComponent = item.icon;
                            const isOpen = openIndex === index;

                            return (
                                <div key={item.title} className="relative">
                                    {/* Contenedor del Nodo y Título (el botón clickeable) */}
                                    <button
                                        onClick={() => handleToggle(index)}
                                        className="flex w-full items-center gap-5 text-left cursor-pointer"
                                        aria-expanded={isOpen}
                                        aria-controls={`component-content-${index}`}
                                    >
                                        {/* Nodo Unificado (Círculo + Icono) */}
                                        <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ring-8 ring-slate-900 transition-colors duration-300 bg-slate-800 border border-slate-700">
                                            <IconComponent className={`h-6 w-6 transition-colors duration-300 ${isOpen ? 'text-[#0a4afc]' : 'text-slate-400'}`} />
                                        </div>

                                        <h3 className="flex-grow text-xl font-semibold text-white lg:text-2xl">
                                            {item.title}
                                        </h3>

                                        <ChevronDown className={`h-6 w-6 flex-shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Panel de Contenido Desplegable */}
                                    <div
                                        id={`component-content-${index}`}
                                        className={`grid overflow-hidden pl-16 transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="pb-4 text-xl lg:text-2xl leading-[1.4] text-slate-300 border-b border-slate-800">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};