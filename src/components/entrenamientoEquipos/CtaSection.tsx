import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const CALENDLY_URL: string = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

type CtaBenefit = {
  title: string;
  description: string;
};

const benefits: CtaBenefit[] = [
  {
    title: 'El Diagnóstico:',
    description: 'La claridad absoluta sobre las 3 brechas principales que hoy frenan a tu equipo.'
  },
  {
    title: 'El Plan de Acción:',
    description: 'La hoja de ruta exacta, con pasos definidos, para instalar un sistema de ventas en los próximos 30 días.'
  },
  {
    title: 'La Proyección:',
    description: 'Una visión realista del impacto que tendrá este sistema en tu facturación y en tu rol como líder.'
  }
];

export function CtaSection(): React.ReactElement {
  return (
    <section className="relative flex items-center justify-center w-full py-20 min-h-[90vh] text-white sm:py-28">

      {/* Capa 1: Imagen de fondo con efecto parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/equipos/ctaEquipos.jpg')" }}
        aria-hidden="true"
      />

      {/* Capa 2: Superposición de gradiente para legibilidad y estilo */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"
        aria-hidden="true"
      />

      {/* Contenido principal, por encima de las capas de fondo */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
            Tu primer paso hacia un equipo que vende sin ti.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-200 text-balance">
            Agenda una sesión de diagnóstico conmigo. No es una llamada de ventas. Es una sesión de trabajo donde obtendrás:
          </p>

          <ul className="mt-8 inline-block max-w-2xl space-y-4 text-left">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-x-4">
                <CheckCircle2 className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-lg lg:text-xl leading-[1.4] text-slate-200">
                  <span className="font-semibold text-white">{benefit.title} </span>
                  {benefit.description}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
            >
              Agendar Sesión de Diagnóstico
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}