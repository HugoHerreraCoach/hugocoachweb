import React from 'react';
import Image from 'next/image';
import { BadgeCheck, Sparkles } from 'lucide-react';
import {
  ANCLAS_NAVEGACION_INFO,
  PERFIL_HUGO_INFO,
} from '@info/lib/info-catalogo.utils';

export default function HeroSection(): React.ReactElement {
  return (
    <>
      <header className="relative overflow-hidden border-b border-white/[0.06] bg-[#070a12]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,32,0,0.13),rgba(10,74,252,0.08)_48%,transparent_75%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-5 pb-4 sm:px-6 sm:pt-7 sm:pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Identidad compacta alineada con @hugoherreracoach */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative flex-shrink-0">
                <Image
                  src={PERFIL_HUGO_INFO.avatarSrc}
                  alt={`${PERFIL_HUGO_INFO.nombre} (${PERFIL_HUGO_INFO.handle})`}
                  width={720}
                  height={720}
                  priority
                  sizes="(min-width: 640px) 64px, 56px"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white/15 sm:h-16 sm:w-16"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#070a12] text-[#3897f0]"
                >
                  <BadgeCheck className="h-4 w-4 fill-[#3897f0] text-[#070a12]" />
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <p className="text-lg font-extrabold tracking-[-0.02em] text-white sm:text-xl">
                    {PERFIL_HUGO_INFO.nombre}
                  </p>
                  <span className="text-xs font-medium text-slate-400">
                    {PERFIL_HUGO_INFO.handle}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-slate-300">
                  {PERFIL_HUGO_INFO.rol}
                </p>
              </div>
            </div>

            {/* Pruebas reales con números tabulares */}
            <dl className="grid grid-cols-3 gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 sm:flex sm:items-center sm:gap-5 sm:px-4">
              {PERFIL_HUGO_INFO.metricas.map((metrica) => (
                <div key={metrica.etiqueta} className="min-w-0 text-center sm:text-left">
                  <dt className="text-sm font-extrabold tracking-tight text-white tabular-nums sm:text-base">
                    {metrica.valor}
                  </dt>
                  <dd className="mt-0.5 text-[11px] leading-tight text-slate-400 sm:text-xs">
                    {metrica.etiqueta}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      {/* Navegación rápida accesible para llegar en 1 toque a cualquier bloque */}
      <nav
        aria-label="Secciones principales"
        className="info-sticky-nav sticky top-0 z-30"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-3.5 py-1.5 sm:gap-2 sm:px-6 sm:py-2">
          {ANCLAS_NAVEGACION_INFO.map((ancla) => (
            <a
              key={ancla.id}
              href={`#${ancla.id}`}
              className={
                ancla.destacado
                  ? 'info-tap-target info-pressable inline-flex items-center gap-1 rounded-full border border-[#ff2000]/45 bg-[#ff2000]/15 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-[#ff2000]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2000] sm:gap-1.5 sm:px-3.5 sm:text-sm'
                  : 'info-tap-target info-pressable inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:px-3.5 sm:text-sm'
              }
            >
              {ancla.destacado && (
                <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-[#ff5a3d]" aria-hidden="true" />
              )}
              {ancla.etiqueta}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
