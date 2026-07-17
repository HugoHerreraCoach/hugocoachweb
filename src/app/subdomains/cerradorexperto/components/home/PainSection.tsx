//src/components/home/PainSection.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { XCircle, ChevronDown } from 'lucide-react';

type PainPoint = {
    title: string;
    description: string;
};

const painPoints: PainPoint[] = [
    {
        title: "Te paralizas ante el primer 'no'.",
        description: "Escuchas 'está muy caro' y tu mente se queda en blanco, perdiendo por completo el control de la conversación."
    },
    {
        title: "Regalas consultorías, no cierras ventas.",
        description: "Inviertes horas explicando todo, para que al final te digan 'gracias, yo te aviso', y nunca más saber de ellos."
    },
    {
        title: "Te sientes incómodo al pedir el dinero.",
        description: "La transición para hablar del pago es forzada y torpe. Terminas perdiendo ventas por no ser directo y seguro."
    },
    {
        title: "Ves a otros cerrar más que tú.",
        description: "Sabes que tu producto es bueno, pero te falta la estructura exacta para transformar el interés en un contrato firmado."
    }
];

const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = (): void => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, query]);
    return matches;
};

export default function PainSection(): React.ReactElement {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    // ✅ CAMBIO 1: El primer item (índice 0) ahora está abierto por defecto.
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="dolor"
            className="relative bg-gradient-to-b from-black to-slate-900 text-white py-24 sm:py-32"
        > 
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-balance lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        ¿Esta es tu realidad diaria?
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.5] text-gray-300 text-balance">
                        Dominas tu servicio, pero en el momento clave del cierre, algo siempre falla.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-3xl lg:max-w-none">
                    {isDesktop ? (
                        <div className="grid grid-cols-2 gap-8">
                            {/* La vista de escritorio se mantiene sin cambios */}
                            {painPoints.map((point) => (
                                <div key={point.title} className="flex flex-col gap-y-6 rounded-xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-sm">
                                    <div className="flex items-center gap-x-4">
                                        <XCircle aria-hidden="true" className="h-9 w-9 flex-none text-red-500/80" strokeWidth={1.5} />
                                        <h3 className="text-2xl font-semibold leading-tight text-white">{point.title}</h3>
                                    </div>
                                    <p className="text-xl leading-relaxed text-gray-400">{point.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {painPoints.map((point, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div key={point.title} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300">
                                        <button
                                            onClick={() => handleToggle(index)}
                                            className="w-full p-5 text-left flex justify-between items-center gap-4"
                                            aria-expanded={isOpen}
                                        >
                                            <div className="flex items-center gap-x-4">
                                                <XCircle aria-hidden="true" className="h-8 w-8 flex-none text-red-500/80" strokeWidth={1.5} />
                                                <h3 className="flex-1 text-xl font-semibold text-white">{point.title}</h3>
                                            </div>

                                            {/* ✅ CAMBIO 2: Ícono encapsulado, más grande y con estado activo. */}
                                            <div className={`flex-shrink-0 grid place-items-center h-10 w-10 rounded-full border transition-colors duration-300 ${isOpen ? 'border-primary-blue bg-primary-blue/10' : 'border-white/20 bg-white/5'}`}>
                                                <ChevronDown
                                                    aria-hidden="true"
                                                    className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'rotate-180 text-primary-blue' : 'text-white/70'}`}
                                                />
                                            </div>

                                        </button>
                                        <div
                                            className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="px-6 pb-6 pt-2 text-lg leading-relaxed text-gray-400">
                                                    {point.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}