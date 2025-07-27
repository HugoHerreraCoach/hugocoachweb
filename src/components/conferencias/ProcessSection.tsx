// src/components/conferencias/ProcessSection.tsx
'use client'; // Justificación: Requerido para IntersectionObserver y hooks que gestionan la animación y el estado en scroll.

import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, FilePenLine, Presentation, TrendingUp, type LucideProps } from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---
interface Phase {
  phase: number;
  title: string;
  description: string;
  Icon: React.ElementType<LucideProps>;
}

// --- DATOS CENTRALIZADOS ---
const processPhases: Phase[] = [
  { phase: 1, title: 'Diagnóstico Estratégico', Icon: CalendarCheck, description: 'Agendas una sesión, diagnosticamos tu situación y validamos que mi sistema es la solución correcta para tu equipo.' },
  { phase: 2, title: 'Reserva y Alineamiento', Icon: FilePenLine, description: 'Te envío un contrato simple y directo. Con tu aprobación, bloqueamos la fecha y preparamos el plan de intervención.' },
  { phase: 3, title: 'La Instalación del Sistema', Icon: Presentation, description: 'Ejecuto el plan en tu evento. No es una charla, es la instalación de un sistema y la entrega de herramientas a tus vendedores.' },
  { phase: 4, title: 'Medición del Retorno', Icon: TrendingUp, description: 'Activamos el soporte y seguimiento post-evento para asegurar que la implementación se traduzca en un ROI medible.' },
];

// --- Subcomponente para cada escena/fase ---
interface PhaseSceneProps {
  phaseData: Phase;
  isActive: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}

const PhaseScene: React.FC<PhaseSceneProps> = ({ phaseData, isActive, setRef }) => {
  const { phase, title, description, Icon } = phaseData;

  return (
    <div ref={setRef} id={`phase-${phase}`} className="relative py-12 lg:py-16">
      <span className={`absolute top-1/2 right-0 -translate-y-1/2 text-[12rem] lg:text-[16rem] font-black text-white/5 select-none z-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        0{phase}
      </span>
      
      <div className={`relative z-10 w-full max-w-xl transition-all duration-700 ease-out 
          ${isActive ? 'opacity-100 translate-x-0' : 'opacity-50 -translate-x-4'}`}>
        <div className="flex items-center gap-5 mb-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-[#0a4afc]/10 ring-2 ring-[#0a4afc]/30">
                <Icon className="h-8 w-8 text-[#0a4afc]" />
            </div>
            <div>
                <p className="text-lg font-bold text-[#0a4afc]">FASE {phase}</p>
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                    {title}
                </h3>
            </div>
        </div>
        <p className="text-xl text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export const ProcessSection = () => {
  const [activePhase, setActivePhase] = useState<number>(1);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalPhases = processPhases.length;

  useEffect(() => {
    // AJUSTE CLAVE: La lógica del observer ahora es más inteligente para detectar la última fase visible.
    const observer = new IntersectionObserver(
      (entries) => {
        // Filtramos solo las entradas que están actualmente visibles en la pantalla.
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // De todas las fases visibles, encontramos la que está más abajo en la página.
          const lastVisibleEntry = visibleEntries.reduce((last, current) => {
            return current.target.getBoundingClientRect().top > last.target.getBoundingClientRect().top ? current : last;
          });
          
          const phaseIndex = phaseRefs.current.findIndex(ref => ref === lastVisibleEntry.target);
          if (phaseIndex !== -1) {
            setActivePhase(phaseIndex + 1);
          }
        }
      },
      // El umbral se ajusta para que la detección sea más generosa en los bordes.
      { rootMargin: '0px 0px -20% 0px', threshold: 0.1 }
    );

    const currentRefs = phaseRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const progressHeightPercentage = totalPhases > 1 ? ((activePhase - 1) / (totalPhases - 1)) * 100 : 0;

  return (
    <div className="bg-gradient-to-b from-black to-slate-900 bg-fixed pb-12 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="pt-20 pb-8 text-center lg:pt-28">
            <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                Nuestro Plan de Ejecución
            </h2>
            <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-300 text-balance">
                Un proceso de 4 fases visible y conectado, diseñado para construir sistemas que generan resultados.
            </p>
        </div>
        
        <div className="md:grid md:grid-cols-[4rem_1fr] lg:grid-cols-[8rem_1fr] md:gap-8">
          <aside className="hidden md:block sticky top-0 h-screen">
            <div className="relative flex h-full items-center">
              <div className="relative w-max flex justify-center">
                  <div className="relative w-0.5 bg-slate-700" style={{ height: `${(totalPhases - 1) * 12}rem` }}>
                      <div 
                          className="absolute left-0 top-0 w-full bg-[#0a4afc] transition-all duration-500 ease-in-out"
                          style={{ height: `${progressHeightPercentage}%` }}
                      />
                  </div>
                  <div className="absolute top-0 w-full h-full flex flex-col justify-between">
                      {processPhases.map(({ phase }) => (
                          <a key={phase} href={`#phase-${phase}`} 
                            className="block h-4 w-4 rounded-full border-2 bg-slate-900 transition-colors duration-500 -ml-[7px]"
                            style={{ borderColor: activePhase >= phase ? '#0a4afc' : '#475569' }}
                            aria-label={`Ir a la fase ${phase}`}
                          />
                      ))}
                  </div>
              </div>
            </div>
          </aside>
          
          <main>
            <div className="sticky top-0 z-20 py-4 md:hidden bg-slate-900/80 backdrop-blur-sm -mx-6 px-6">
                <div className="relative h-1.5 w-full rounded-full bg-slate-700">
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full bg-[#0a4afc] transition-all duration-300"
                      style={{ width: `${(activePhase / totalPhases) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex flex-col">
              {processPhases.map((phaseData, index) => (
                <PhaseScene
                  key={phaseData.phase}
                  phaseData={phaseData}
                  isActive={activePhase === phaseData.phase}
                  setRef={(el) => (phaseRefs.current[index] = el)}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};