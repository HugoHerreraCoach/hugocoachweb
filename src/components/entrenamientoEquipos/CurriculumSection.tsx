import { Brain, ClipboardList, DollarSign, Speech } from 'lucide-react';
import type { ElementType } from 'react';
import { AnimatedBackground } from '../ui/AnimatedBackground';

interface CurriculumModule {
  icon: ElementType;
  title: string;
  description: string;
}

const modules: CurriculumModule[] = [
    {
        icon: Brain,
        title: 'Módulo 1: La Mentalidad del Vendedor Experto',
        description: 'Forjamos la disciplina de un profesional que no depende de la motivación, sino de un proceso. Un vendedor que defiende el precio y controla la conversación.'
    },
    {
        icon: ClipboardList,
        title: 'Módulo 2: Arquitectura de la Venta Perfecta',
        description: 'Construimos el guion y el proceso que elimina la improvisación. Usamos IA para mantener a tu equipo a la vanguardia y asegurar resultados predecibles.'
    },
    {
        icon: DollarSign,
        title: 'Módulo 3: El Sistema para Ejecutar el Cierre',
        description: 'Entregamos un arsenal de respuestas probadas para cada objeción y un sistema de seguimiento persistente. Dejamos de esperar el "sí", comenzamos a provocarlo.'
    },
    {
        icon: Speech,
        title: 'Módulo 4: El Tono del Vendedor Experto',
        description: 'Aquí no se entrena para gustar, se entrena para liderar la venta. Entrenamos la comunicación para proyectar autoridad, guiar al cliente y cerrar con confianza.'
    }
];

export function CurriculumSection() {
  return (
    // El <section> se encarga del id para el ancla de navegación.
    // El fondo y el padding se mueven al componente AnimatedBackground.
    <section id="plan-de-estudios" className="w-full scroll-mt-20">
      <AnimatedBackground
        className="w-full bg-slate-900 py-20 text-white lg:pt-28 lg:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              La estructura detrás de un vendedor que sí cierra.
            </h2>
            <p className="mt-4 text-balance text-xl text-slate-200 lg:mt-12 lg:text-2xl">
              Este es el proceso de 8 horas, dividido en cuatro módulos de acción, para instalar un sistema de ventas probado en tu equipo.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16">
            {modules.map((module) => {
              const IconComponent: ElementType = module.icon;
              return (
                <div
                  key={module.title}
                  className="h-full rounded-2xl bg-black/20 p-8 ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20"
                >
                  <div className="flex h-full flex-col items-start">
                    <div className="flex items-center gap-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#0a4afc]">
                        <IconComponent className="h-7 w-7 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold text-white lg:text-2xl">{module.title}</h3>
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-slate-300 lg:text-xl">{module.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedBackground>
    </section>
  );
}