// app/components/software/DifferentiationSection.tsx

'use client';

import { useState, useMemo, type ReactElement } from 'react';
import { Target, PenTool, CircleGauge, MoveLeft, MoveRight } from 'lucide-react';

interface Pillar {
  id: number;
  icon: ReactElement;
  title: string;
  description: string;
}

const initialPillars: Pillar[] = [
  {
    id: 0,
    icon: <Target className="size-8 lg:size-10 text-white" />,
    title: "Inteligencia Comercial",
    description: "Soy un estratega de ventas que usa la tecnología para escalar, no un programador que opina de negocios. Cada proyecto nace de un objetivo de ventas, no de una plantilla."
  },
  {
    id: 1,
    icon: <PenTool className="size-8 lg:size-10 text-white" />,
    title: "Mensajes que Venden",
    description: "Una web bonita es un gasto. Una web que persuade es un activo. Transformo tus textos en un guion de ventas que califica, rebate y cierra por ti 24/7."
  },
  {
    id: 2,
    icon: <CircleGauge className="size-8 lg:size-10 text-white" />,
    title: "Velocidad que se Traduce en Ventas",
    description: "Cada segundo de carga es un cliente que le regalas a tu competencia. Construyo con tecnología de élite (Next.js) para una velocidad que protege tus ventas y frustra a tus rivales."
  }
];


const cardPositionStyles = [
  // 0: Carta frontal (activa)
  'z-30 scale-100 translate-y-0 opacity-100',
  // 1: Segunda carta
  'z-20 scale-95 -translate-y-6 lg:-translate-y-8 opacity-70',
  // 2: Tercera carta
  'z-10 scale-90 -translate-y-12 lg:-translate-y-16 opacity-40'
];

export default function DifferentiationSection(): ReactElement {
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2]);

  const handleNext = (): void => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      newOrder.push(newOrder.shift()!);
      return newOrder;
    });
  };

  const handlePrev = (): void => {
    setCardOrder((prev) => {
      const newOrder = [...prev];
      newOrder.unshift(newOrder.pop()!);
      return newOrder;
    });
  };
  
  const pillarsById = useMemo(() => 
    initialPillars.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<number, Pillar>), 
  []);

  const getCardStyle = (index: number): string => cardPositionStyles[index] ?? 'z-0 scale-0 opacity-0';

  return (
    <section className="w-full bg-slate-50 py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 text-balance">
            Una agencia entrega una herramienta. Yo instalo un sistema.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
            Cualquiera puede construir una web. Pocos pueden construir una máquina de ventas.
          </p>
        </div>

        {/* El contenedor ahora es más alto en pantallas grandes para dar espacio */}
        <div className="mt-16 relative h-[420px] md:h-[440px] lg:h-[480px]">
          {cardOrder.map((pillarId, index) => {
             const pillar = pillarsById[pillarId];
             if (!pillar) return null;

             return (
              <div
                key={pillar.id}
                // Las clases de tamaño y ancho máximo ahora son responsivas
                className={`group absolute inset-0 w-[90%] max-w-sm lg:max-w-lg mx-auto rounded-2xl bg-slate-900 p-8 lg:p-10 text-white shadow-2xl ring-1 ring-white/10 transition-all duration-500 ease-in-out ${getCardStyle(index)}`}
              >
                {/* El tamaño del contenedor del ícono también crece */}
                <div className="flex size-12 lg:size-16 items-center justify-center rounded-lg bg-[#0a4afc] shadow-lg shadow-[#0a4afc]/40">
                  {pillar.icon}
                </div>
                {/* Los tamaños de fuente son ahora responsivos */}
                <h3 className="mt-6 text-2xl lg:text-3xl font-bold">{pillar.title}</h3>
                <p className="mt-4 text-xl lg:text-2xl leading-[1.4] text-slate-300">{pillar.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-4">
          <button 
            onClick={handlePrev} 
            aria-label="Pilar anterior"
            className="group rounded-full p-3 bg-white shadow-md hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <MoveLeft className="size-6 text-slate-700 group-hover:text-black"/>
          </button>
          <div className="flex items-center gap-2">
            {initialPillars.map((p) => (
              <div 
                key={p.id} 
                className={`h-2 rounded-full transition-all duration-500 ${cardOrder[0] === p.id ? 'w-6 bg-[#0a4afc]' : 'w-2 bg-slate-300'}`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext} 
            aria-label="Siguiente pilar"
            className="group rounded-full p-3 bg-white shadow-md hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <MoveRight className="size-6 text-slate-700 group-hover:text-black"/>
          </button>
        </div>
      </div>
    </section>
  );
}