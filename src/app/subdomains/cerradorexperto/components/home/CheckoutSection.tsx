// src/components/home/CheckoutSection.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, ChevronDown } from 'lucide-react';
import { PaymentForm } from '../ui/PaymentForm';

const offerComponents = [
    { type: 'Libro Principal', name: 'Libro Digital "Cerrador Experto"', value: 25 },
    { type: 'Bono', name: 'Kit de Cierre de Emergencia', value: 47 },
    { type: 'Bono', name: 'El Guion Exacto para Ventas por Teléfono', value: 67 },
    { type: 'Bono', name: 'El Modelo para Ventas High Ticket', value: 97 },
    { type: 'Bono', name: 'El Anti-Visto: Las 7 Plantillas de WhatsApp', value: 77 },
    { type: 'Bono', name: 'Afirmaciones del Cerrador Experto', value: 37 },
];
const totalValue = offerComponents.reduce((sum, item) => sum + item.value, 0);

const miniTestimonial = {
    quote: '"Dejé de perder el tiempo y ahora cierro muchas más ventas."',
    name: 'Sindy Castillo Vera',
    imageUrl: '/subdomains/cerradorexperto/images/sindy.jpg',
};

export default function CheckoutSection() {
    const [isSummaryOpen, setSummaryOpen] = useState(false);

    return (
        <section
            id="checkout"
            className="relative bg-slate-100 pb-20"
        >
            {/* ✅ Contenedor principal centrado y con ancho máximo para enfocar la atención en PC. */}
            <div className="relative container mx-auto max-w-6xl px-4">
                <div className="text-center mb-8 lg:mb-10">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance">
                        Toma el Control Ahora.
                    </h2>
                    <p className="mt-4 text-xl lg:text-2xl text-slate-600 mx-auto">Es tu último paso. Rellena tus datos y recibe acceso inmediato al arsenal completo.</p>
                </div>

                {/* ✅ Layout de 2 columnas en desktop (lg) para una estructura clara: Valor a la izquierda, Acción a la derecha. */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">

                    {/* Columna de Formulario de Pago */}
                    <div className="bg-white py-6 px-0 lg:p-8 rounded-2xl border-2 border-primary-blue shadow-2xl shadow-primary-blue/20 lg:order-last">
                        <h3 className="text-2xl font-bold text-slate-900 text-center">Completa tu pago 100% seguro</h3>

                        <div className="mt-4">
                            <PaymentForm
                                productId="libro-digital"
                                onSuccessRedirectTo="/lobos" // Le dices que después de pagar, vaya a /lobos
                            />
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <figure className="flex items-center gap-2 px-2">
                                <Image src={miniTestimonial.imageUrl} alt={`Foto de ${miniTestimonial.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                                <blockquote className="flex-grow">
                                    <p className="text-slate-700 text-base leading-[1.4] font-medium italic">{miniTestimonial.quote}</p>
                                    <figcaption className="text-sm text-slate-500 mt-1">- {miniTestimonial.name}</figcaption>
                                </blockquote>
                            </figure>
                        </div>
                    </div>

                    {/* Columna de Resumen de la Oferta */}
                    {/* ✅ Arquitectura Mobile-First: El formulario sigue primero en el DOM para la mejor experiencia móvil. */}
                    <div className="lg:order-first">
                        <div className="lg:hidden mt-4 mb-4">
                            <button onClick={() => setSummaryOpen(!isSummaryOpen)} className="w-full flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                                <span className="font-bold text-primary-blue">{isSummaryOpen ? 'Ocultar resumen' : 'Mostrar resumen de la orden'}</span>
                                <ChevronDown className={`h-6 w-6 text-primary-blue transition-transform duration-300 ${isSummaryOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <div className={`${isSummaryOpen ? 'block' : 'hidden'} lg:block bg-white p-8 rounded-2xl border border-slate-200 shadow-lg`}>
                            <Image src="/subdomains/cerradorexperto/images/bonos.png" alt="Paquete completo de productos" width={1000} height={391} className="rounded-xl mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900">Recibirás Acceso Inmediato a TODO esto:</h3>
                            <ul className="mt-6 space-y-4 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0">
                                {offerComponents.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 mt-4">
                                        <Check className="h-6 w-6 text-accent-green flex-shrink-0 mt-1" />
                                        <span className="text-slate-700 text-lg">{item.name}</span>
                                    </li>
                                ))}
                                <li className="flex items-start gap-3 font-bold mt-4 md:col-span-2">
                                    <Check className="h-6 w-6 text-accent-green flex-shrink-0 mt-1" />
                                    <span className="text-slate-800 text-lg">Garantía Incondicional de 30 Días</span>
                                </li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-slate-200 space-y-2">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-semibold text-slate-600">VALOR TOTAL:</span>
                                    <span className="font-bold text-slate-500 line-through">${totalValue} USD</span>
                                </div>
                                <div className="flex justify-between items-center text-xl">
                                    <span className="font-bold text-slate-900">TU INVERSIÓN HOY:</span>
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-secondary-blue">$7 USD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}