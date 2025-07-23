import Link from 'next/link';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex justify-center items-center overflow-hidden py-20 text-white sm:py-28">
      <Image
        src="/images/software/softwareCta.jpg"
        alt="Consultor trabajando en una estrategia digital en su laptop"
        fill
        quality={80}
        className="object-cover object-[82%_50%] sm:object-center"
      />
      
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/70"
        aria-hidden="true"
      />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
          Tu proceso de ventas, hecho software.
        </h2>
        <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-200 text-balance">
          Agenda una sesión estratégica gratuita donde diseñaremos:
        </p>
        
        <ul className="mt-8 inline-block max-w-2xl space-y-4 text-left mx-auto">
          <li className="flex items-start gap-x-4">
            <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
            <span className="text-xl lg:text-2xl leading-[1.4] text-slate-200">
              <span className="font-semibold text-white">El Diagnóstico:</span> El mapa exacto de tu proceso y dónde te está costando dinero.
            </span>
          </li>
          <li className="flex items-start gap-x-4">
            <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
            <span className="text-xl lg:text-2xl leading-[1.4] text-slate-200">
              <span className="font-semibold text-white">La Arquitectura:</span> El diseño de la solución a medida (web o software) que necesitas.
            </span>
          </li>
          <li className="flex items-start gap-x-4">
            <CircleCheck className="h-6 w-6 text-[#0a4afc] mt-1 flex-shrink-0" />
            <span className="text-xl lg:text-2xl leading-[1.4] text-slate-200">
              <span className="font-semibold text-white">El Retorno:</span> La proyección del ROI y el impacto directo en tus ventas.
            </span>
          </li>
        </ul>

        <div className="mt-10 lg:mt-12">
          <Link
            href="https://calendly.com/hugoherrerateam-imtt/30min"
            target="_blank"
            className="rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg lg:text-xl font-semibold leading-[1.2] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
          >
            Agendar Sesión Estratégica
          </Link>
        </div>
      </div>
    </section>
  );
}