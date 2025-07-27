// src/components/conferencias/QualificationSection.tsx
'use client';

import { CheckCircle2, XCircle, type LucideProps } from 'lucide-react';
import React, { useState } from 'react';


type QualificationType = 'positive' | 'negative';

interface QualificationItem {
    icon: React.ElementType<LucideProps>;
    text: string;
    iconClassName: string;
}

interface QualificationCardProps {
    title: string;
    items: QualificationItem[];
    type: QualificationType;
    isActive: boolean;
    onClick: () => void;
}

const positivePoints: QualificationItem[] = [
    { icon: CheckCircle2, text: 'Exiges un ROI, no solo un aplauso.', iconClassName: 'text-green-600' },
    { icon: CheckCircle2, text: 'Valoras un sistema probado por encima del talento individual.', iconClassName: 'text-green-600' },
    { icon: CheckCircle2, text: 'Tu objetivo es estandarizar para poder escalar.', iconClassName: 'text-green-600' },
    { icon: CheckCircle2, text: 'Buscas instalar herramientas, no escuchar discursos.', iconClassName: 'text-green-600' },
];

const negativePoints: QualificationItem[] = [
    { icon: XCircle, text: 'Solo necesitas "rellenar una hora" en tu evento.', iconClassName: 'text-red-600' },
    { icon: XCircle, text: 'Crees que la venta es un "arte" basado en el carisma.', iconClassName: 'text-red-600' },
    { icon: XCircle, text: 'Buscas una charla, no un resultado medible.', iconClassName: 'text-red-600' },
    { icon: XCircle, text: 'Prefieres la operación diaria a la estrategia a largo plazo.', iconClassName: 'text-red-600' },
];


const QualificationCard: React.FC<QualificationCardProps> = ({ title, items, type, isActive, onClick }) => {
    const baseRingClass = 'ring-2 ring-inset transition-all duration-300';
    const activeRingClass = type === 'positive' ? 'ring-green-500' : 'ring-red-500';
    const inactiveRingClass = 'ring-slate-200/50';

    const baseBgClass = 'transition-colors duration-300';
    const activeBgClass = type === 'positive' ? 'bg-green-500/5' : 'bg-red-500/5';
    const inactiveBgClass = 'bg-slate-50/50';

    return (
        <div
            className={`rounded-2xl p-8 cursor-pointer ${baseRingClass} ${isActive ? activeRingClass : inactiveRingClass} ${baseBgClass} ${isActive ? activeBgClass : inactiveBgClass}`}
            onClick={onClick}
        >
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
            <ul className={`mt-6 space-y-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <li key={index} className="flex items-start gap-3">
                            <IconComponent className={`h-6 w-6 mt-[2px] flex-shrink-0 ${item.iconClassName}`} aria-hidden="true" />
                            <span className="text-xl leading-[1.2] text-slate-700">{item.text}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL ---
export const QualificationSection = () => {
    const [activeTab, setActiveTab] = useState<QualificationType>('positive');

    return (
        <section className="w-full bg-white pt-4 pb-16 lg:pb-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        No Trabajo con Todos. Construyo con Estrategas.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
                        Mi sistema exige un socio comprometido. No busco clientes que escuchen, busco líderes que ejecutan.
                    </p>
                </div>

                {/* --- Toggle para Mobile y Layout para Desktop --- */}
                <div className="mx-auto mt-8 max-w-6xl lg:mt-16">
                    {/* Controles del Toggle (solo visible en mobile) */}
                    <div className="mb-8 flex justify-center rounded-full bg-slate-100 p-1 md:hidden">
                        <button
                            onClick={() => setActiveTab('positive')}
                            className={`w-1/2 rounded-full py-2.5 text-center font-semibold transition-colors duration-300 ${activeTab === 'positive' ? 'bg-green-600 text-white' : 'text-slate-600'}`}
                        >
                            Construimos Juntos
                        </button>
                        <button
                            onClick={() => setActiveTab('negative')}
                            className={`w-1/2 rounded-full py-2.5 text-center font-semibold transition-colors duration-300 ${activeTab === 'negative' ? 'bg-red-600 text-white' : 'text-slate-600'}`}
                        >
                            No Compatibles
                        </button>
                    </div>

                    {/* Contenedor de las tarjetas */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Columna POSITIVA - Mobile */}
                        <div className="md:hidden">
                            {activeTab === 'positive' && (
                                <QualificationCard
                                    title="Construimos Juntos si:"
                                    items={positivePoints}
                                    type="positive"
                                    isActive={true}
                                    onClick={() => { }}
                                />
                            )}
                            {/* Columna NEGATIVA - Mobile */}
                            {activeTab === 'negative' && (
                                <QualificationCard
                                    title="No Somos Compatibles si:"
                                    items={negativePoints}
                                    type="negative"
                                    isActive={true}
                                    onClick={() => { }}
                                />
                            )}
                        </div>

                        {/* Layout para Desktop */}
                        <div className="hidden md:block">
                            <QualificationCard
                                title="Construimos Juntos si:"
                                items={positivePoints}
                                type="positive"
                                isActive={activeTab === 'positive'}
                                onClick={() => setActiveTab('positive')}
                            />
                        </div>
                        <div className="hidden md:block">
                            <QualificationCard
                                title="No Somos Compatibles si:"
                                items={negativePoints}
                                type="negative"
                                isActive={activeTab === 'negative'}
                                onClick={() => setActiveTab('negative')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};