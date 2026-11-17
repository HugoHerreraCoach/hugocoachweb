import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { LIBROS_Y_HERRAMIENTAS_INFO } from '@info/lib/info-catalogo.utils';

export default function BooksAndToolsSection(): React.ReactElement {
  return (
    <section
      id="libros"
      aria-labelledby="libros-heading"
      className="info-anchor-section border-t border-white/[0.06] bg-[#090d18] px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#6ba1ff]">
            Formación y guiones de venta
          </p>
          <h2
            id="libros-heading"
            className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl"
          >
            Mis libros y generador de guiones con IA
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
            Si además del software quieres entrenar la habilidad de cierre y liderazgo comercial de tu equipo, empieza aquí.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-5">
          {LIBROS_Y_HERRAMIENTAS_INFO.map((item) => (
            <article
              key={item.id}
              className="info-opaque-card flex flex-col rounded-[24px] p-4 sm:p-5"
            >
              {/* Escenario visual con radio concéntrico rounded-2xl (24px - 8px) */}
              <div
                className={
                  item.imagen.modoEncuadre === 'escena'
                    ? 'relative h-48 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070a12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    : 'flex h-48 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#070a12] p-4'
                }
              >
                {item.imagen.modoEncuadre === 'escena' ? (
                  <Image
                    src={item.imagen.src}
                    alt={item.imagen.alt}
                    width={item.imagen.width}
                    height={item.imagen.height}
                    loading="lazy"
                    sizes="(min-width: 768px) 360px, 92vw"
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <Image
                    src={item.imagen.src}
                    alt={item.imagen.alt}
                    width={item.imagen.width}
                    height={item.imagen.height}
                    loading="lazy"
                    sizes="150px"
                    className="h-full w-auto rounded-md object-contain shadow-xl"
                  />
                )}
              </div>

              <div className="mt-4 flex flex-1 flex-col min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6ba1ff]">
                  {item.etiqueta}
                </p>
                <h3 className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-white">
                  {item.titulo}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                  {item.descripcion}
                </p>

                <p className="mt-4 text-xs font-semibold text-slate-200 tabular-nums">
                  {item.precioEtiqueta}
                </p>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-tap-target info-pressable info-glass-pill mt-3 inline-flex min-h-11 w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6ba1ff]"
                >
                  <span>{item.botonTexto}</span>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
