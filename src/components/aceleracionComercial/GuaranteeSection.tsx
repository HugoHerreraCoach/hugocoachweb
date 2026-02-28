'use client';

import { Shield, ArrowRight } from 'lucide-react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

export function GuaranteeSection() {
  return (
    <section className="w-full bg-black py-16 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <AnimatedOpacity>
          <div className="relative rounded-2xl lg:rounded-3xl border border-[#0a4afc]/30 bg-gradient-to-br from-slate-900 to-slate-950 p-6 lg:p-14 text-center overflow-hidden">
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,74,252,0.15),transparent_60%)]" aria-hidden="true" />

            <div className="relative z-10">
              {/* Badge/seal */}
              <div className="mx-auto mb-6 lg:mb-8 flex h-20 w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#0a4afc] to-[#153eb5] shadow-xl shadow-[#0a4afc]/30">
                <Shield className="h-10 w-10 lg:h-12 lg:w-12 text-white" />
              </div>

              <h2 className="text-2xl lg:text-5xl font-bold tracking-tight text-white text-balance">
                Garantía de{' '}
                <span className="bg-gradient-to-r from-[#4d8bff] to-[#0a4afc] bg-clip-text text-transparent">
                  Resultados
                </span>
              </h2>

              <div className="mt-6 lg:mt-8 text-lg lg:text-2xl leading-[1.6] text-slate-300 text-balance space-y-4 max-w-3xl mx-auto">
                <p>
                  Te garantizo un aumento mínimo del{' '}
                  <span className="font-bold text-white">20% en tu facturación en 90 días</span>.
                </p>
                <p>
                  Si no lo logramos, <span className="font-bold text-white">sigo trabajando gratis</span>{' '}
                  con tu equipo hasta lograrlo.
                  Si después de 6 meses no hay resultados, te devuelvo el{' '}
                  <span className="font-bold text-white">100% de tu inversión + un 20% extra</span>{' '}
                  de mi bolsillo por tu tiempo.
                </p>
                <p className="text-sm lg:text-base text-slate-500 italic">
                  *Firmado por contrato. Aplica tras nuestra sesión de validación.
                </p>
              </div>

              <div className="mt-6 lg:mt-8 inline-flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-[#0a4afc]/10 border border-[#0a4afc]/30">
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 text-[#4d8bff]" />
                <span className="text-base lg:text-lg font-bold text-[#4d8bff]">
                  Cero riesgos para ti.
                </span>
              </div>
            </div>
          </div>
        </AnimatedOpacity>
      </div>
    </section>
  );
}
