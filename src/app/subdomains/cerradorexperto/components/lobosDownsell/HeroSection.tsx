// app/components/lobosDownsell/HeroSection.tsx

"use client";

import type { FC } from 'react';
import Image from 'next/image';
import { Check, Star, BadgePercent } from 'lucide-react';
import EvergreenCountdown from './EvergreenCountdown';
import { OfferComponent } from '../../components/ui/OfferComponent';
import { Suspense } from 'react';

// --- Tipos (Sin cambios) ---
interface Benefit {
    titulo: string;
    descripcion: string;
}

interface Testimonial {
    cita: string;
    autor: string;
    rol: string;
}

const FIRST_INSTALLMENT_OFFER = {
  amount: 100.00,
  currency: 'PEN' as const,
  description: 'Programa Lobos de Ventas (Pago 1 de 5)',
  installments: 1, 
  usdAmount: 28.00
};

// --- Datos Mockeados (Sin cambios) ---
const benefits: Benefit[] = [
    { titulo: 'Arsenal de Ventas (+300 Lecciones)', descripcion: 'Acceso de por vida a guiones y procesos probados.' },
    { titulo: 'Coaching Grupal en Vivo (1 Año)', descripcion: 'Reuniones quincenales de coaching y entrenamiento.' },
    { titulo: 'Soporte Directo por WhatsApp (30 Días)', descripcion: 'Resuelve dudas y manejo de objeciones al instante.' },
    { titulo: 'Acceso al Círculo Interno', descripcion: 'Networking y estrategias con otros profesionales de élite.' },
    { titulo: 'Certificación "Lobo de Ventas"', descripcion: 'Valida tu dominio y te posiciona como un vendedor top.' },
    { titulo: 'Actualizaciones de por Vida', descripcion: 'Recibe todas las futuras lecciones sin costo adicional.' },
];

const testimonial: Testimonial = {
    cita: "Tenía mis dudas, pero con una sola venta extra que hice gracias al programa y apoyo de Hugo, cubrí la primera cuota. El aumento del 40% en mis cierres fue real e inmediato. Te das cuenta de que el programa se paga solo.",
    autor: "Javier Morales",
    rol: "Emprendedor, Tech Solutions"
};


// Este es un Server Component por defecto
const FinalOfferPage: FC = () => {
    return (
        <section className="bg-slate-950 text-white antialiased">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">

                {/* --- SECCIÓN INTRODUCTORIA (TÍTULO Y MOCKUP) --- */}
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">
                        Espera. Una última cosa.
                    </h1>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        Un sistema de ventas probado no debería estar bloqueado por un solo pago. Aquí tienes un puente de acceso para que empieces a construir tu estructura hoy.
                    </p>
                    <div className="my-12 sm:my-16">
                        <Image
                            src="/subdomains/cerradorexperto/images/lobos/lobosMockup.png"
                            alt="Acceso al programa Lobos de Ventas en todos los dispositivos"
                            width={800}
                            height={378}
                            priority
                            className="rounded-xl shadow-2xl shadow-cyan-500/10 mx-auto"
                        />
                    </div>
                </div>

                {/* --- LAYOUT DE 2 COLUMNAS PARA LA OFERTA --- */}
                {/* En móvil es 1 columna, en lg+ son 2 columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-start">

                    {/* === COLUMNA IZQUIERDA: PERSUASIÓN Y BENEFICIOS === */}
                    <div className="lg:order-1 space-y-12">
                        {/* 1. BENEFICIOS */}
                        <div className="text-left">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center lg:text-left">
                                Todo lo que desbloqueas hoy mismo:
                            </h3>
                            <ul className="space-y-5">
                                {benefits.map(({ titulo, descripcion }) => (
                                    <li key={titulo} className="flex items-start gap-4">
                                        <Check className="h-7 w-7 text-cyan-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-white text-lg lg:text-xl">{titulo}</h4>
                                            <p className="text-slate-400 text-base lg:text-lg">{descripcion}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. PRUEBA SOCIAL: TESTIMONIO */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                            <div className="flex justify-start gap-1 mb-3">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <blockquote className="text-lg text-slate-300 italic">&quot;{testimonial.cita}&quot;</blockquote>
                            <cite className="block text-right mt-6 font-semibold text-white not-italic">— {testimonial.autor}, <span className="text-slate-400">{testimonial.rol}</span></cite>
                        </div>
                    </div>

                    {/* === COLUMNA DERECHA (STICKY): BLOQUE DE OFERTA === */}
                    <div className="lg:order-2 lg:sticky lg:top-24 mt-12 lg:mt-0">
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 text-center">

                            {/* 1. URGENCIA: El temporizador */}
                            <EvergreenCountdown />

                            <div className="my-8 w-full border-t border-dashed border-slate-700"></div>

                            {/* 2. PROPUESTA DE VALOR: Precio y ahorro */}
                            <p className="text-2xl text-slate-300">Tu Acceso Inmediato por solo:</p>
                            <p className="text-6xl sm:text-7xl font-extrabold my-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
                                5 cuotas de S/ 100
                            </p>
                            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-semibold rounded-full px-4 py-2 mt-4 text-lg">
                                <BadgePercent className="h-6 w-6" />
                                ¡Estás Ahorrando S/ 600 ahora!
                            </div>

                            {/* 3. LLAMADO A LA ACCIÓN (CTA) */}
                            <div className="mt-8">
                                <Suspense fallback={<p className="text-white">Cargando oferta...</p>}>
                                    <OfferComponent
                                        details={FIRST_INSTALLMENT_OFFER}
                                        declineUrl="/gracias"
                                        productId="comunidad-lobos-cuota-inicial"
                                        onSuccessRedirectTo="/gracias"
                                    />
                                </Suspense>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FinalOfferPage;