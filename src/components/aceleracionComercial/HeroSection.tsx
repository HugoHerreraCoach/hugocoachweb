'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

const CALENDLY_URL = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

export function HeroSection() {
  return (
    <section className="relative bg-black text-white flex justify-center items-center min-h-[85vh] lg:min-h-[91vh] text-center py-16 md:py-32 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black z-10" />
      
      {/* Background image */}
      <Image
        src="/images/empresas/empresasHeader.jpg"
        alt="Hugo Herrera, arquitecto de sistemas comerciales"
        fill
        className="object-cover opacity-40 object-[48%_50%] md:object-center"
        priority
      />

      <div className="max-w-5xl px-5 relative z-20">
        <AnimatedOpacity>
          {/* Eyebrow */}
          <p className="inline-block mb-4 lg:mb-6 px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-semibold tracking-widest uppercase rounded-full border border-[#0a4afc]/40 text-[#4d8bff] bg-[#0a4afc]/10">
            Solo 4 empresas por mes
          </p>
        </AnimatedOpacity>
        
        <AnimatedOpacity>
          <h1 className="text-3xl font-bold tracking-tight leading-[1.15] text-white lg:text-6xl xl:text-7xl text-balance">
            Deja de depender de &ldquo;vendedores estrella&rdquo;. Instala una{' '}
            <span className="bg-gradient-to-r from-[#4d8bff] to-[#0a4afc] bg-clip-text text-transparent">
              Máquina de Ventas Autónoma.
            </span>
          </h1>
        </AnimatedOpacity>

        <AnimatedOpacity duration="duration-[1500ms]">
          <p className="mt-4 lg:mt-6 text-lg lg:text-2xl leading-[1.4] text-slate-300 text-balance max-w-3xl mx-auto">
            Diseñamos, instalamos y auditamos el sistema comercial de tu empresa para aumentar tu facturación un{' '}
            <span className="font-bold text-white">20% en 90 días</span>. Garantizado por contrato o trabajamos gratis.
          </p>
        </AnimatedOpacity>

        <AnimatedOpacity duration="duration-[2000ms]">
          <div className="mt-8 lg:mt-10">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 lg:px-8 py-3.5 lg:py-4 text-base lg:text-xl font-bold leading-[1.2] text-white shadow-lg shadow-[#0a4afc]/25 transition-all duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc] hover:shadow-[#0a4afc]/40 hover:scale-105"
            >
              Agendar Auditoría de Viabilidad Gratuita
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Quick credential badges */}
          <div className="mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs lg:text-sm text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              📕 Autor de 2 libros
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              🏢 120+ empresas capacitadas
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              🎤 +7,000 asistentes en eventos
            </span>
          </div>
        </AnimatedOpacity>
      </div>
    </section>
  );
}
