import React from 'react';
import { ArrowUpRight, Building2 } from 'lucide-react';
import {
  CONEXIGO_SHOWCASE_INFO,
  EMPRESAS_CTA_INFO,
} from '@info/lib/info-catalogo.utils';

export default function CtaSection(): React.ReactElement {
  return (
    <>
      <section
        id="empresas"
        aria-labelledby="empresas-heading"
        className="info-anchor-section border-t border-white/[0.06] bg-[#090d18] px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="info-opaque-card rounded-[26px] p-5 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#6ba1ff]">
                <Building2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{EMPRESAS_CTA_INFO.etiqueta}</span>
              </div>
              <h2
                id="empresas-heading"
                className="mt-2.5 text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-3xl"
              >
                {EMPRESAS_CTA_INFO.titulo}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base">
                {EMPRESAS_CTA_INFO.descripcion}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center lg:mt-0 lg:flex-col lg:items-end lg:flex-shrink-0">
              <a
                href={EMPRESAS_CTA_INFO.ctaPrimarioHref}
                target="_blank"
                rel="noopener noreferrer"
                className="info-tap-target info-pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0a4afc] pl-6 pr-5 py-3 text-sm font-bold text-white hover:bg-[#0b3ccf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6ba1ff] sm:text-base"
              >
                <span>{EMPRESAS_CTA_INFO.ctaPrimarioTexto}</span>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              </a>
              <p className="text-center text-xs text-slate-400 lg:text-right">
                {EMPRESAS_CTA_INFO.notaAsesor}
              </p>
              <a
                href={EMPRESAS_CTA_INFO.ctaSecundarioHref}
                target="_blank"
                rel="noopener noreferrer"
                className="info-tap-target inline-flex min-h-11 items-center justify-center gap-1 text-sm font-semibold text-[#6ba1ff] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6ba1ff] lg:justify-end"
              >
                <span>{EMPRESAS_CTA_INFO.ctaSecundarioTexto}</span>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] bg-[#070a12] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Hugo Herrera · Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONEXIGO_SHOWCASE_INFO.ctaFooterHref}
              target="_blank"
              rel="noopener noreferrer"
              className="info-tap-target inline-flex items-center font-semibold text-slate-300 hover:text-white"
            >
              ConexiGO CRM
            </a>
            <a
              href="https://hugoherreracoach.com"
              target="_blank"
              rel="noopener noreferrer"
              className="info-tap-target inline-flex items-center hover:text-white"
            >
              hugoherreracoach.com
            </a>
            <a
              href="https://hugoherreracoach.com/politica-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="info-tap-target inline-flex items-center hover:text-white"
            >
              Privacidad
            </a>
            <a
              href="https://hugoherreracoach.com/terminos-de-servicio"
              target="_blank"
              rel="noopener noreferrer"
              className="info-tap-target inline-flex items-center hover:text-white"
            >
              Términos
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
