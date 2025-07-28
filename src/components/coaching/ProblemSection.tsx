// app/components/coaching/ProblemSection.tsx
'use client';

import { useState, memo, type ElementType, type FC, type Key } from 'react';
import {
    AreaChart,
    Users,
    Paperclip,
    XCircle,
    ChevronDown,
    type LucideProps,
} from 'lucide-react';

// INTERFACE: Define la forma de los datos para cada "problema".
interface ProblemData {
    id: string;
    icon: ElementType<LucideProps>;
    title: string;
    description: string;
}

// INTERFACE: Define las props para el componente de item individual.
interface InteractiveProblemProps extends ProblemData {
    isActive: boolean;
    onToggle: () => void;
}

// DATOS: El contenido se mantiene, pero la estructura del componente lo usará de otra manera.
const problems: ProblemData[] = [
    {
        id: 'problem-1',
        icon: AreaChart,
        title: 'Comisiones Montaña Rusa',
        description:
            'Un mes celebras, el siguiente te preocupas. Vives en una incertidumbre que te impide planificar porque tus ingresos dependen de la suerte, no de un método predecible.',
    },
    {
        id: 'problem-2',
        icon: Users,
        title: 'El Cliente Dirige la Venta',
        description:
            'Empiezas con confianza, pero terminas reaccionando a lo que el cliente impone. En lugar de liderar hacia el cierre, te conviertes en un simple informador.',
    },
    {
        id: 'problem-3',
        icon: Paperclip,
        title: 'Sales a Vender Sin un Plan',
        description:
            'Cada llamada es una improvisación. Gastas el doble de energía porque no tienes un guion de ataque probado que puedas replicar para cerrar más y más rápido.',
    },
    {
        id: 'problem-4',
        icon: XCircle,
        title: 'Pánico a las Objeciones',
        description:
            "Cuando escuchas 'lo voy a pensar' o 'es muy caro', sientes cómo la venta se te escapa. No tienes el arsenal de respuestas para rebatir con autoridad y tomar el control.",
    },
];

// COMPONENTE MEMOIZADO: Renderiza un único item del acordeón, replicando el estilo de `PainSection`.
const InteractiveProblemItem: FC<InteractiveProblemProps> = memo(
    function InteractiveProblemItem({
        icon: Icon,
        title,
        description,
        isActive,
        onToggle,
    }) {
        return (
            <div
                className="group border-b-2 border-slate-200 transition-colors duration-300 group-data-[active=true]:border-blue-700"
                data-active={isActive}
            >
                <button
                    onClick={onToggle}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left cursor-pointer"
                    aria-expanded={isActive}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 scale-100 transition-all duration-300 group-hover:bg-blue-600/10 group-hover:scale-110 group-data-[active=true]:bg-blue-700/15 group-data-[active=true]:scale-110">
                            <Icon className="h-6 w-6 text-slate-500 transition-colors duration-300 group-hover:text-blue-600 group-data-[active=true]:text-blue-700" />
                        </div>
                        <h3 className="flex-1 text-xl lg:text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-700 group-data-[active=true]:text-blue-700">
                            {title}
                        </h3>
                    </div>
                    <ChevronDown className="h-6 w-6 flex-shrink-0 text-slate-400 transition-transform duration-300 ease-in-out group-hover:text-blue-700 group-data-[active=true]:rotate-180 group-data-[active=true]:text-blue-700" />
                </button>

                <div
                    className="grid transition-[grid-template-rows] duration-500 ease-in-out"
                    style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                >
                    <div className="overflow-hidden">
                        <p className="pb-6 pl-16 text-lg lg:text-xl text-balance leading-[1.5] text-slate-600">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);

// COMPONENTE PRINCIPAL: Ahora con el layout y lógica replicados.
export default function ProblemSection() {
    const [activeId, setActiveId] = useState<string>(problems[0].id);
    const ActiveIcon = problems.find((p) => p.id === activeId)?.icon;

    const handleToggle = (id: string): void => {
        setActiveId(id);
    };

    return (
        <section className="w-full bg-slate-50 py-20 lg:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        Si reconoces estas fugas de energía, tu sistema está roto.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
                        El problema no es tu esfuerzo. Es la falta de un proceso que transforme ese esfuerzo en resultados.
                    </p>
                </div>

                <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-x-16 lg:mt-20 lg:grid-cols-2">
                    <div className="hidden lg:flex items-center justify-center">
                        <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-white shadow-2xl">
                            <div className="absolute inset-0 rounded-full bg-blue-600/10 animate-pulse"></div>
                            <div
                                key={activeId as Key}
                                className="transition-all duration-300 ease-in-out animate-in fade-in zoom-in-50"
                            >
                                {ActiveIcon && (
                                    <ActiveIcon className="h-40 w-40 text-blue-700" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {problems.map((problem) => (
                            <InteractiveProblemItem
                                key={problem.id}
                                {...problem}
                                isActive={activeId === problem.id}
                                onToggle={(): void => handleToggle(problem.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}