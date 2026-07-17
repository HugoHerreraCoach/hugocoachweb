// src/components/gracias/HeroSection.tsx

'use client';

import { CircleCheckBig } from 'lucide-react';
import React from 'react';


const HeroSection = () => {

    return (
        <section className="relative bg-slate-900 text-white overflow-hidden">
            <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-green-900/10 via-slate-900 to-slate-900"
                aria-hidden="true"
            />

            <div className="relative container mx-auto max-w-7xl px-4 py-20 text-center sm:py-24 lg:py-32">

                {/* Ícono de Confirmación Animado y Mejorado */}
                <div className="mb-8 flex justify-center">
                    <div className="relative rounded-full bg-slate-800/50 p-3 shadow-lg border border-green-500/20">
                        {/* Efecto de brillo (glow) para el ícono */}
                        <div className="absolute inset-0 rounded-full bg-green-500/10 blur-xl" aria-hidden="true" />
                        <CircleCheckBig
                            className="relative h-16 w-16 text-green-400 lg:h-20 lg:w-20"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Titular Principal Animado */}
                <h1
                    className="
                        text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-balance 
                        bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
                >
                    Bienvenido al control. Tu acceso está confirmado.
                </h1>

                {/* Subtítulo Animado */}
                <p className="mt-8 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                    Has dado el único paso que importa: pasar de la teoría a la acción. Bienvenido a la venta con estructura.
                </p>

            </div>
        </section>
    );
};

export default HeroSection;