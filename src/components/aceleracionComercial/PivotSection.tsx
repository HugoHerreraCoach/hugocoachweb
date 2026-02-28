'use client';

import { Mic, Compass } from 'lucide-react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

export function PivotSection() {
  return (
    <section className="w-full px-5 md:px-20 py-0 bg-[linear-gradient(to_bottom,theme(colors.black)_50%,theme(colors.black)_50%)]">
      <AnimatedOpacity>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl border border-[#0a4afc]/30 bg-slate-900">
          {/* Glow effect */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,74,252,0.12),transparent_80%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-y-5 lg:gap-y-8 p-5 py-10 lg:p-16 lg:py-20 text-center">
            {/* Visual transition: Orador → Arquitecto */}
            <div className="flex items-center gap-6 md:gap-10">
              {/* Orador - tachado */}
              <div className="flex flex-col items-center gap-2 opacity-40">
                <div className="relative flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30">
                  <Mic className="h-5 w-5 lg:h-7 lg:w-7 text-red-400" />
                  {/* X mark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-0.5 bg-red-500 rotate-45 rounded-full" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-red-400/70 line-through">Orador</span>
              </div>

              {/* Arrow */}
              <svg className="w-8 h-8 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>

              {/* Arquitecto - resaltado */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-[#0a4afc]/15 border-2 border-[#0a4afc]/50 shadow-lg shadow-[#0a4afc]/20">
                  <Compass className="h-5 w-5 lg:h-7 lg:w-7 text-[#4d8bff]" />
                </div>
                <span className="text-sm font-bold text-[#4d8bff]">Arquitecto</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white lg:text-5xl text-balance">
              La motivación dura un fin de semana;{' '}
              <span className="text-[#0a4afc]">la estructura dura para siempre.</span>
            </h2>

            <p className="text-base lg:text-2xl leading-[1.5] text-slate-300 text-balance max-w-3xl">
              No soy un orador motivacional. Soy el <span className="font-bold text-white">Arquitecto de tu próximo récord de ventas</span>.
              Dirijo un equipo de 22 personas, desarrollo CRMs propios y organizo los eventos más grandes de Perú.
              Conozco las trincheras. Vengo a construir los planos de tu éxito y a darle las herramientas a tu equipo para ejecutarlo.
            </p>
          </div>
        </div>
      </AnimatedOpacity>
    </section>
  );
}
