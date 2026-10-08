// src/components/servicios/LlamadaGratisCta.tsx
// Cierre de página: el único botón principal de la web (llamada gratuita de 20 min).

import { CtaButton } from '@/components/ui/CtaButton';
import { LLAMADA_GRATIS_URL, WHATSAPP_URL } from '@/lib/servicios';

export function LlamadaGratisCta() {
    return (
        <section id="llamada" className="w-full bg-[#0a4afc] py-14 lg:py-28">
            <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
                <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
                    Cuéntanos de tu equipo. En 20 minutos sabremos si te podemos ayudar.
                </h2>
                <p className="mt-5 text-lg text-white/90 lg:mt-6 lg:text-xl text-balance">
                    Una videollamada gratis, sin compromiso, con un asesor de mi equipo. Si hay encaje, te dice qué servicio te conviene y cuánto cuesta. Si no, también te lo dice.
                </p>
                <div className="mt-8 lg:mt-10">
                    <CtaButton href={LLAMADA_GRATIS_URL} variant="inverse" className="w-full sm:w-auto">
                        Llamada gratis de 20 min
                    </CtaButton>
                    <p className="mt-3">
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center text-base font-semibold text-white underline underline-offset-4 hover:text-white/80"
                        >
                            o escríbeme por WhatsApp
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
