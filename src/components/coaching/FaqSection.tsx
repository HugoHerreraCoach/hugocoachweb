// src/components/coaching/FaqSection.tsx
"use client"; // Directiva necesaria para usar hooks como useState

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * Componente para la Sección 9: Preguntas Frecuentes (FAQ).
 * Resuelve las dudas finales del vendedor a través de un acordeón interactivo.
 */

// Datos de las preguntas y respuestas.
const faqData = [
    {
        question: "¿Esto funciona para mi industria (seguros, inmobiliaria, software, etc.)?",
        answer: "Sí. No enseño trucos de una industria, instalo un sistema de ventas universal basado en la psicología humana. La estructura funciona siempre, luego la adaptamos 100% a tu producto y a tu cliente en la sesión.",
    },
    {
        question: "¿Qué diferencia hay entre esto y ver videos en YouTube?",
        answer: "Los videos te dan información. Yo te doy un plan de acción a medida. Auditamos TU proceso, TU guion, TUS llamadas. Es la diferencia entre leer un mapa y tener un GPS que te guía paso a paso.",
    },
    {
        question: "¿Realmente puedo recuperar la inversión de $200 USD rápido?",
        answer: "Piénsalo así: ¿Cuánto vale una sola venta que hoy estás perdiendo? Si este plan te ayuda a cerrar una sola venta adicional, la sesión no solo se paga sola, sino que te genera una ganancia inmediata. El objetivo es darte un sistema que te produzca un retorno de por vida.",
    },
];

export default function FaqSection() {
    // Estado para controlar qué pregunta del acordeón está abierta.
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Función para manejar la apertura/cierre de las preguntas.
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Encabezado de la sección */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center rounded-full bg-blue-100/50 p-3 mb-4">
                        <HelpCircle className="h-8 w-8 text-[#0a4afc]" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        Respuestas directas para vendedores que van al grano.
                    </h2>
                </div>

                {/* Contenedor del acordeón */}
                <div className="space-y-6">
                    {faqData.map((item, index) => (
                        <div key={index} className="rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:border-slate-300">
                            <button
                                onClick={() => handleToggle(index)}
                                className="flex w-full items-center justify-between p-6 text-left"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg lg:text-xl font-semibold text-slate-800 flex-grow pr-4">
                                    {item.question}
                                </span>
                                <ChevronDown
                                    className={`h-6 w-6 text-slate-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-6 text-lg text-slate-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
