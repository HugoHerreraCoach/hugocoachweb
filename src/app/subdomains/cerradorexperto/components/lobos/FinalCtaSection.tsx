//src/components/lobos/FinalCtaSection.tsx

import { Suspense } from 'react';
import { OfferComponent } from '../ui/OfferComponent';

const OTO_OFFER = {
    amount: 500.00,
    currency: 'PEN' as const,
    description: 'Programa Lobos de Ventas',
    installments: 1,
    usdAmount: 130.00
};

const FinalCtaSection = () => {

    return (
        // Utilizamos un fondo neutro (slate-100) para que el CTA principal sea el protagonista absoluto.
        <section id="oto-final-cta" className="bg-slate-50 py-24 sm:py-32">
            {/* Contenedor principal con padding y ancho máximo para legibilidad en pantallas grandes. */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">

                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance">
                    La Decisión es Ahora. Esta Oferta No se Repetirá.
                </h2>
                <div className="mt-6 space-y-6 text-xl lg:text-2xl text-slate-600 mx-auto text-balance leading-relaxed">
                    <p>
                        Ya tienes toda la información. Esta página es el único lugar donde puedes añadir el sistema &quot;Lobos de Ventas&quot; con este descuento. Si la cierras, la oferta desaparece.
                    </p>
                    <p>
                        Ahora tienes que tomar una decisión sobre tu futuro: seguir operando con tácticas de cierre o instalar el sistema completo de un vendedor de élite. La elección es tuya.
                    </p>
                </div>

                <div className="mt-12 flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <Suspense fallback={<p className="text-slate-700">Cargando oferta...</p>}>
                            <OfferComponent
                                details={OTO_OFFER}
                                declineUrl="/lobos-downsell"
                                productId="comunidad-lobos"
                                onSuccessRedirectTo="/gracias"
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCtaSection;