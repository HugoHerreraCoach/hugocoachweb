// src/components/coaching/CtaSection.tsx

import { Check, Rocket } from 'lucide-react';
import React from 'react';

// La interfaz y el array de datos se mantienen para seguir las buenas prácticas de TypeScript.
interface Deliverable {
    text: string;
}

const deliverables: Deliverable[] = [
    { text: 'sistema de Comisiones Aceleradas (4 Semanas)' },
    { text: 'Acceso a Talleres Grupales (3 Meses)' },
    { text: 'Manual Digital "Cerrador Experto"' },
    { text: '"Coach de Bolsillo" por WhatsApp (4 Semanas)' },
    { text: 'Grabaciones Completas del Entrenamiento' },
];

export default function CtaSection(): React.ReactElement {
    const totalValue: number = 2175;
    const investment: number = 1000;

    return (
        <section className="bg-black text-white min-h-[91vh] flex justify-center items-center py-16 lg:py-20 overflow-hidden">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Contenedor con efecto de borde de gradiente */}
                <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-blue-400/50 to-slate-700 shadow-2xl shadow-blue-500/10">
                    <div className="rounded-[15px] bg-slate-900 p-6 lg:p-8 text-center">

                        <div className="flex justify-center mb-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0a4afc] to-[#153eb5]">
                                <Rocket className="h-8 w-8 text-white" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                            Es hora de tomar una decisión: Seguir igual o construir tu futuro.
                        </h2>

                        <p className="mt-4 text-xl lg:text-2xl text-slate-300 max-w-2xl mx-auto">
                            Este es el arsenal completo que recibes:
                        </p>

                        <ul className="mt-6 text-left max-w-lg mx-auto space-y-2">
                            {deliverables.map((item: Deliverable, index: number) => (
                                <li key={index} className="flex items-center gap-3">
                                    <Check className="h-7 w-7 flex-shrink-0 text-blue-400" />
                                    <span className="text-xl lg:text-2xl text-slate-200">{item.text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 border-t border-slate-700 pt-6">
                            <p className="text-xl font-medium text-slate-400">
                                Valor Total del Paquete: <span className="line-through">${totalValue} USD</span>
                            </p>
                            <p className="mt-1 text-4xl font-bold tracking-tight text-white lg:text-5xl">
                                Única Inversión: ${investment} USD
                            </p>
                        </div>

                        <p className="mt-6 text-xl leading-[1.4] text-yellow-400 font-semibold">
                            Para garantizar resultados de élite, solo acepto a 4 vendedores por mes.
                        </p>

                        <div className="mt-6 mb-12">
                            <a
                                href="https://calendly.com/hugoherrera-coach/agendar-videollamada"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-xl lg:text-2xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                            >
                                <span className="text-xl tracking-wide">
                                    APLICAR AHORA Y CONSTRUIR MI FUTURO
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}