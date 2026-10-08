// src/components/home/HeroHome.tsx
// Finalidad: en 5 segundos, desde el celular, que se entienda qué hago, se vea una prueba y se agende la llamada.

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { TRAYECTORIA } from '@/lib/evento';
import { LLAMADA_GRATIS_URL } from '@/lib/servicios';

interface Prueba {
    valor: string;
    etiqueta: string;
}

/** Tres pruebas dentro del panel del celular. */
const pruebasMovil: Prueba[] = [
    { valor: TRAYECTORIA.asistentes, etiqueta: 'asistentes a mis eventos' },
    { valor: '120+', etiqueta: 'equipos comerciales' },
    { valor: '4.9', etiqueta: 'en Google, con 180+ reseñas' },
];

/** Cuatro pruebas en fila para pantallas grandes. */
const pruebasEscritorio: Prueba[] = [
    { valor: TRAYECTORIA.asistentes, etiqueta: 'asistentes a mis eventos' },
    { valor: '120+', etiqueta: 'equipos comerciales' },
    { valor: '20,000', etiqueta: 'vendedores capacitados' },
    { valor: '4.9', etiqueta: 'en Google, con 180+ reseñas' },
];

export default function HeroHome() {
    return (
        <section id="inicio" className="bg-black">
            <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-8 lg:px-8 lg:pt-24">
                <div className="lg:pb-20">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">
                        Para empresas y equipos comerciales
                    </p>
                    <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                        Tus ventas no necesitan más esfuerzo. Necesitan un sistema.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg leading-snug text-slate-300 lg:text-2xl">
                        Conferencias, entrenamientos y coaching para que tu equipo cierre más ventas de forma constante. Voy a tu empresa, en cualquier ciudad del Perú.
                    </p>

                    <div className="mt-6 lg:mt-10">
                        <CtaButton href={LLAMADA_GRATIS_URL} className="w-full sm:w-auto">
                            Llamada gratis de 20 min
                        </CtaButton>
                        <p className="mt-3 text-sm text-slate-400">
                            Videollamada gratis con un asesor de mi equipo. Sin compromiso.
                        </p>
                        <Link
                            href="/servicios"
                            className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white"
                        >
                            Ver servicios y precios
                            <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                    </div>

                    <dl className="mt-14 hidden grid-cols-4 gap-6 border-t border-slate-800 pt-8 lg:grid">
                        {pruebasEscritorio.map((prueba) => (
                            <div key={prueba.etiqueta}>
                                <dt className="text-4xl font-extrabold tracking-tight text-white">{prueba.valor}</dt>
                                <dd className="mt-1 text-sm leading-snug text-slate-400">{prueba.etiqueta}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Móvil: panel azul a todo el ancho, pruebas a la izquierda y Hugo a la derecha.
                    Escritorio: Hugo sobre un bloque azul. */}
                <div className="relative -mx-5 mt-8 overflow-hidden bg-[#0a4afc] sm:mx-0 sm:rounded-3xl lg:mt-0 lg:overflow-visible lg:rounded-none lg:bg-transparent">
                    <div className="absolute inset-x-6 bottom-0 top-24 hidden rounded-t-3xl bg-[#0a4afc] lg:block" aria-hidden="true" />
                    <dl className="absolute inset-y-0 left-5 flex flex-col justify-center gap-4 text-white sm:left-8 lg:hidden">
                        {pruebasMovil.map((prueba) => (
                            <div key={prueba.etiqueta}>
                                <dt className="text-3xl font-extrabold leading-none tracking-tight">{prueba.valor}</dt>
                                <dd className="mt-1 max-w-[9.5rem] text-xs leading-tight text-white/85 sm:max-w-none sm:text-sm">{prueba.etiqueta}</dd>
                            </div>
                        ))}
                    </dl>
                    <Image
                        src="/images/hugoHeader.png"
                        alt="Hugo Herrera, entrenador de ventas"
                        width={1000}
                        height={1500}
                        className="relative ml-auto block h-auto w-[170px] sm:w-[240px] lg:mx-auto lg:w-full lg:max-w-[520px]"
                        priority
                        sizes="(min-width: 1024px) 520px, (min-width: 640px) 240px, 170px"
                        quality={75}
                    />
                </div>
            </div>
        </section>
    );
}
