// app/components/entrenamientoEquipos/ProblemSection.tsx

'use client'; 

import { useState } from 'react';
import { 
  LineChart, Crown, GitFork, MessageCircleX, 
  BatteryCharging, ClipboardList, ChevronDown 
} from 'lucide-react';
import type { ElementType } from 'react';

// La interfaz y los datos no cambian
interface PainPoint {
  icon: ElementType;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  { 
    icon: LineChart, 
    title: 'Ventas Montaña Rusa', 
    description: 'Picos de ventas seguidos de caídas alarmantes. Esta inconsistencia te impide pronosticar, invertir y crecer con tranquilidad.' 
  },
  { 
    icon: Crown, 
    title: 'Dependencia de "Héroes"', 
    description: 'Tu facturación depende de uno o dos vendedores estrella. Si fallan o se van, tu negocio se paraliza. Es una vulnerabilidad que no te puedes permitir.' 
  },
  { 
    icon: GitFork, 
    title: 'Cada Vendedor es una Isla', 
    description: 'Cada vendedor usa su propio método. Así es imposible medir qué funciona, replicar el éxito y escalar la operación.' 
  },
  { 
    icon: MessageCircleX, 
    title: 'Cierres Perdidos por Objeciones', 
    description: 'Pierdes ventas por objeciones simples como "es muy caro". Cada cierre fallido por falta de un guion es dinero que le regalas a tu competencia.' 
  },
  { 
    icon: BatteryCharging, 
    title: 'Onboarding Lento y Desgastante', 
    description: 'Capacitar a un nuevo vendedor es un proceso largo y repetitivo que drena tu tiempo y energía como líder.' 
  },
  { 
    icon: ClipboardList, 
    title: 'Eres Supervisor, no Estratega', 
    description: 'Tu día se va en microgestión en lugar de diseñar el futuro del negocio. Estás atrapado en la operación.' 
  },
];

export function ProblemSection() {
  // MEJORA CRO: El primer elemento (índice 0) está abierto por defecto.
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activePoint = painPoints[activeIndex];

  return (
    <section className="w-full bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-full px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            Deja de culpar al talento. El problema es tu sistema de ventas.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
            Sin un proceso claro, estás operando a ciegas. Estos son los síntomas que frenan tu crecimiento y te impiden escalar.
          </p>
        </div>
        
        <div className="mx-auto mt-8 lg:mt-16 max-w-7xl">
          {/* VISTA MÓVIL: ACORDEÓN MEJORADO */}
          <div className="space-y-4 lg:hidden">
            {painPoints.map((point, index) => (
              <div key={point.title} className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  {/* CAMBIO CLAVE: Iconos reincorporados en móvil */}
                  <point.icon className="h-7 w-7 flex-shrink-0 text-[#0a4afc]" />
                  <span className="flex-grow text-lg font-semibold text-slate-800">{point.title}</span>
                  <ChevronDown 
                    className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-4 pb-4 pl-16">
                    <p className="text-lg leading-[1.4] text-slate-600">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* VISTA DE ESCRITORIO: LISTA STICKY (Sin cambios, ya era óptima) */}
          <div className="hidden lg:grid lg:grid-cols-3 max-w-full lg:gap-16 lg:place-items-center">
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-2">
                {painPoints.map((point, index) => (
                  <button
                    key={point.title}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                      activeIndex === index
                        ? 'bg-white scale-105 shadow-lg'
                        : 'bg-transparent text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <point.icon className={`h-6 w-6 flex-shrink-0 transition-colors ${activeIndex === index ? 'text-[#0a4afc]' : 'text-slate-500'}`} />
                      <span className={`font-semibold text-lg transition-colors ${activeIndex === index ? 'text-slate-900' : ''}`}>{point.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-8 shadow-xl min-h-[250px] flex flex-col justify-center">
                {activePoint && (
                  <div>
                    <div className="flex items-center gap-x-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a4afc]/15">
                        <activePoint.icon className="h-7 w-7 text-[#0a4afc]" aria-hidden="true" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 text-balance">
                        {activePoint.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-2xl leading-relaxed text-slate-700e">
                      {activePoint.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}