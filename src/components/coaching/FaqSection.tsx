// src/components/coaching/FaqSection.tsx
"use client"; // Directiva necesaria para usar hooks como useState

import React, { useState } from 'react';
import { Plus, Minus, MessageCircleQuestion } from 'lucide-react';

// Definimos un tipo para cada elemento de FAQ para mayor seguridad y claridad.
type FaqItem = {
  question: string;
  answer: string;
};

// Datos de las preguntas y respuestas.
const faqData: FaqItem[] = [
    {
        question: "¿Esto es para principiantes o para vendedores con experiencia?",
        answer: "Es para vendedores con experiencia que quieren pasar de buenos a imparables. No vemos lo básico, optimizamos tu proceso actual para que dupliques tus resultados.",
    },
    {
        question: "Mi industria es muy específica, ¿cómo me aseguras que funcionará?",
        answer: "Porque no te vendo trucos, te instalo un sistema universal basado en la psicología del comprador. En la sesión, adaptamos este sistema 100% a tu producto y a tu cliente.",
    },
    {
        question: "¿Cómo sé que los $200 USD son una buena inversión y no un gasto?",
        answer: "Piensa en cuánto te cuesta una sola venta perdida por no tener un proceso. Este sistema se paga solo con el primer cierre adicional que logres. Además, mi garantía elimina el 100% de tu riesgo.",
    },
    {
        question: "¿Qué diferencia hay entre esto y ver videos gratuitos en YouTube?",
        answer: "Los videos te dan un mapa genérico. Yo me siento a tu lado y te construyo un GPS a medida, paso a paso, hasta el cierre. La información es gratis, la implementación a medida es lo que vale.",
    },
];

export default function FaqSection(): React.ReactElement {
    // Estado para controlar qué pregunta del acordeón está abierta.
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Inicia con la primera pregunta abierta

    // Función para manejar la apertura/cierre de las preguntas.
    const handleToggle = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-slate-50 py-20 lg:py-28">
            <div className="container mx-auto max-w-5xl px-4">
                {/* Encabezado de la sección */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-4 mb-4">
                        <MessageCircleQuestion className="h-10 w-10 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                        Respuestas directas para vendedores que van al grano.
                    </h2>
                </div>

                {/* Contenedor del acordeón unificado */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
                    {faqData.map((item: FaqItem, index: number) => {
                        const isOpen: boolean = openIndex === index;
                        return (
                            <div key={index} className="border-b border-slate-200 last:border-b-0">
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="flex w-full items-start justify-between gap-4 p-6 text-left cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center justify-center h-7 w-7 mt-1 flex-shrink-0 rounded-full bg-blue-600 text-white">
                                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                    </div>
                                    <span className="flex-1 text-xl lg:text-2xl font-semibold text-slate-800">
                                        {item.question}
                                    </span>
                                </button>
                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="pl-[52px] pr-6 pb-6 text-xl lg:text-2xl  text-slate-600 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}