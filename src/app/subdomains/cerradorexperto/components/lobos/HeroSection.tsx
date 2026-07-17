//src/components/lobos/HeroSection.tsx

"use client";

import { Suspense } from 'react';
import YoutubePlayer from '../ui/YoutubePlayer';
import { OfferComponent } from '../ui/OfferComponent';

// --- Componentes Internos para Máxima Claridad y Reutilización ---


const OTO_OFFER = {
    amount: 500.00,
    currency: 'PEN' as const,
    description: 'Programa Lobos de Ventas',
    installments: 1,
    usdAmount: 130.00
};

export function HeroSection() {
    return (
        <section className="bg-slate-900 text-white py-16 sm:py-20 px-4">
            <div className="container mx-auto max-w-7xl text-center">

                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
                    Tu acceso está confirmado. Ahora, mira cómo potenciarlo.
                </h1>

                <p className="my-8 text-xl lg:text-2xl text-slate-300 mx-auto max-w-4xl text-balance">
                    Ya dominas la fase más crítica: el CIERRE. Dale play y te muestro el mapa completo para dominar el sistema de venta de alto rendimiento
                </p>

                <div className="w-full max-w-4xl mx-auto">
                    <YoutubePlayer
                        videoId='AL4NGff7tt4'
                        className="w-full rounded-xl shadow-2xl shadow-primary-blue/20"
                    />
                </div>

                {/* --- Contenedor de Acción (Action Box) --- */}
                <div className="mt-12 mx-auto max-w-2xl bg-slate-800/50 border border-slate-700 rounded-2xl p-6 sm:p-8">
                    <Suspense fallback={<p className="text-white">Cargando oferta...</p>}>
                        <OfferComponent
                            details={OTO_OFFER}
                            declineUrl="/lobos-downsell"
                            productId="comunidad-lobos"
                            onSuccessRedirectTo="/gracias"
                        />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}