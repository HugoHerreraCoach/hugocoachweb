// src/components/casosDeExito/HeroSection.tsx
// Finalidad: que un gerente vea en 5 segundos que hay pruebas de sobra, y agende la llamada.

import React from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';
import { TRAYECTORIA } from '@/lib/evento';
import { LLAMADA_GRATIS_URL } from '@/lib/servicios';

const pruebas = [
    { valor: '4.9', etiqueta: 'en Google, con más de 180 reseñas' },
    { valor: '120+', etiqueta: 'equipos comerciales' },
    { valor: '20,000', etiqueta: 'vendedores capacitados' },
    { valor: TRAYECTORIA.asistentes, etiqueta: 'asistentes a mis eventos' },
];

const HeroSection: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-black py-20 text-white lg:py-28">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/casosdeexito/casosHeader.jpg"
                    alt=""
                    fill
                    className="object-cover object-[45%_50%] opacity-20 md:object-center"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">Casos de éxito</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl text-balance">
                    Resultados, no promesas.
                </h1>
                <p className="mt-6 max-w-3xl text-xl text-slate-300 md:text-2xl text-balance">
                    Lo que cuentan los equipos que ya trabajaron conmigo y lo que he hecho frente a miles de personas.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <CtaButton href={LLAMADA_GRATIS_URL}>Llamada gratis de 20 min</CtaButton>
                    <CtaButton href="/mi-historia" variant="secondary">Conoce mi historia</CtaButton>
                </div>

                <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-slate-800 pt-8 sm:grid-cols-4">
                    {pruebas.map((prueba) => (
                        <div key={prueba.etiqueta}>
                            <dt className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">{prueba.valor}</dt>
                            <dd className="mt-1 text-sm leading-snug text-slate-400">{prueba.etiqueta}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default HeroSection;
