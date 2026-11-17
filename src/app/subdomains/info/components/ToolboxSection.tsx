import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { RECURSOS_GRATUITOS_INFO } from '@info/lib/info-catalogo.utils';

export default function ToolboxSection(): React.ReactElement {
  return (
    <section
      id="recursos"
      aria-labelledby="recursos-heading"
      className="info-anchor-section border-t border-white/[0.06] bg-[#070a12] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
            Descarga inmediata · $0
          </p>
          <h2
            id="recursos-heading"
            className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl"
          >
            Recursos gratuitos para tu equipo
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
            Plantillas y mapas prácticos listos para aplicar hoy mismo en tus llamadas y seguimientos.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {RECURSOS_GRATUITOS_INFO.map((recurso) => (
            <div key={recurso.id} className="info-recurso-slot">
              <article className="info-opaque-card rounded-[22px] p-4 transition-colors duration-200 hover:border-white/20">
                <div className="info-recurso-card-inner flex flex-col gap-4">
                  <div className="flex h-28 w-full items-center justify-center rounded-xl border border-white/[0.06] bg-[#0a0f1c] p-2.5">
                    <Image
                      src={recurso.src}
                      alt={recurso.titulo}
                      width={recurso.width}
                      height={recurso.height}
                      loading="lazy"
                      quality={60}
                      sizes="96px"
                      className="h-full w-auto object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold tracking-[-0.01em] text-white sm:text-lg">
                      {recurso.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {recurso.descripcion}
                    </p>
                    <a
                      href={recurso.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-tap-target info-pressable mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-white/14 bg-white/[0.05] px-3.5 py-2 text-sm font-semibold text-white hover:border-white/28 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>{recurso.botonTexto}</span>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
