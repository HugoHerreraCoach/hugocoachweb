'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Download,
  SlidersHorizontal,
  Users,
  ShieldCheck,
  BookOpen,
  Tv,
  Building2,
  Code,
  MessageCircle,
  Check,
  Calendar,
  FileText,
  CreditCard,
  Rocket,
} from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/hugoherrera-coach/agendar-videollamada';

interface Props {
  empresa: string;
}

/* ─── Value Stack ─── */
interface ValueItem {
  label: string;
  value: string;
}

const valueStack: ValueItem[] = [
  { label: 'Auditoría de proceso comercial y propuesta de valor', value: '$1,500' },
  { label: 'Bootcamp In-House de 8 horas con tu equipo', value: '$3,000' },
  { label: '4 sesiones de asesoría directiva (2h cada una)', value: '$2,000' },
  { label: '3 meses de calibración mensual con el equipo', value: '$4,500' },
  { label: 'Acceso corporativo a Lobos de Ventas (+350 videos)', value: '$1,500' },
  { label: 'Programa Líder Experto (libro + curso en video)', value: '$500' },
  { label: 'Bono: Diseño de asistente IA para WhatsApp', value: '$2,000' },
];

/* ─── Credentials ─── */
const credentials = [
  { icon: Users, value: '25', label: 'Personas en equipo' },
  { icon: BookOpen, value: '2', label: 'Libros publicados' },
  { icon: Tv, value: '+350', label: 'Lecciones en video' },
  { icon: Building2, value: '+7,000', label: 'Asistentes a eventos' },
  { icon: Code, value: '5', label: 'Software creados' },
];

/* ─── Company logos ─── */
const logos = [
  { name: 'Municipalidad de Cajamarca', path: '/images/empresas/municipalidadCajamarca.png', w: 120 },
  { name: 'Top X', path: '/images/empresas/topXLogo.png', w: 90 },
  { name: 'Century 21', path: '/images/empresas/century21Logo.png', w: 120 },
  { name: 'Inclub', path: '/images/empresas/inclubLogo.png', w: 110 },
  { name: 'Royal Prestige', path: '/images/empresas/royalLogo.png', w: 100 },
  { name: 'Fuxion', path: '/images/empresas/fuxionLogo.png', w: 80 },
];

/* ─── Steps ─── */
const nextSteps = [
  { icon: FileText, label: 'Firma del contrato de servicio' },
  { icon: CreditCard, label: 'Pago del 50% inicial para confirmar fecha' },
  { icon: Calendar, label: 'Coordinación de fechas' },
  { icon: Rocket, label: 'Implementación y seguimiento' },
];

export function DossierClient({ empresa }: Props) {
  const today = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayEmpresa = empresa
    ? decodeURIComponent(empresa).replace(/\+/g, ' ')
    : '';

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        /* Force browsers to print backgrounds and colors */
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          /* Force color printing */
          html {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          /* Hide site nav, footer, download button */
          nav, footer, header, [data-no-print] {
            display: none !important;
          }
          /* Preserve dark background */
          body {
            background: #0a0f1a !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          main {
            background: #0a0f1a !important;
          }
          /* Page breaks */
          .dossier-page-break {
            page-break-before: always;
          }
          .dossier-section {
            page-break-inside: avoid;
          }
          /* Cover full page */
          .dossier-cover {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          /* Ensure images print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
          /* Ensure gradients print */
          [class*="bg-gradient"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* SVG icons */
          svg {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <main className="bg-slate-950 text-white min-h-screen">
        {/* Download button (screen only) */}
        <div data-no-print className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-[#0a4afc] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-[#0a4afc]/30 hover:bg-[#153eb5] transition-colors"
          >
            <Download className="h-4 w-4" />
            Descargar PDF
          </button>
        </div>

        {/* ── SECTION 1: Cover ── */}
        <section className="dossier-section dossier-cover min-h-[85vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-5 py-16 lg:py-24">
          <p className="text-2xl lg:text-3xl font-black tracking-tight text-white mb-8 lg:mb-12">
            HUGO HERRERA
          </p>

          <p className="text-sm font-bold tracking-[0.25em] uppercase text-[#4d8bff] dossier-accent mb-4">
            Propuesta Comercial
          </p>

          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white text-balance max-w-3xl">
            Programa de{' '}
            <span className="bg-gradient-to-r from-[#4d8bff] to-[#0a4afc] bg-clip-text text-transparent dossier-accent">
              Aceleración Comercial
            </span>
          </h1>

          {displayEmpresa && (
            <p className="mt-6 text-xl lg:text-2xl text-slate-300 dossier-muted">
              Preparado exclusivamente para{' '}
              <span className="font-bold text-white">{displayEmpresa}</span>
            </p>
          )}

          <p className="mt-4 text-base text-slate-500 dossier-muted">{today}</p>

          <div className="mt-8 text-xs text-slate-600 dossier-muted tracking-wider uppercase">
            Documento confidencial
          </div>
        </section>

        {/* ── SECTION 2: The Problem ── */}
        <section className="dossier-section dossier-page-break px-5 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent mb-3">
              El Diagnóstico
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-8">
              ¿Tu equipo vende por talento o por sistema?
            </h2>

            <div className="space-y-5">
              {[
                {
                  title: 'El Síndrome de la Niñera',
                  desc: 'Pasas más tiempo apagando fuegos que dirigiendo el crecimiento.',
                },
                {
                  title: 'Leads Quemados',
                  desc: 'Inviertes en marketing, pero los prospectos se enfrían porque tu equipo improvisa.',
                },
                {
                  title: 'La Montaña Rusa',
                  desc: 'Dependes de 1-2 vendedores estrella. Si se van, tu empresa tiembla.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                    <span className="text-red-400 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{item.title}</p>
                    <p className="text-slate-400 dossier-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 px-6 py-4 rounded-xl bg-[#0a4afc]/5 border border-[#0a4afc]/20">
              <p className="text-lg text-slate-300 text-center dossier-muted">
                <span className="font-bold text-white">La solución no es motivar a tu equipo.</span>{' '}
                Es instalar un sistema que funcione con o sin motivación.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: The 3 Phases ── */}
        <section className="dossier-section dossier-page-break px-5 py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent mb-3">
              Metodología
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-10">
              3 Fases de Intervención
            </h2>

            <div className="space-y-6">
              {[
                {
                  icon: SlidersHorizontal,
                  phase: 'Fase 01',
                  title: 'Calibración Directiva',
                  desc: 'Auditoría del proceso comercial, definición de KPIs, optimización de la propuesta de valor y preparación del terreno con los líderes.',
                },
                {
                  icon: Users,
                  phase: 'Fase 02',
                  title: 'Inmersión In-House (8 horas)',
                  desc: 'Bootcamp intensivo con tu equipo de ventas. Estandarizamos guiones, manejo de objeciones y técnicas de cierre con el sistema Lobos de Ventas.',
                },
                {
                  icon: ShieldCheck,
                  phase: 'Fase 03',
                  title: 'Sostenimiento y Blindaje (3 meses)',
                  desc: 'Sesiones de calibración mensual para analizar llamadas reales, corregir desvíos y asegurar que la facturación crezca de forma sostenida.',
                },
              ].map((item) => (
                <div key={item.phase} className="flex gap-5 items-start p-5 lg:p-6 rounded-xl border border-gray-800 bg-slate-900/50">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#0a4afc]/10 border border-[#0a4afc]/20">
                    <item.icon className="h-5 w-5 text-[#4d8bff]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent mb-1">
                      {item.phase}
                    </p>
                    <p className="text-lg font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-slate-400 dossier-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Value Stack + Price ── */}
        <section className="dossier-section dossier-page-break px-5 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent mb-3">
              Inversión
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-8">
              Todo lo que incluye tu programa
            </h2>

            {/* Value table */}
            <div className="rounded-xl border border-gray-800 overflow-hidden dossier-value-table">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900/80">
                    <th className="text-left px-4 lg:px-6 py-3 text-sm font-bold text-slate-400 dossier-muted uppercase tracking-wider">
                      Entregable
                    </th>
                    <th className="text-right px-4 lg:px-6 py-3 text-sm font-bold text-slate-400 dossier-muted uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {valueStack.map((item, i) => (
                    <tr
                      key={item.label}
                      className={i % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-900/10'}
                    >
                      <td className="px-4 lg:px-6 py-3 text-sm lg:text-base text-slate-300 dossier-muted">
                        {item.label}
                      </td>
                      <td className="px-4 lg:px-6 py-3 text-sm lg:text-base text-right text-slate-400 dossier-muted whitespace-nowrap">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price summary */}
            <div className="mt-6 rounded-xl border border-[#0a4afc]/30 bg-gradient-to-br from-slate-900 to-slate-950 p-6 lg:p-8 text-center">
              <p className="text-slate-400 dossier-muted">Valor total si contrataras cada servicio por separado</p>
              <p className="text-3xl lg:text-4xl font-bold text-slate-500 line-through mt-2">$15,000 USD</p>
              <p className="mt-4 text-sm font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent">
                Tu inversión total
              </p>
              <p className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#4d8bff] to-[#0a4afc] bg-clip-text text-transparent dossier-accent mt-1">
                $5,000 USD
              </p>
              <p className="mt-3 text-sm text-slate-500 dossier-muted">
                Incluye viáticos, hospedaje y traslados. Sin costos ocultos.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: Guarantee ── */}
        <section className="dossier-section dossier-page-break px-5 py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0a4afc] to-[#153eb5]">
              <Shield className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
              Garantía de Resultados
            </h2>

            <div className="text-lg lg:text-xl leading-[1.6] text-slate-300 dossier-muted space-y-3 max-w-2xl mx-auto">
              <p>
                Te garantizo un aumento mínimo del{' '}
                <span className="font-bold text-white">20% en tu facturación en 90 días</span>.
              </p>
              <p>
                Si no lo logramos, <span className="font-bold text-white">sigo trabajando gratis</span>{' '}
                con tu equipo hasta lograrlo.
                Si después de 6 meses no hay resultados, te devuelvo el{' '}
                <span className="font-bold text-white">100% de tu inversión + un 20% extra</span>.
              </p>
            </div>

            <p className="mt-6 text-sm text-slate-500 dossier-muted italic">
              *Firmado por contrato. Aplica tras sesión de validación.
            </p>
          </div>
        </section>

        {/* ── SECTION 6: Credentials ── */}
        <section className="dossier-section dossier-page-break px-5 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Photo */}
              <div className="lg:col-span-2">
                <div className="relative mx-auto max-w-[280px] rounded-2xl overflow-hidden border border-gray-800">
                  <Image
                    src="/images/hugoHeader.png"
                    alt="Hugo Herrera"
                    width={400}
                    height={500}
                    className="object-cover object-[40%_30%] aspect-[4/5]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <p className="text-lg font-bold text-white">Hugo Herrera</p>
                    <p className="text-xs text-[#4d8bff] font-semibold tracking-wider uppercase dossier-accent">
                      Arquitecto de Sistemas Comerciales
                    </p>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="lg:col-span-3">
                <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent mb-3">
                  ¿Quién está detrás?
                </p>
                <p className="text-base lg:text-lg leading-[1.6] text-slate-300 dossier-muted">
                  A los 27 años dirijo una empresa de <span className="font-semibold text-white">más de 25 personas</span>, desarrollo{' '}
                  <span className="font-semibold text-white">mis propios CRMs y ERPs</span>,
                  y soy creador de <span className="font-semibold text-white">los eventos educativos de ventas y negocios más grandes de Perú</span>.
                  Enseño lo que aplico todos los días.
                </p>

                {/* Counters */}
                <div className="mt-6 grid grid-cols-3 lg:grid-cols-5 gap-3">
                  {credentials.map((c) => (
                    <div key={c.label} className="text-center p-2 rounded-lg bg-white/5 border border-white/5">
                      <c.icon className="mx-auto h-4 w-4 text-[#4d8bff] mb-1" />
                      <p className="text-lg font-black text-white">{c.value}</p>
                      <p className="text-[10px] text-slate-400 dossier-muted leading-tight">{c.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="text-sm text-slate-400 dossier-muted">
                    ⭐ <span className="font-bold text-white">180+</span> reseñas Google
                  </span>
                  <span className="text-sm text-slate-400 dossier-muted">
                    📱 <span className="font-bold text-white">300k+</span> seguidores
                  </span>
                </div>

                {/* Company logos */}
                <div className="mt-6 flex flex-wrap items-center gap-4 lg:gap-6">
                  {logos.map((logo) => (
                    <Image
                      key={logo.name}
                      src={logo.path}
                      alt={logo.name}
                      width={logo.w}
                      height={40}
                      className="max-h-[35px] w-auto object-contain opacity-50 dossier-logo-img"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: Next Steps ── */}
        <section className="dossier-section dossier-page-break px-5 py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-widest uppercase text-[#4d8bff] dossier-accent mb-3">
              ¿Cómo avanzamos?
            </p>
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-8">
              Próximos Pasos
            </h2>

            <div className="space-y-4">
              {nextSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-slate-900/50">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0a4afc]/10 border border-[#0a4afc]/20 text-[#4d8bff] font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <step.icon className="h-5 w-5 text-[#4d8bff] flex-shrink-0" />
                    <span className="text-base lg:text-lg text-slate-300 dossier-muted">{step.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 text-center" data-no-print>
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 lg:px-8 py-3.5 lg:py-4 text-base lg:text-lg font-bold text-white shadow-lg shadow-[#0a4afc]/25 transition-all duration-500 hover:from-[#153eb5] hover:to-[#0a4afc] hover:scale-105"
              >
                Agendar Sesión de Cierre
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION 8: Terms ── */}
        <section className="dossier-section px-5 py-12 lg:py-16 border-t border-gray-800">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-lg font-bold text-white mb-4">Términos</h3>
            <div className="space-y-2 text-sm text-slate-500 dossier-muted leading-relaxed">
              <p>
                Esta propuesta tiene una vigencia de <span className="text-white font-semibold">7 días calendario</span>{' '}
                a partir de la fecha de emisión.
              </p>
              <p>
                Los precios están expresados en dólares americanos (USD). El pago se realiza
                en dos partes: 50% al firmar el contrato y 50% al completar la Fase 2 (Inmersión In-House).
              </p>
              <p>
                La garantía de resultados aplica exclusivamente a empresas que superen la
                sesión de validación y cumplan con los requisitos acordados.
              </p>
              <p>
                La información contenida en este documento es confidencial y está destinada
                únicamente al uso del destinatario.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">Hugo Herrera</p>
                <p className="text-xs text-slate-500 dossier-muted">
                  Arquitecto de Sistemas Comerciales
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.hugoherreracoach.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#4d8bff] hover:text-white transition-colors dossier-accent"
                >
                  hugoherreracoach.com
                </Link>
                <Link
                  href="https://wa.me/51976163736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#4d8bff] hover:text-white transition-colors dossier-accent"
                >
                  <MessageCircle className="h-3 w-3" />
                  WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
