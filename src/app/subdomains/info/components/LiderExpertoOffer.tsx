// src/components/LiderExpertoOffer.tsx

import React from 'react';
import Image from 'next/image';

const LiderExpertoOffer: React.FC = () => {
    return (
        // CAMBIO: Fondo unificado con el header y un borde superior para separación sutil.
        <section className="w-full text-white pb-16">
            <div className="mx-auto max-w-5xl px-4 pt-16"> {/* Añadido pt-16 para espaciado interno */}
                <div className="grid grid-cols-1 items-center gap-y-8 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                    
                    {/* --- TEXTO DE LA OFERTA (Sin cambios en copy) --- */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-balance lg:text-4xl">
                           <span className="text-base font-bold uppercase tracking-wider text-blue-500">PARA LÍDERES:</span><br/>
                           Deja de ser el mejor vendedor de tu empresa.
                        </h2>
                    </div>

                    {/* --- IMAGEN DEL LIBRO --- */}
                    <div className="flex items-center justify-center md:col-start-2 md:row-start-1 md:row-end-4 md:justify-center">
                        <Image
                            src="/subdomains/info/images/liderExperto.jpg" 
                            alt="Portada del libro Líder Experto de Hugo Herrera"
                            width={458}
                            height={638}
                            // CAMBIO: Añadida sombra e interactividad para mayor impacto visual.
                            className="w-[50%] md:w-full max-w-[350px] rounded-lg shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    
                    {/* --- DESCRIPCIÓN Y CTA (Sin cambios en copy) --- */}
                    <p className="text-center text-xl lg:text-2xl text-slate-300 text-balance md:text-left">
                        Mi libro <span className='font-semibold text-white'>Líder Experto</span> te entrega el sistema paso a paso para construir un equipo que vende sin depender de ti. Te lo envío <span className="font-bold text-white">GRATIS</span> a tu puerta, solo cubre el envío.
                    </p>

                    <div className="text-center md:text-left">
                        <a
                            href="https://liderexperto.hugoherreracoach.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xl justify-center gap-2 rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 py-3.5 font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            Quiero el Sistema
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiderExpertoOffer;