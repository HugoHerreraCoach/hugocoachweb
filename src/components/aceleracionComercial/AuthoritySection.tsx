'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, Tv, Building2, Code } from 'lucide-react';
import type { ElementType } from 'react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

interface Credential {
  icon: ElementType;
  value: string;
  label: string;
}

const credentials: Credential[] = [
  { icon: Users, value: '25', label: 'Personas en mi equipo' },
  { icon: BookOpen, value: '2', label: 'Libros publicados' },
  { icon: Tv, value: '+350', label: 'Lecciones en video' },
  { icon: Building2, value: '+7,000', label: 'Asistentes a eventos' },
  { icon: Code, value: '5', label: 'Empresas con software creado' },
];

export function AuthoritySection() {
  return (
    <section className="w-full bg-slate-950 py-16 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left: Photo */}
          <AnimatedOpacity className="lg:col-span-2">
            <div className="relative mx-auto max-w-[320px] lg:max-w-[380px]">
              <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image
                  src="/images/blog/hugo-perfil-cuadrado.jpg"
                  alt="Hugo Herrera, arquitecto de sistemas comerciales"
                  width={600}
                  height={750}
                  className="object-cover object-[40%_30%] aspect-[4/5]"
                />
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 lg:p-6">
                  <p className="text-xl lg:text-2xl font-bold text-white">Hugo Herrera</p>
                  <p className="text-xs lg:text-sm text-[#4d8bff] font-semibold tracking-wider uppercase">
                    Arquitecto de Sistemas Comerciales
                  </p>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,74,252,0.08),transparent_70%)]" />
            </div>
          </AnimatedOpacity>

          {/* Right: Copy + Credentials */}
          <AnimatedOpacity duration="duration-[1500ms]" className="lg:col-span-3">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] mb-3 lg:mb-4">
                ¿Quién está detrás del sistema?
              </p>
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-white text-balance">
                No soy un teórico. Soy un{' '}
                <span className="text-[#0a4afc]">empresario en las trincheras</span>.
              </h2>

              <p className="mt-4 lg:mt-6 text-base lg:text-xl leading-[1.6] text-slate-300 text-balance">
                A los 27 años dirijo una empresa de <span className="font-semibold text-white">más de 25 personas</span>, desarrollo{' '}
                <span className="font-semibold text-white">mis propios CRMs y ERPs</span>,
                y soy creador de <span className="font-semibold text-white">los eventos educativos de ventas y negocios más grandes de Perú</span>.
                Sé lo que es tener planilla que pagar, metas agresivas que cumplir y
                un equipo que necesita estructura para rendir.
              </p>

              <p className="mt-3 lg:mt-4 text-base lg:text-xl leading-[1.6] text-slate-300 text-balance">
                Enseño lo que aplico todos los días. Cada estrategia que instalo en tu empresa la uso primero en la mía.
              </p>

              {/* Credentials grid */}
              <div className="mt-6 lg:mt-8 grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                {credentials.map((cred) => (
                  <div key={cred.label} className="text-center p-2 lg:p-3 rounded-xl bg-white/5 border border-white/5">
                    <cred.icon className="mx-auto h-4 w-4 lg:h-5 lg:w-5 text-[#4d8bff] mb-1.5 lg:mb-2" />
                    <p className="text-xl lg:text-2xl font-black text-white">{cred.value}</p>
                    <p className="text-[10px] lg:text-xs text-slate-400 mt-0.5 lg:mt-1 leading-tight">{cred.label}</p>
                  </div>
                ))}
              </div>

              {/* Social proof numbers */}
              <div className="mt-4 lg:mt-6 flex flex-wrap items-center gap-3 lg:gap-4">
                <span className="text-sm text-slate-400 flex items-center gap-1.5">
                  ⭐ <span className="font-bold text-white">180+</span> reseñas en Google
                </span>
                <span className="text-sm text-slate-400 flex items-center gap-1.5">
                  📱 <span className="font-bold text-white">300k+</span> seguidores en redes
                </span>
              </div>

              {/* Books mention */}
              <div className="mt-4 lg:mt-6 flex flex-wrap items-center gap-2 lg:gap-3">
                <span className="text-xs lg:text-sm text-slate-500">Autor de:</span>
                <Link
                  href="https://cerradorexperto.hugoherreracoach.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs lg:text-sm font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  📕 Cerrador Experto
                </Link>
                <Link
                  href="https://liderexperto.hugoherreracoach.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs lg:text-sm font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  📘 Líder Experto
                </Link>
              </div>
            </div>
          </AnimatedOpacity>
        </div>
      </div>
    </section>
  );
}
