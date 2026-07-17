// src/components/CtaSection.tsx

import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react'; 

const CtaSection = () => {
    return (
        <section className="relative flex justify-center items-center bg-black py-20 min-h-[90vh] sm:py-24 overflow-hidden">
            <div 
                aria-hidden="true" 
                className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.25),transparent_60%)]"
            ></div>

            <div className="relative z-20 container mx-auto px-4 text-center">
                <div className="mx-auto">
                    
                    {/* NUEVO: Icono de anclaje para dar un punto de entrada visual. */}
                    <div className="flex justify-center mb-6">
                        <div className="flex h-20 w-20 lg:h-28 lg:w-28 items-center justify-center rounded-full bg-gradient-to-b from-[#0a4afc] to-[#153eb5] shadow-lg">
                            <Rocket className="h-12 w-12 lg:h-16 lg:w-16 text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
                        ¿Listo para construir un sistema a medida?
                    </h2>
                    
                    <p className="mt-4 mx-auto text-xl lg:text-2xl text-slate-300 text-balance">
                        Las herramientas gratuitas resuelven problemas puntuales. Un sistema a medida transforma tu negocio. Conoce el método para instalar un motor de ventas predecible en tu empresa.
                    </p>
                    
                    <div className="mt-10">
                        {/* CAMBIO: Botón más grande y prominente. */}
                        <a
                            href="https://hugoherreracoach.com/servicios/asesoria-comercial" // Actualizado al link correcto como discutimos
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        >
                            Ver Plan de Implementación
                            <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;