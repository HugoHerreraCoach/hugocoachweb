// src/components/landing/HeroSection.tsx

import React from 'react';
import YoutubePlayer from '@cerradorexperto/components/ui/YoutubePlayer';

export default function HeroSection() {
    const videoId = 'IeRtz6m8Oks';

    return (
        <section
            id="hero"
            className="relative min-h-screen mx-auto bg-black text-white flex items-center overflow-x-hidden"
        >
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="bg-primary-blue/20 rounded-full w-[50rem] h-[50rem] blur-3xl opacity-30" />
            </div>

            <div className="relative max-w-[1700px] mx-auto z-10 w-full px-4">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_1.6fr] gap-x-12 gap-y-6 lg:gap-y-0 items-center lg:items-center text-center lg:text-left">
                    
                    {/* Elemento 1: Título */}
                    <h1 className="lg:col-start-1 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Deja de Vender. Empieza a Cerrar.
                    </h1>

                    {/* Elemento 2: Párrafo */}
                    <p className="lg:col-start-1 text-xl md:text-2xl text-slate-300 max-w-xl mx-auto lg:mx-0 text-balance leading-relaxed">
                        La estructura exacta que te falta para transformar el &quot;lo voy a pensar&quot; en una
                        <strong className="text-accent-green"> venta cerrada</strong>.
                        139 estrategias probadas para manejar objeciones y tomar el control de la venta.
                    </p>

                    {/* ✅ VIDEO AJUSTADO: Se centra en su columna con flexbox */}
                    <div className="w-full max-w-lg mx-auto lg:max-w-none lg:col-start-2 lg:row-start-1 lg:row-span-3 flex items-center">
                        <YoutubePlayer
                            videoId={videoId}
                            className="w-full rounded-xl border-2 border-slate-700/80 shadow-2xl shadow-primary-blue/10"
                        />
                    </div>

                    {/* Elemento 4: Botón */}
                    <div className="lg:col-start-1">
                        <a
                            href="#checkout"
                            className="inline-flex items-center text-xl justify-center gap-2 rounded-lg bg-gradient-to-b from-primary-blue to-secondary-blue px-6 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            TOMAR EL CONTROL POR $7
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}