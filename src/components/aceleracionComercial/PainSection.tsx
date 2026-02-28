'use client';

import { Flame, Filter, Hourglass } from 'lucide-react';
import type { ElementType } from 'react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

interface PainPoint {
  icon: ElementType;
  label: string;
  title: string;
  description: string;
  gradient: string;
}

const painPoints: PainPoint[] = [
  {
    icon: Flame,
    label: 'Síntoma #1',
    title: 'El Síndrome de la Niñera',
    description:
      'Pasas más tiempo apagando fuegos y resolviendo dudas básicas de tus vendedores que dirigiendo el crecimiento de la empresa.',
    gradient: 'from-orange-500/20 to-red-600/20',
  },
  {
    icon: Filter,
    label: 'Síntoma #2',
    title: 'Leads Quemados',
    description:
      'Inviertes miles en marketing, pero los prospectos se enfrían porque tu equipo improvisa los seguimientos.',
    gradient: 'from-yellow-500/20 to-orange-600/20',
  },
  {
    icon: Hourglass,
    label: 'Síntoma #3',
    title: 'La Montaña Rusa a Fin de Mes',
    description:
      'Dependes del talento de 1 o 2 personas. Si ellos se van o tienen un mal mes, tu empresa tiembla.',
    gradient: 'from-purple-500/20 to-blue-600/20',
  },
];

export function PainSection() {
  return (
    <AnimatedBackground className="w-full bg-black py-16 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <AnimatedOpacity>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-5xl font-bold tracking-tight text-white text-balance">
              ¿Tu empresa sufre de estos{' '}
              <span className="text-[#0a4afc]">3 síntomas</span>?
            </h2>
          </div>
        </AnimatedOpacity>

        <div className="mt-8 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {painPoints.map((point, i) => (
            <AnimatedOpacity key={point.title} duration={`duration-[${1000 + i * 300}ms]`}>
              <div className={`group relative rounded-2xl border border-gray-800 bg-gradient-to-br ${point.gradient} p-5 lg:p-8 transition-all duration-300 hover:border-gray-600 hover:scale-[1.02] h-full`}>
                {/* Neon icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <point.icon className="h-6 w-6 text-[#4d8bff]" />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-gray-500">
                    {point.label}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3">{point.title}</h3>
                <p className="text-base lg:text-lg leading-relaxed text-slate-300">
                  {point.description}
                </p>
              </div>
            </AnimatedOpacity>
          ))}
        </div>

        <AnimatedOpacity>
          <p className="mt-8 lg:mt-12 text-center text-xl lg:text-3xl font-bold text-slate-200 text-balance">
            No necesitas motivarlos. Necesitas{' '}
            <span className="text-[#0a4afc]">sistematizarlos</span>.
          </p>
        </AnimatedOpacity>
      </div>
    </AnimatedBackground>
  );
}
