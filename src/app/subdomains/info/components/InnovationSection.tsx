// src/components/InnovationSection.tsx

import React from 'react';
import Image from 'next/image';

const InnovationSection = () => {
    return (
        <section className="bg-slate-950 py-16 sm:py-20">
            <div className="container mx-auto px-4">
                {/* NUEVO: Contenedor "Glassmorphism".
                  - bg-slate-800/20: Fondo oscuro semi-transparente.
                  - backdrop-blur-lg: El efecto de desenfoque del fondo.
                  - border border-slate-700: Un borde sutil que define la tarjeta.
                */}
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/20 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-lg">
                    
                    {/* CAMBIO: Logo ahora sobre un fondo claro para máxima visibilidad */}
                    <div className="mb-8 inline-block rounded-2xl bg-white/90 p-4">
                        <Image
                            src="/subdomains/info/images/totalscript.png"
                            alt="Logo de TotalScript"
                            width={299}
                            height={52}
                            className="h-auto w-full max-w-[200px] sm:max-w-[280px]"
                            loading="lazy"
                        />
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
                        Tu próximo guion de ventas, listo en 10 segundos.
                    </h2>

                    <p className="mt-4 mx-auto text-xl lg:text-2xl text-slate-300 text-balance">
                        No redactes, ejecuta. Te entrego mi sistema de copywriting dentro de una IA para que generes guiones probados. Regístrate y úsalo gratis.
                    </p>

                    <div className="mt-8">
                        {/* El Botón Primario destaca perfectamente sobre el fondo de la tarjeta */}
                        <a
                            href="https://totalscript.hugoherreracoach.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-10 py-4 text-xl font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        >
                            Generar Guiones con IA
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InnovationSection;