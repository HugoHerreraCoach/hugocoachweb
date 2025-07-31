// src/components/casosDeExito/CtaSection.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CtaSection: React.FC = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex justify-center items-center py-20 sm:py-28 text-white overflow-hidden">
            {/* 1. Fondo inmersivo para crear un clímax visual */}
            <Image
                src="/images/casos-de-exito/cta-background.jpg" // Reemplaza con una imagen tuya en un escenario o con un cliente.
                alt="Hugo Herrera listo para construir tu próximo caso de éxito"
                fill
                className="object-cover object-center z-0"
                quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" aria-hidden="true"></div>

            {/* 2. Contenido centrado y directo */}
            <div className="relative z-10 container mx-auto max-w-4xl px-6 text-center">
                <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
                    Suficientes pruebas. Es hora de tus propios resultados.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl leading-[1.5] text-slate-200 text-balance">
                    Has visto la evidencia. Has visto el sistema funcionando para individuos, para líderes y a escala masiva. La pregunta ya no es si el método funciona, sino cuándo vas a empezar a construir el tuyo.
                </p>

                {/* 3. El Botón de Cierre: claro, único y enfocado en la identidad */}
                <div className="mt-10">
                    <Link
                        href="https://calendly.com/hugoherrera-coach/agendar-videollamada" // Reemplaza con tu enlace de Calendly
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-8 py-4 text-xl font-semibold leading-[1.2] text-white shadow-lg shadow-blue-500/20 transition-all duration-300 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc] hover:scale-105"
                    >
                        Construir Mi Propio Caso de Éxito
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;