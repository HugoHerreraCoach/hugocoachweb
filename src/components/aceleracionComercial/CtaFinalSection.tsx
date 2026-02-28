'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

const CALENDLY_URL = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

export function CtaFinalSection() {
  return (
    <section className="relative flex items-center justify-center w-full py-16 min-h-[60vh] lg:min-h-[70vh] text-white sm:py-28 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/empresas/ctaEmpresas.jpg')" }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto max-w-4xl px-5 text-center">
        <AnimatedOpacity>
          <h2 className="text-2xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance">
            Las excusas se acabaron.
          </h2>
          <p className="mt-4 lg:mt-6 text-lg lg:text-2xl leading-[1.4] text-slate-200 text-balance">
            Solo acepto <span className="font-bold text-white">4 empresas por mes</span> para garantizar resultados.
            Si estás leyendo esto, hay una vacante disponible.
          </p>

          {/* Pulsing CTA button */}
          <div className="mt-8 lg:mt-12 relative inline-block">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-lg bg-[#0a4afc] animate-ping opacity-20" />
            
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 lg:gap-3 rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 lg:px-10 py-4 lg:py-5 text-base lg:text-2xl font-bold text-white shadow-2xl shadow-[#0a4afc]/30 transition-all duration-500 hover:from-[#153eb5] hover:to-[#0a4afc] hover:scale-105 hover:shadow-[#0a4afc]/50"
            >
              Agendar mi Auditoría de Viabilidad
              <span className="text-sm lg:text-base font-normal text-blue-200">(30 min)</span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Sin compromiso. Sin presión. Solo estrategia pura.
          </p>
        </AnimatedOpacity>
      </div>
    </section>
  );
}
