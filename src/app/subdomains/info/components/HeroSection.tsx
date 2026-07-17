// src/components/SocialHeader.tsx

import React from 'react';
import Image from 'next/image';

const SocialHeader: React.FC = () => {
    return (
        // CAMBIO: Se eliminó el fondo. Ahora es transparente para heredar el de la página.
        <header className="relative w-full overflow-hidden text-white">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_center,rgba(37,99,235,0.15),transparent_40%)]"
            ></div>
            
            <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 lg:py-16">
                {/* --- SECCIÓN DE IDENTIDAD VISUAL --- */}
                <div className="flex flex-col items-center text-center">
                    <Image
                        src="/subdomains/info/images/hugoLogo.png"
                        alt="Logo de Hugo Herrera"
                        width={660}
                        height={92}
                        className="mb-10 h-auto w-full max-w-[150px]"
                        loading="lazy"
                    />
                    <Image
                        src="/subdomains/info/images/hugo-perfil-cuadrado.jpg"
                        alt="Foto de perfil de Hugo Herrera"
                        width={720}
                        height={720}
                        className="h-40 w-40 rounded-full border-4 border-blue-500/50 object-cover shadow-2xl"
                        priority
                    />
                    <h2 className='mt-6 text-3xl font-bold'>HUGO HERRERA</h2>
                    <p className='mt-2 text-base uppercase tracking-wider text-slate-400 text-balance'>
                        Entrenador de Ventas, Conferencista, Autor
                    </p>
                </div>

                {/* --- PROPUESTA DE VALOR UNIFICADA --- */}
                <div className="mt-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-balance lg:text-5xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                            Toma el control
                        </span> de tus resultados.
                    </h1>
                    <p className="mt-4 text-xl lg:text-2xl text-slate-300 text-balance mx-auto">
                        El control no viene de trabajar más, viene de tener un <span className='text-white font-bold'>método claro.</span> Te entrego las herramientas y el proceso exacto para construir ventas predecibles.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default SocialHeader;