// src/components/home/PresentationSection.tsx

import React from 'react';
import Image from 'next/image';

export default function PresentationSection() {
    return (
        <section
            id="presentacion"
            className="relative bg-slate-900 text-white border-t border-b border-slate-700/50 overflow-hidden"
        >
            <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div className="bg-primary-blue/15 rounded-full w-[60rem] h-[60rem] blur-3xl opacity-70" />
            </div>

            <div className="relative container mx-auto py-24 sm:py-32 px-4">
                {/* ✅ CLAVE: El contenedor es un grid. En móvil (por defecto) es de 1 columna. 
                    En desktop (lg) es de 2 columnas. Esto nos permite reordenar todo. */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 items-center">
                    
                    {/* ✅ Elemento 1: Título. Separado para poder reordenarlo. */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-balance text-center lg:text-left">
                            La Venta se Gana o se Pierde en el Cierre.
                        </h2>
                    </div>

                    {/* ✅ Elemento 2: Imagen. */}
                    <div className="order-2 lg:order-1 lg:row-span-2 flex justify-center">
                        <Image
                            src="/subdomains/cerradorexperto/images/bonos.png"
                            alt="Paquete completo del libro Cerrador Experto y sus bonos"
                            width={1000}
                            height={391}
                            className="w-full transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    </div>

                    {/* ✅ Elemento 3: Párrafos. Usando el copy original. */}
                    <div className="order-3 lg:order-3">
                        <div className="space-y-5 text-xl lg:text-2xl text-slate-300 leading-[1.4] max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                            <p>
                                Conozco tu situación. Dominas tu producto, inviertes horas en explicar y educar... para terminar con un &quot;yo te aviso&quot; que nunca llega.
                            </p>
                            <p>
                                El problema no es tu conocimiento. Es que no tienes un 
                                <strong className="text-white"> sistema de cierre probado.</strong>
                            </p>
                            <p>
                                Por eso he creado <strong className="text-white">&quot;Cerrador Experto&quot;</strong>. Esto no es teoría. Es un arsenal de guiones y respuestas probadas, para que tomes el control y asegures tu comisión.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}