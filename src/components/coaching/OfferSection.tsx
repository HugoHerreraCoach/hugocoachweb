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
interface OfferItem {
    icon: LucideIcon;
    type: string;
    title: string;
    description: ReactNode;
    value: number | 'Incalculable';
    isPrimary: boolean;
}

// Datos centralizados de la oferta, ahora usando referencias a los componentes de icono
const offerItems: OfferItem[] = [
    {
        icon: ClipboardPen,
        type: 'Programa Principal',
        title: 'Sistema de Comisiones Aceleradas',
        description: (
            <>
                <span className="mb-4">
                    Es un sprint de implementación 1 a 1 de 4 semanas donde instalamos tu sistema pieza por pieza:
                </span>
                <ul className="list-none pt-4 space-y-2">
                    <li><strong>Fase 1: La Arquitectura de un Ingreso Predecible.</strong> Diseñamos tu máquina personal de hacer dinero y el mapa de tu nuevo proceso de ventas.</li>
                    <li><strong>Fase 2: El Arsenal de Cierre Inquebrantable.</strong> Forjamos tus guiones y te armamos con respuestas para pulverizar cualquier objeción.</li>
                    <li><strong>Fase 3: Dominio de la Influencia y la Autoridad.</strong> Aprendes a proyectar una autoridad que magnetiza y te posiciona como el experto.</li>
                    <li><strong>Fase 4: La Máquina de Seguimiento y Multiplicación.</strong> Construimos un sistema que convierte un &quot;no ahora&quot; en un &quot;sí después&quot; y multiplica tus clientes.</li>
                </ul>
            </>
        ),
        value: 1600,
        isPrimary: true,
    },
    {
        icon: CalendarClock,
        type: 'Bono #1',
        title: 'Acceso a Talleres Grupales (3 Meses)',
        description: 'Te unes a 6 sesiones quincenales en vivo para mantener el filo. Entrenamos con casos reales, resolvemos objeciones y garantizamos que el sistema se ejecute.',
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
        title: 'Coach de Bolsillo por WhatsApp (4 Semanas)',
        description: 'Durante todo el sprint de 4 semanas, soy tu coach en tu bolsillo. ¿Tienes una venta difícil? Me escribes, analizamos el caso y te doy la estrategia para cerrarla.',
        value: 400,
        isPrimary: false,
    },
    {
        icon: Video,
        type: 'Bono #4',
        title: 'Grabaciones Completas del Entrenamiento',
        description: 'Cada una de nuestras 4 sesiones de implementación, grabada para que las repases de por vida. Es tu activo de entrenamiento personal.',
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

export default function OfferSection() {

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleToggle = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full text-slate-900 py-20 lg:py-28 bg-slate-50 overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        No compras una sesión. Inviertes en tu arsenal de cierre.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-600 text-balance">
                        Te entrego cada componente de mi sistema, diseñado para darte una ventaja competitiva inmediata. Esto es lo que vamos a construir juntos:
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
                                        <div className={`relative z-10 mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ring-8 ring-slate-50 transition-colors duration-300 border ${isOpen ? 'border-blue-500 bg-blue-100' : 'border-slate-300 bg-white'
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