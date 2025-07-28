// app/components/coaching/OfferSection.tsx
'use client';

import { useState, type ForwardRefExoticComponent, type RefAttributes, type ReactNode } from 'react';
import {
    ClipboardPen,
    CalendarClock,
    BookOpen,
    MessageSquareQuote,
    Video,
    ChevronDown,
    type LucideProps
} from 'lucide-react';

// Alias de tipo para mayor claridad y reutilización al definir los iconos de Lucide.
type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

// Interfaz que define la estructura de cada elemento en la oferta de coaching.
// Es explícita y segura, evitando el uso de `any`.
interface OfferItem {
    icon: LucideIcon;
    type: string;
    title: string;
    description: string;
    value: number | 'Incalculable';
    isPrimary: boolean;
}

// Datos centralizados de la oferta, ahora usando referencias a los componentes de icono
// en lugar de instancias JSX para un manejo más limpio y consistente.
const offerItems: OfferItem[] = [
    {
        icon: ClipboardPen,
        type: 'Entregable Principal',
        title: 'Sesión Estratégica 1 a 1 (2h)',
        description: 'Auditamos tu proceso de venta actual y construimos tu nuevo plan de ataque para los próximos 30 días. Tu guion, tu proceso, tu plan de comisiones.',
        value: 200,
        isPrimary: true,
    },
    {
        icon: CalendarClock,
        type: 'Bono #1',
        title: 'Acceso a Talleres Grupales (3 Meses)',
        description: 'Te unes a 6 talleres en vivo vía Zoom (uno cada 15 días) donde entreno, resuelvo dudas y practico con ventas y objeciones reales. Mantén tu filo y aprende junto a otros vendedores.',
        value: 150,
        isPrimary: false,
    },
    {
        icon: BookOpen,
        type: 'Bono #2',
        title: 'Manual Digital "Cerrador Experto"',
        description: 'Tu "playbook" personal. 139 respuestas probadas para que ninguna objeción vuelva a tomarte por sorpresa.',
        value: 25,
        isPrimary: false,
    },
    {
        icon: MessageSquareQuote,
        type: 'Bono #3',
        title: 'Acompañamiento por WhatsApp (7 Días)',
        description: '¿Tienes una venta difícil esta semana? Me escribes, vemos el caso juntos y te doy la estrategia para cerrarlo.',
        value: 90,
        isPrimary: false,
    },
    {
        icon: Video,
        type: 'Bono #4',
        title: 'Grabación Completa de la Sesión',
        description: 'Repasa tu plan y las técnicas cuantas veces quieras. Es tu activo de entrenamiento personal para toda la vida.',
        value: 'Incalculable',
        isPrimary: false,
    },
];

// Componente que renderiza la visualización del valor, manejando los distintos casos.
const ValueDisplay = ({ value, isPrimary }: { value: number | 'Incalculable'; isPrimary: boolean }): ReactNode => {
    if (isPrimary) {
        return <span className="text-slate-900 text-lg lg:text-xl">${value} USD</span>;
    }

    if (typeof value === 'number') {
        return (
            <>
                <span className="line-through text-lg lg:text-xl text-slate-400/80 mr-2">${value} USD</span>
                <span className="text-green-600 font-semibold">INCLUIDO</span>
            </>
        );
    }
    
    return <span className="text-green-600 font-semibold">{value}</span>;
};

export default function OfferSection () {

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full text-slate-900 py-20 sm:py-28 bg-slate-50 overflow-hidden">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        No es una sesión. Es tu arsenal personal para dominar la venta.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-600 text-balance">
                        Esto es todo lo que obtienes al trabajar conmigo. Cada elemento está diseñado para darte una ventaja competitiva inmediata.
                    </p>
                </div>

                {/* El Blueprint Interactivo adaptado a un tema claro */}
                <div className="relative mt-12 lg:mt-20">
                    {/* Eje Central vertical, adaptado al fondo claro */}
                    <div
                        className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-300"
                        aria-hidden="true"
                    />

                    <div className="space-y-6">
                        {offerItems.map((item: OfferItem, index: number) => {
                            const IconComponent = item.icon;
                            const isOpen = openIndex === index;

                            return (
                                <div key={item.title} className="relative">
                                    {/* Contenedor del Nodo y Título (el botón clickeable) */}
                                    <button
                                        onClick={() => handleToggle(index)}
                                        className="flex w-full items-start gap-5 text-left cursor-pointer"
                                        aria-expanded={isOpen}
                                        aria-controls={`offer-content-${index}`}
                                    >
                                        {/* Nodo Unificado (Círculo + Icono) */}
                                        <div className={`relative z-10 mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ring-8 ring-slate-50 transition-colors duration-300 border ${
                                            isOpen ? 'border-blue-500 bg-blue-100' : 'border-slate-300 bg-white'
                                        }`}>
                                            <IconComponent className={`h-6 w-6 transition-colors duration-300 ${isOpen ? 'text-[#0a4afc]' : 'text-slate-500'}`} />
                                        </div>

                                        <div className="flex-grow">
                                            <p className={`font-semibold text-lg transition-colors duration-300 ${isOpen ? 'text-[#0a4afc]' : 'text-slate-500'}`}>
                                                {item.type}
                                            </p>
                                            <h3 className="text-xl font-semibold text-slate-900 lg:text-2xl">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <ChevronDown className={`h-6 w-6 flex-shrink-0 text-slate-400 transition-transform duration-300 mt-1 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Panel de Contenido Desplegable */}
                                    <div
                                        id={`offer-content-${index}`}
                                        className={`grid overflow-hidden pl-[4.25rem] transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="pb-4 border-b border-slate-200">
                                                <p className="text-xl lg:text-2xl leading-[1.4] text-slate-600">
                                                    {item.description}
                                                </p>
                                                <div className="mt-4 text-right text-xl font-bold">
                                                    <span className="text-base lg:text-lg font-medium mr-2 text-slate-500">Valor:</span>
                                                    <ValueDisplay value={item.value} isPrimary={item.isPrimary} />
                                                </div>
                                            </div>
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