// src/components/home/ServiciosHome.tsx
// Aceleración Comercial primero (lo que más se quiere vender) y debajo las otras formas de empezar.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { IconoPng } from '@/components/ui/IconoPng';
import { Precio } from '@/components/ui/Precio';
import { serviciosEmpresas } from '@/lib/servicios';

const programa = serviciosEmpresas.find((servicio) => servicio.estrella);
const otros = serviciosEmpresas.filter((servicio) => !servicio.estrella);

const puntosPrograma: string[] = [
    '5 días con tus jefes de ventas y tus vendedores',
    'Garantía: +10% en la facturación de tu equipo comercial o te devolvemos tu inversión',
    'Todo incluido en el Perú',
];

export default function ServiciosHome() {
    if (!programa) return null;

    return (
        <section id="servicios" className="scroll-mt-20 bg-slate-950 py-14 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">Servicios para empresas</p>
                <h2 className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Elige cómo trabajamos con tu equipo.
                </h2>

                <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-12">
                    {/* Programa principal */}
                    <article className="relative rounded-2xl border border-[#0a4afc] bg-slate-900 p-6 lg:p-8">
                        <span className="absolute -top-3 left-6 z-10 rounded-full bg-[#0a4afc] px-3 py-1 text-sm font-semibold text-white">
                            Programa completo
                        </span>
                        <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden rounded-t-2xl lg:-mx-8 lg:-mt-8">
                            <Image
                                src="/images/casosdeexito/unialfaInmobiliaria.jpg"
                                alt="Hugo Herrera entrenando a un equipo comercial en su empresa"
                                fill
                                className="object-cover object-[50%_30%]"
                                sizes="(min-width: 1024px) 45vw, 100vw"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            {programa.icono && <IconoPng src={programa.icono} tamano="md" />}
                            <h3 className="text-2xl font-bold text-white">{programa.nombre}</h3>
                        </div>
                        <p className="mt-2 text-lg leading-snug text-slate-300">
                            5 días en tu empresa y 3 meses de seguimiento, para que todo tu equipo venda con el mismo método.
                        </p>
                        <p className="mt-5">
                            <Precio monto={programa.monto} className="text-4xl font-bold tracking-tight text-white" />
                        </p>
                        <ul className="mt-5 space-y-3">
                            {puntosPrograma.map((punto) => (
                                <li key={punto} className="flex items-start gap-3 text-base text-slate-200">
                                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#4d8bff]" aria-hidden="true" />
                                    <span>{punto}</span>
                                </li>
                            ))}
                        </ul>
                        {programa.escasez && <p className="mt-4 text-sm font-semibold text-white">{programa.escasez}</p>}
                        <CtaButton href={programa.detalleHref} className="mt-6 w-full">
                            Ver el programa
                        </CtaButton>
                    </article>

                    {/* Otras formas de empezar */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Otras formas de empezar</h3>
                        <ul className="mt-3 divide-y divide-slate-800 border-y border-slate-800">
                            {otros.map((servicio) => (
                                <li key={servicio.id}>
                                    <Link
                                        href={servicio.detalleHref}
                                        className="group flex min-h-[72px] items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02]"
                                    >
                                        <span className="flex items-center gap-3">
                                            {servicio.icono && <IconoPng src={servicio.icono} tamano="sm" />}
                                            <span>
                                                <span className="block text-base font-semibold leading-tight text-white sm:text-lg">{servicio.nombre}</span>
                                                <span className="mt-0.5 block text-sm leading-snug text-slate-400">{servicio.corto}</span>
                                            </span>
                                        </span>
                                        <span className="flex flex-shrink-0 items-center gap-3">
                                            <Precio monto={servicio.monto} className="text-lg font-bold text-white sm:text-xl" />
                                            <ArrowRight className="hidden h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#4d8bff] sm:block" aria-hidden="true" />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/servicios"
                            className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white"
                        >
                            Comparar las 5 opciones
                            <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
