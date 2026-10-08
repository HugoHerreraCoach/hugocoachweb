// src/app/servicios/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BarraLlamadaMovil from '@/components/home/BarraLlamadaMovil';
import { CtaButton } from '@/components/ui/CtaButton';
import { IconoPng } from '@/components/ui/IconoPng';
import { FaqServicios } from '@/components/servicios/FaqServicios';
import { GuiaServicios } from '@/components/servicios/GuiaServicios';
import { IncluidoEnTodos } from '@/components/servicios/IncluidoEnTodos';
import { LlamadaGratisCta } from '@/components/servicios/LlamadaGratisCta';
import { MasDeHugo } from '@/components/servicios/MasDeHugo';
import { ServicioCard } from '@/components/servicios/ServicioCard';
import { VendedoresBand } from '@/components/servicios/VendedoresBand';
import { LLAMADA_GRATIS_URL, serviciosEmpresas } from '@/lib/servicios';

export const metadata: Metadata = {
    title: 'Servicios para empresas | Hugo Herrera',
    description:
        'Sesión estratégica, taller full day, coaching para equipos, conferencia y Aceleración Comercial. Todo incluido en el Perú. Elige cómo trabajamos con tu equipo de ventas.',
};

/** Señales de confianza bajo el botón del hero. */
const confianza = [
    { icono: '/images/home/iconos/meta-viaje.png', texto: 'Todo incluido en el Perú' },
    { icono: '/images/home/iconos/meta-garantia.png', texto: 'Garantía +10% en el programa' },
    { icono: '/images/home/iconos/meta-calendario.png', texto: 'Llamada gratis de 20 min' },
];

const programa = serviciosEmpresas.find((s) => s.id === 'aceleracion-comercial')!;
const formatos = serviciosEmpresas.filter((s) => s.id !== 'aceleracion-comercial');

export default function ServiciosPage() {
    return (
        <>
            <section id="inicio" className="w-full bg-black pb-14 pt-10 lg:pb-24 lg:pt-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#4d8bff] sm:text-sm">
                            Servicios para empresas
                        </p>
                        <h1 className="mt-3 max-w-4xl text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                            Elige cómo trabajamos con tu equipo de ventas.
                        </h1>
                        <p className="mt-4 max-w-3xl text-lg leading-snug text-slate-300 lg:text-2xl">
                            Desde una asesoría virtual de 2 horas hasta un sistema completo en tu empresa. Precios claros, sin letra chica.
                        </p>

                        <div className="mt-6 lg:mt-10">
                            <CtaButton href={LLAMADA_GRATIS_URL} className="w-full sm:w-auto">
                                Llamada gratis de 20 min
                            </CtaButton>
                            <Link
                                href="#opciones"
                                className="mt-2 flex min-h-[44px] items-center gap-1.5 text-base font-semibold text-[#4d8bff] transition-colors hover:text-white"
                            >
                                Ver las 5 opciones
                                <ArrowRight size={16} className="rotate-90" aria-hidden="true" />
                            </Link>
                        </div>

                        <ul className="mt-6 space-y-3 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:space-y-0 lg:mt-10">
                            {confianza.map((punto) => (
                                <li key={punto.texto} className="flex items-center gap-3 text-base text-slate-200">
                                    <IconoPng src={punto.icono} tamano="xs" />
                                    {punto.texto}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:mt-0 lg:block">
                        <Image
                            src="/images/casosdeexito/dabconPeru.jpg"
                            alt="Hugo Herrera dictando un taller de ventas profesionales a un equipo comercial"
                            fill
                            sizes="(min-width: 1280px) 500px, 40vw"
                            className="object-cover object-[35%_40%]"
                        />
                    </div>
                </div>
            </section>

            <GuiaServicios />

            <section id="opciones" className="w-full scroll-mt-20 bg-black py-14 lg:py-24">
                <div className="mx-auto max-w-7xl space-y-8 px-5 sm:px-6 lg:px-8">
                    <ServicioCard
                        servicio={programa}
                        layout="wide"
                        badge="Programa completo"
                        plegable
                        imagen={{
                            src: '/images/casosdeexito/unialfaInmobiliaria.jpg',
                            alt: 'Hugo Herrera entrenando a un equipo comercial en su empresa',
                        }}
                        verMasHref={programa.detalleHref}
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {formatos.map((formato) => (
                            <ServicioCard key={formato.id} servicio={formato} plegable />
                        ))}
                    </div>
                </div>
            </section>

            <IncluidoEnTodos />
            <VendedoresBand />
            <FaqServicios />
            <MasDeHugo />
            <LlamadaGratisCta />
            <BarraLlamadaMovil />
        </>
    );
}
