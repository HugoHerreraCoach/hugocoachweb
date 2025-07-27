'use client';

import { useState, type ElementType, type FC, type Key, memo } from 'react';
import { TrendingDown, Users, MessagesSquare, ChevronDown, type LucideProps } from 'lucide-react';

interface PainPointData {
  id: string;
  icon: ElementType<LucideProps>;
  title: string;
  description: string;
}

interface InteractivePainPointProps extends PainPointData {
  isActive: boolean;
  onToggle: () => void;
}

const painPoints: PainPointData[] = [
  {
    id: 'pain-1',
    icon: TrendingDown,
    title: 'El subidón del viernes es la caída del lunes.',
    description: 'La euforia dura 48 horas. El lunes, tu equipo vuelve a operar con los mismos hábitos de siempre. No necesitan un impulso de ánimo, necesitan un motor de ventas.',
  },
  {
    id: 'pain-2',
    icon: Users,
    title: 'Dependes del talento, no del proceso.',
    description: 'Si solo tus "vendedores estrella" aplican lo aprendido, no estás construyendo un activo. Estás apostando a individualidades. Un sistema funciona para todos.',
  },
  {
    id: 'pain-3',
    icon: MessagesSquare,
    title: 'Tu equipo opera sin un guion.',
    description: 'Después de la charla, cada vendedor vuelve a trabajar con su propio método. No hay un proceso unificado. No hay nada que medir ni escalar.',
  },
];

const InteractivePainPoint: FC<InteractivePainPointProps> = memo(function InteractivePainPoint({
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
});


export default function PainSection() {
  const [activeId, setActiveId] = useState<string>(painPoints[0].id);
  const ActiveIcon = painPoints.find(p => p.id === activeId)?.icon;
  const handleToggle = (id: string): void => {
    setActiveId(id);
  };

  return (
    <section className="w-full bg-slate-50 py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            El efecto aspirina de las charlas motivacionales
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
            La inyección de ánimo alivia el síntoma un día, pero no cura el problema real: la falta de un sistema. Estos son los indicadores de que tu inversión se evapora.
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
                {ActiveIcon && <ActiveIcon className="h-40 w-40 text-blue-700" />}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {painPoints.map((pain) => (
              <InteractivePainPoint
                key={pain.id}
                {...pain}
                isActive={activeId === pain.id}
                onToggle={(): void => handleToggle(pain.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}