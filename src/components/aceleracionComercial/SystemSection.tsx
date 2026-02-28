'use client';

import { SlidersHorizontal, Users, ShieldCheck } from 'lucide-react';
import type { ElementType } from 'react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';
import Link from 'next/link';

const CALENDLY_URL = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

interface Phase {
  number: string;
  icon: ElementType;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const phases: Phase[] = [
  {
    number: '01',
    icon: SlidersHorizontal,
    title: 'Calibración Directiva',
    subtitle: 'Consultoría',
    description:
      'Me siento contigo o tu líder de ventas. Auditamos el proceso, definimos KPIs, optimizamos la tecnología y preparamos el terreno.',
    highlights: ['Auditoría de proceso', 'Definición de KPIs', 'Prototipo IA para WhatsApp'],
  },
  {
    number: '02',
    icon: Users,
    title: 'Inmersión In-House',
    subtitle: 'Bootcamp de 8h',
    description:
      'Entro a la trinchera con tus vendedores. Inyectamos el ADN "Lobos de Ventas". Estandarizamos guiones, manejo de objeciones y técnicas de cierre agresivo.',
    highlights: ['Guiones estandarizados', 'Manejo de objeciones', 'Técnicas de cierre'],
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Sostenimiento y Blindaje',
    subtitle: 'Seguimiento continuo',
    description:
      'Sesiones estratégicas semanales/mensuales para analizar llamadas reales, corregir desvíos y asegurar que la aguja de la facturación se mueva.',
    highlights: ['Análisis de llamadas', 'Corrección de desvíos', 'KPI tracking'],
  },
];

export function SystemSection() {
  return (
    <section className="w-full bg-black py-16 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <AnimatedOpacity>
          <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-20">
            <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] mb-4">
              El sistema
            </p>
            <h2 className="text-2xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              La Intervención de{' '}
              <span className="text-[#0a4afc]">Aceleración Comercial</span>
            </h2>
          </div>
        </AnimatedOpacity>

        {/* Timeline vertical on mobile, horizontal cards on desktop */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0a4afc]/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {phases.map((phase, i) => (
              <AnimatedOpacity key={phase.number} duration={`duration-[${1000 + i * 400}ms]`}>
                <div className="group relative rounded-2xl border border-gray-800 bg-slate-900/80 backdrop-blur-sm p-5 lg:p-8 transition-all duration-500 hover:border-[#0a4afc]/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-[#0a4afc]/5 h-full flex flex-col">
                  {/* Phase number badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a4afc]/10 border border-[#0a4afc]/20 group-hover:bg-[#0a4afc]/20 transition-colors">
                      <phase.icon className="h-6 w-6 text-[#4d8bff]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff]">
                        Fase {phase.number}
                      </p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        {phase.subtitle}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">{phase.title}</h3>
                  <p className="text-base lg:text-lg leading-relaxed text-slate-300 mb-4 lg:mb-6 flex-grow">
                    {phase.description}
                  </p>

                  {/* Highlight chips */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                    {phase.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#0a4afc]/10 text-[#4d8bff] border border-[#0a4afc]/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedOpacity>
            ))}
          </div>
        </div>

        {/* Mid-page CTA */}
        <AnimatedOpacity>
          <div className="mt-14 text-center">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 lg:px-8 py-3.5 lg:py-4 text-base lg:text-lg font-bold text-white shadow-lg shadow-[#0a4afc]/25 transition-all duration-500 hover:from-[#153eb5] hover:to-[#0a4afc] hover:scale-105"
            >
              Agendar Auditoría de Viabilidad
            </Link>
          </div>
        </AnimatedOpacity>
      </div>
    </section>
  );
}
