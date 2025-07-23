import { ClipboardList, Code, Rocket,  } from 'lucide-react';


export default function MethodologySection() {
  const phases = [
    {
      icon: <ClipboardList className="h-8 w-8 text-[#0a4afc]" />,
      phase: "Fase 1",
      title: "Arquitectura y Estrategia",
      description: "No escribimos una línea de código sin un plano. Analizamos tu operación, definimos los indicadores de éxito y diseñamos la estrategia. Tu rol es validar la dirección; el mío, construir el sistema para llegar allí."
    },
    {
      icon: <Code className="h-8 w-8 text-[#0a4afc]" />,
      phase: "Fase 2",
      title: "Construcción de Alto Performance",
      description: "Aquí es donde la estrategia se convierte en tu activo. Construimos tu motor de ventas con tecnología de élite, enfocados en la velocidad de carga y la conversión. Cada elemento se diseña para una sola cosa: provocar una acción."
    },
    {
      icon: <Rocket className="h-8 w-8 text-[#0a4afc]" />,
      phase: "Fase 3",
      title: "Activación y Entrega de Control",
      description: "Un sistema solo funciona si tu equipo lo domina. Implementamos la herramienta, te entregamos un plan de activación para generar resultados inmediatos y entrenamos a tu gente. El objetivo es tu total autonomía y control."
    }
  ];

  return (
    <section id="proceso" className="w-full bg-black py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
            Mi Método de 3 Fases para Construir tu Sistema de Ventas.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-300 text-balance">
            No dejamos nada al azar. Hay un proceso probado para garantizar resultados.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((phase) => (
            <div key={phase.title} className="rounded-2xl bg-slate-900/50 p-8 ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20 hover:bg-slate-900">
              <div className="flex items-center gap-4">
                {phase.icon}
                <span className="text-sm font-bold tracking-widest uppercase text-slate-400">{phase.phase}</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">{phase.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
