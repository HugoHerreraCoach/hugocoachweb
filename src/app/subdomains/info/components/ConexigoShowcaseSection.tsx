import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CONEXIGO_SHOWCASE_INFO } from '@info/lib/info-catalogo.utils';

function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ConexigoShowcaseSection(): React.ReactElement {
  return (
    <section
      id="conexigo"
      aria-labelledby="conexigo-heading"
      className="info-anchor-section relative overflow-hidden px-4 pt-5 pb-12 sm:px-6 sm:pt-8 sm:pb-16"
    >
      {/* Capa 1: Sustrato ambiental para que el cristal Liquid Glass refracte luz real */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 left-1/2 -z-10 h-[28rem] w-[min(92vw,68rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,32,0,0.18),rgba(10,74,252,0.12)_52%,transparent_76%)] blur-2xl"
      />

      <div className="mx-auto max-w-6xl">
        {/* Cabina exterior rounded-[28px] con padding p-3.5/p-6 -> hijos internos rounded-2xl (concéntricos) */}
        <div className="info-conexigo-cockpit rounded-[28px] p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-8">
            {/* Columna de decisión comercial (7 cols en desktop, primero en móvil para dejar el CTA arriba del pliegue) */}
            <div className="min-w-0 lg:col-span-7">
              {/* Marca oficial ConexiGO + Etiqueta */}
              <div className="flex flex-wrap items-center gap-3">
                <Image
                  src={CONEXIGO_SHOWCASE_INFO.activosVisuales.wordmark.src}
                  alt={CONEXIGO_SHOWCASE_INFO.activosVisuales.wordmark.alt}
                  width={CONEXIGO_SHOWCASE_INFO.activosVisuales.wordmark.width}
                  height={CONEXIGO_SHOWCASE_INFO.activosVisuales.wordmark.height}
                  loading="eager"
                  sizes="112px"
                  className="h-7 w-auto sm:h-8"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff2000]/35 bg-[#ff2000]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#ff8570]">
                  {CONEXIGO_SHOWCASE_INFO.insignia}
                </span>
              </div>

              <h1
                id="conexigo-heading"
                className="mt-3.5 text-[1.65rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-white sm:mt-4 sm:text-4xl lg:text-[2.65rem]"
              >
                {CONEXIGO_SHOWCASE_INFO.titulo}
              </h1>

              <p className="mt-3 max-w-[58ch] text-[0.95rem] leading-relaxed text-slate-300 sm:mt-3.5 sm:text-lg">
                {CONEXIGO_SHOWCASE_INFO.subtitulo}
              </p>

              {/* Par de acciones limpio: 1 único botón primario #ff2000 + 1 secundario de cristal a WhatsApp */}
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <a
                  href={CONEXIGO_SHOWCASE_INFO.ctaPrimarioHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-tap-target info-pressable inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff2000] pl-6 pr-5 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-10px_rgba(255,32,0,0.65),inset_0_1px_0_rgba(255,255,255,0.28)] hover:bg-[#e01b00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111d] sm:w-auto"
                >
                  <span>{CONEXIGO_SHOWCASE_INFO.ctaPrimarioTexto}</span>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0" strokeWidth={2.4} aria-hidden="true" />
                </a>

                <a
                  href={CONEXIGO_SHOWCASE_INFO.ctaWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-tap-target info-pressable info-glass-pill inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-base font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0 text-[#4ade80]" />
                  <span>{CONEXIGO_SHOWCASE_INFO.ctaWhatsappTexto}</span>
                </a>
              </div>

              <p className="mt-3 text-xs font-medium text-slate-400 tabular-nums sm:text-sm">
                {CONEXIGO_SHOWCASE_INFO.notaPrecio}
              </p>

              {/* 3 Beneficios escaneables sobre superficies opacas nítidas (contraste > 7:1) */}
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {CONEXIGO_SHOWCASE_INFO.puntosClave.map((punto) => (
                  <li
                    key={punto.titulo}
                    className="info-opaque-card rounded-2xl p-3.5"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ff4d33]"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-snug text-white">
                          {punto.titulo}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300">
                          {punto.detalle}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Escenario visual del producto real (5 cols en desktop, vista compacta concéntrica en móvil) */}
            <div className="min-w-0 lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#131b2e] to-[#0a0f1c] px-4 pt-5 pb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:px-6 sm:pt-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 right-0 h-44 w-44 rounded-full bg-[#ff2000]/20 blur-2xl"
                />

                {/* Par de pantallas reales de ConexiGO y Migo IA */}
                <div className="relative mx-auto flex max-w-[340px] items-end justify-center gap-3 sm:max-w-[380px]">
                  <div className="w-[46%] -rotate-2 overflow-hidden rounded-[20px] border border-white/15 bg-white shadow-2xl">
                    <Image
                      src={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewBandeja.src}
                      alt={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewBandeja.alt}
                      width={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewBandeja.width}
                      height={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewBandeja.height}
                      sizes="(min-width: 1024px) 180px, 42vw"
                      className="block h-auto w-full"
                    />
                  </div>

                  <div className="z-10 w-[54%] translate-y-1 overflow-hidden rounded-[22px] border border-white/25 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)]">
                    <Image
                      src={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewMigo.src}
                      alt={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewMigo.alt}
                      width={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewMigo.width}
                      height={CONEXIGO_SHOWCASE_INFO.activosVisuales.previewMigo.height}
                      priority
                      sizes="(min-width: 1024px) 220px, 48vw"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>

                {/* Cápsula inferior con avatar real de Migo IA */}
                <div className="relative z-20 mt-4 flex items-center gap-3 rounded-xl border border-white/12 bg-[#0b101d]/92 px-3.5 py-2.5 backdrop-blur-md">
                  <Image
                    src={CONEXIGO_SHOWCASE_INFO.activosVisuales.migoAvatar.src}
                    alt={CONEXIGO_SHOWCASE_INFO.activosVisuales.migoAvatar.alt}
                    width={CONEXIGO_SHOWCASE_INFO.activosVisuales.migoAvatar.width}
                    height={CONEXIGO_SHOWCASE_INFO.activosVisuales.migoAvatar.height}
                    sizes="32px"
                    className="h-8 w-auto flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white sm:text-sm">
                      {CONEXIGO_SHOWCASE_INFO.capsulaMigo.titulo}
                    </p>
                    <p className="text-[11px] leading-snug text-slate-300 sm:text-xs">
                      {CONEXIGO_SHOWCASE_INFO.capsulaMigo.subtitulo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
