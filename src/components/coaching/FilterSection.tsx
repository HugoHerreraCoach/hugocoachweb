// src/components/coaching/FilterSection.tsx
'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, type LucideProps } from 'lucide-react';

// --- TIPOS Y DATOS ESTRUCTURADOS ---

type FilterType = 'ideal' | 'nonIdeal';

interface FilterItem {
    icon: React.ElementType<LucideProps>;
    text: string;
    iconClassName: string;
}

// Datos estructurados para mantener la consistencia y escalabilidad
const idealPoints: FilterItem[] = [
    { icon: CheckCircle2, text: 'Estás decidido a ser el #1 de tu equipo.', iconClassName: 'text-green-400' },
    { icon: CheckCircle2, text: 'Tratas tus comisiones como un negocio que debe escalar.', iconClassName: 'text-green-400' },
    { icon: CheckCircle2, text: 'Estás listo para dejar de improvisar y seguir un sistema.', iconClassName: 'text-green-400' },
    { icon: CheckCircle2, text: 'Inviertes en tus habilidades para multiplicar tus ingresos.', iconClassName: 'text-green-400' },
];

const nonIdealPoints: FilterItem[] = [
    { icon: XCircle, text: 'Buscas "motivación" en lugar de un plan de acción.', iconClassName: 'text-red-400' },
    { icon: XCircle, text: 'Culpas a la economía o al cliente por no cerrar.', iconClassName: 'text-red-400' },
    { icon: XCircle, text: 'Crees que ya lo sabes todo sobre ventas.', iconClassName: 'text-red-400' },
    { icon: XCircle, text: 'No estás comprometido a hacer el trabajo que se requiere para duplicar tus ingresos.', iconClassName: 'text-red-400' },
];


// --- COMPONENTE DE TARJETA REUTILIZABLE ---

interface FilterCardProps {
    title: string;
    items: FilterItem[];
    type: FilterType;
    isActive: boolean;
    onClick: () => void;
}

const FilterCard: React.FC<FilterCardProps> = ({ title, items, type, isActive, onClick }) => {
    // Clases dinámicas para los estilos basados en el estado
    const baseRingClass = 'ring-1 ring-inset transition-all duration-300';
    const activeRingClass = type === 'ideal' ? 'ring-green-400' : 'ring-red-400';
    const inactiveRingClass = 'ring-slate-700 hover:ring-slate-500';

    const baseBgClass = 'transition-colors duration-300';
    const activeBgClass = type === 'ideal' ? 'bg-green-500/10' : 'bg-red-500/10';
    const inactiveBgClass = 'bg-slate-800/30';

    return (
        <div
            className={`rounded-2xl p-8 cursor-pointer h-full ${baseRingClass} ${isActive ? activeRingClass : inactiveRingClass} ${baseBgClass} ${isActive ? activeBgClass : inactiveBgClass}`}
            onClick={onClick}
        >
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <ul className={`mt-6 space-y-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {items.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <li key={index} className="flex items-start gap-3">
                            <IconComponent className={`h-6 w-6 mt-1 flex-shrink-0 ${item.iconClassName}`} aria-hidden="true" />
                            <span className="text-xl leading-snug text-slate-300">{item.text}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE LA SECCIÓN ---

export default function FilterSection() {
    const [activeTab, setActiveTab] = useState<FilterType>('ideal');

    return (
        <section className="flex justify-center items-center bg-gradient-to-b from-black to-slate-900 bg-fixed text-white py-20 lg:py-28">
            <div className="mx-auto max-w-6xl px-4">
                {/* Encabezado */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-5xl text-balance">
                        Mi tiempo es valioso. El tuyo también. No lo malgastemos
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.5] text-slate-400 text-balance max-w-4xl mx-auto">
                        No acepto a todo el mundo. Busco vendedores con hambre de resultados, no aficionados que buscan trucos mágicos.
                    </p>
                </div>

                {/* Contenedor Interactivo */}
                <div className="mx-auto mt-10 max-w-7xl">
                    {/* Controles del Toggle para Móvil */}
                    <div className="mb-8 flex justify-center rounded-full bg-slate-800 p-1 md:hidden">
                        <button
                            onClick={() => setActiveTab('ideal')}
                            className={`w-1/2 rounded-full py-2.5 text-center font-semibold transition-colors duration-300 ${activeTab === 'ideal' ? 'bg-green-600 text-white' : 'text-slate-300'}`}
                        >
                            Para Ti
                        </button>
                        <button
                            onClick={() => setActiveTab('nonIdeal')}
                            className={`w-1/2 rounded-full py-2.5 text-center font-semibold transition-colors duration-300 ${activeTab === 'nonIdeal' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
                        >
                            No Para Ti
                        </button>
                    </div>

                    {/* Contenedor de las Tarjetas */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Vista Móvil (Renderizado Condicional) */}
                        <div className="md:hidden">
                            {activeTab === 'ideal' && (
                                <FilterCard
                                    title="Esto es para ti si:"
                                    items={idealPoints}
                                    type="ideal"
                                    isActive={true}
                                    onClick={() => { }} // No se necesita acción en móvil
                                />
                            )}
                            {activeTab === 'nonIdeal' && (
                                <FilterCard
                                    title="Esto NO es para ti si:"
                                    items={nonIdealPoints}
                                    type="nonIdeal"
                                    isActive={true}
                                    onClick={() => { }} // No se necesita acción en móvil
                                />
                            )}
                        </div>

                        {/* Vista Escritorio (Siempre visibles, estado visual cambia) */}
                        <div className="hidden md:block">
                            <FilterCard
                                title="Esto es para ti si:"
                                items={idealPoints}
                                type="ideal"
                                isActive={activeTab === 'ideal'}
                                onClick={() => setActiveTab('ideal')}
                            />
                        </div>
                        <div className="hidden md:block">
                            <FilterCard
                                title="Esto NO es para ti si:"
                                items={nonIdealPoints}
                                type="nonIdeal"
                                isActive={activeTab === 'nonIdeal'}
                                onClick={() => setActiveTab('nonIdeal')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};