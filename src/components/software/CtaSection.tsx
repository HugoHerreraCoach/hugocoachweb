import Link from 'next/link';
import { CircleCheck } from 'lucide-react';


export default function CtaSection() {
  return (

    <section className="relative w-full py-20 sm:py-28 text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/cta-background.jpg')" }}></div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
          Deja de adivinar. Construye tu plan de crecimiento digital.
        </h2>
        <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-200 text-balance">
          Agenda una Sesión Estratégica gratuita. Mi primer objetivo es entregarte un plan de acción valioso. Si al final de la llamada tiene sentido que yo te ayude a implementarlo, exploramos las opciones.
        </p>
        
        <ul className="mt-8 inline-block max-w-lg space-y-4 text-left mx-auto">
          <li className="flex items-start gap-x-4">
            <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
            <span className="text-lg lg:text-xl leading-[1.4] text-slate-200">
              <span className="font-semibold text-white">Diagnóstico Preciso:</span> Claridad total sobre el cuello de botella #1 que está frenando tus ventas.
            </span>
          </li>
          <li className="flex items-start gap-x-4">
            <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
            <span className="text-lg lg:text-xl leading-[1.4] text-slate-200">
              <span className="font-semibold text-white">Plan de Acción Inmediato:</span> 1-2 estrategias probadas de mi método, listas para que las ejecutes hoy mismo.
            </span>
          </li>
          <li className="flex items-start gap-x-4">
            <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
            <span className="text-lg lg:text-xl leading-[1.4] text-slate-200">
              <span className="font-semibold text-white">Proyección de Resultados:</span> La visión clara del impacto en tu facturación y la recuperación de tu tiempo como líder.
            </span>
          </li>
        </ul>

        <div className="mt-10">
          <Link
            href="https://calendly.com/hugoherrerateam-imtt/30min"
            target="_blank"
            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
          >
            Agendar Sesión Estratégica
          </Link>
          <p className="mt-4 text-base text-slate-400">
            Mi compromiso: Cero presión. 100% estrategia.
          </p>
        </div>
      </div>
    </section>
  );
}