// src/components/servicios/ServicioCard.tsx
// Tarjeta de un servicio para empresas. Se usa en /servicios y en la página de conferencias.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ShieldCheck } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { IconoPng } from '@/components/ui/IconoPng';
import { Precio } from '@/components/ui/Precio';
import type { ServicioEmpresa } from '@/lib/servicios';

const ICONO_BONO = '/images/home/iconos/meta-regalo.png';

interface ServicioCardProps {
    servicio: ServicioEmpresa;
    /** 'wide' pone el precio a la izquierda y las inclusiones a la derecha (para el programa estrella). */
    layout?: 'card' | 'wide';
    badge?: string;
    /** En móvil, "Qué incluye" va en un desplegable; desde md se ve siempre. */
    plegable?: boolean;
    /** Foto real sobre el encabezado (solo en el layout 'wide'). */
    imagen?: { src: string; alt: string };
    /** Enlace a la página con el detalle completo del servicio. */
    verMasHref?: string;
}

export function ServicioCard({
    servicio,
    layout = 'card',
    badge,
    plegable = false,
    imagen,
    verMasHref,
}: ServicioCardProps) {
    const { id, nombre, para, monto, unidad, incluye, nota, bono, garantia, escasez, cta, ctaHref, destacado, icono } = servicio;
    const isWide = layout === 'wide';

    const encabezado = (
        <div>
            <div className="flex items-center gap-4">
                {icono && <IconoPng src={icono} tamano="lg" />}
                <h3 className="text-2xl font-semibold leading-tight text-white">{nombre}</h3>
            </div>
            <p className="mt-3 text-slate-400">{para}</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <Precio monto={monto} className="text-4xl font-bold tracking-tight text-white sm:text-5xl" />
                <span className="text-base font-semibold text-[#4d8bff] sm:text-lg">{unidad}</span>
            </p>
        </div>
    );

    const lista = (
        <ul className="space-y-3 text-left">
            {incluye.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-slate-200">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-[#4d8bff]" aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );

    const bonoNodo = bono && (
        <p className="mt-5 flex items-center gap-3 rounded-lg border border-[#0a4afc]/40 bg-[#0a4afc]/10 p-4 text-base text-slate-100">
            <IconoPng src={ICONO_BONO} tamano="xs" />
            <span>
                <span className="font-semibold">Bono: </span>
                {bono}
            </span>
        </p>
    );

    const garantiaNodo = garantia && (
        <p className="mt-5 flex items-start gap-3 rounded-lg border border-slate-700 bg-black/30 p-4 text-base text-slate-200">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#4d8bff]" aria-hidden="true" />
            <span>{garantia}</span>
        </p>
    );

    const notaNodo = nota && <p className="mt-5 flex-grow text-base text-slate-400">{nota}</p>;
    const escasezNodo = escasez && <p className="mt-3 text-base font-semibold text-white">{escasez}</p>;

    const detalle = plegable ? (
        <div className="flex flex-col">
            <details className="group md:hidden">
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between rounded-lg border border-slate-700 px-4 text-base font-semibold text-[#4d8bff] marker:hidden [&::-webkit-details-marker]:hidden">
                    Qué incluye
                    <ChevronDown className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-5">
                    {lista}
                    {bonoNodo}
                    {notaNodo}
                </div>
            </details>
            <div className="hidden md:block">
                {lista}
                {bonoNodo}
                {notaNodo}
            </div>
            {garantiaNodo}
            {escasezNodo}
        </div>
    ) : (
        <div className="flex flex-col">
            {lista}
            {bonoNodo}
            {garantiaNodo}
            {notaNodo}
            {escasezNodo}
        </div>
    );

    return (
        <article
            id={id}
            className={`relative scroll-mt-24 rounded-2xl border p-6 sm:p-8 ${
                destacado ? 'border-[#0a4afc] bg-slate-900' : 'border-slate-800 bg-slate-900/50'
            } ${isWide ? 'lg:p-10' : 'flex flex-col'}`}
        >
            {badge && (
                <span className="absolute -top-3 left-6 z-10 rounded-full bg-[#0a4afc] px-3 py-1 text-sm font-semibold text-white sm:left-8">
                    {badge}
                </span>
            )}

            {isWide ? (
                <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-14">
                    <div className="flex flex-col justify-between gap-8">
                        <div>
                            {imagen && (
                                <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl lg:aspect-[4/3]">
                                    <Image
                                        src={imagen.src}
                                        alt={imagen.alt}
                                        fill
                                        sizes="(min-width: 1280px) 440px, (min-width: 1024px) 36vw, 90vw"
                                        className="object-cover object-[50%_25%]"
                                    />
                                </div>
                            )}
                            {encabezado}
                        </div>
                        <div>
                            <CtaButton href={ctaHref} className="w-full lg:w-auto">
                                {cta}
                            </CtaButton>
                            {verMasHref && (
                                <Link
                                    href={verMasHref}
                                    className="mt-2 flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white"
                                >
                                    Ver el programa completo
                                    <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            )}
                        </div>
                    </div>
                    {detalle}
                </div>
            ) : (
                <>
                    {encabezado}
                    <div className="mt-6 flex flex-grow flex-col">{detalle}</div>
                    <CtaButton href={ctaHref} className="mt-6 w-full">
                        {cta}
                    </CtaButton>
                </>
            )}
        </article>
    );
}
