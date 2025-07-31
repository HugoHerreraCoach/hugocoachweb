// src/components/casosDeExito/HeroSection.tsx

import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/casosdeexito/casosHeader.jpg"
                    alt="Mosaico de casos de éxito de Hugo Herrera"
                    fill={true}
                    objectFit="cover"
                    className="object-cover w-full h-full opacity-20  object-[45%_50%] md:object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
            </div>


            <div className="relative z-20 max-w-4xl pt-12 px-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white md:text-6xl text-balance">
                    Resultados, no promesas.
                </h1>
                <p className="mt-6 text-xl md:text-2xl leading-[1.5] text-slate-300 text-balance">
                    La prueba real de vendedores y líderes que aplican el sistema.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;