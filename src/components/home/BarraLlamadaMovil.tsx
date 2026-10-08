'use client';

// src/components/home/BarraLlamadaMovil.tsx
// Barra fija solo en móvil: la llamada gratis siempre a mano del pulgar.
// Aparece al salir del hero y se oculta cuando ya se ve el cierre azul o el pie de página.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { LLAMADA_GRATIS_URL, WHATSAPP_URL } from '@/lib/servicios';

export default function BarraLlamadaMovil() {
    const [pasoElHero, setPasoElHero] = useState(false);
    const [hayCtaVisible, setHayCtaVisible] = useState(false);

    useEffect(() => {
        const hero = document.getElementById('inicio');
        if (!hero) return;

        const observadorHero = new IntersectionObserver(([entrada]) => {
            setPasoElHero(!entrada.isIntersecting && entrada.boundingClientRect.top < 0);
        });
        observadorHero.observe(hero);

        const visibles = new Set<Element>();
        const observadorCierre = new IntersectionObserver((entradas) => {
            for (const entrada of entradas) {
                if (entrada.isIntersecting) visibles.add(entrada.target);
                else visibles.delete(entrada.target);
            }
            setHayCtaVisible(visibles.size > 0);
        });
        const cierre = [document.getElementById('llamada'), document.querySelector('footer')];
        cierre.forEach((elemento) => elemento && observadorCierre.observe(elemento));

        return () => {
            observadorHero.disconnect();
            observadorCierre.disconnect();
        };
    }, []);

    const visible = pasoElHero && !hayCtaVisible;

    return (
        <div
            className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-black/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 lg:hidden ${
                visible ? 'translate-y-0' : 'translate-y-full'
            }`}
            aria-hidden={!visible}
        >
            <div className="flex items-center gap-3">
                <Link
                    href={LLAMADA_GRATIS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={visible ? 0 : -1}
                    className="flex min-h-[48px] flex-1 items-center justify-center rounded-lg bg-[#0a4afc] px-4 text-base font-semibold text-white active:scale-[0.98]"
                >
                    Llamada gratis de 20 min
                </Link>
                <Link
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={visible ? 0 : -1}
                    aria-label="Escríbeme por WhatsApp"
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-slate-600 text-white active:scale-[0.98]"
                >
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}
