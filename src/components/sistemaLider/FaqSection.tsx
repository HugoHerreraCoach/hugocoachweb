'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react'; // Añadimos HelpCircle para un ícono en el título

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: '¿En cuánto tiempo veré resultados y cuál es el retorno de la inversión?',
    answer: 'Mis clientes ven los primeros resultados medibles, como mejoras en la tasa de cierre, en los primeros 30 días. El retorno es doble: financiero, al tener un sistema de ventas predecible, y de tiempo, al liberarte de la supervisión para que puedas dirigir.'
  },
  {
    question: '¿Y si mi negocio es distinto? ¿Realmente se puede aplicar este sistema?',
    answer: 'Sí. Los principios de un sistema de ventas son universales, pero las herramientas (guiones, procesos, indicadores) se construyen 100% a la medida de tu negocio. No es una plantilla, es un sistema único para ti.'
  },
  {
    question: 'Como dueño, ¿cuál es mi verdadera inversión de tiempo en esto?',
    answer: 'Mínima. Yo me encargo del 90% del trabajo pesado de análisis y construcción. Tu rol es 100% estratégico en nuestras sesiones para validar la dirección y tomar decisiones clave.'
  },
  {
    question: '¿Cómo garantizas que mi equipo adopte el nuevo sistema?',
    answer: 'Porque el nuevo proceso será el camino más fácil y rentable para que tu equipo venda más. Cuando la estructura correcta es también la más conveniente para ellos, la adopción es una consecuencia natural.'
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-slate-50 py-20 sm:py-28"> 
      <div className="container mx-auto max-w-4xl px-6 lg:px-8"> 
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-full bg-[#0a4afc]/15 p-3 mb-4"> 
            <HelpCircle className="h-8 w-8 text-[#0a4afc]" aria-hidden="true" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            Preguntas Frecuentes
          </h2>
          <p className="mt-4 text-xl text-slate-600 mx-auto text-balance">
            ¿Tienes dudas? Aquí tienes respuestas directas.
          </p>
        </div>

        <div className="space-y-6"> 
          {faqs.map((faq: FaqItem, index: number) => (
            <div
              key={index}
              className={`
                rounded-xl border border-slate-200 bg-white shadow-sm
                transition-all duration-300 ease-in-out
                ${openIndex === index ? 'shadow-md ring-2 ring-[#0a4afc]' : 'hover:shadow-md hover:border-slate-300'}
              `}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-4 text-left cursor-pointer" 
                aria-expanded={openIndex === index ? 'true' : 'false'}
                aria-controls={`faq-content-${index}`}
              >
                <span className="text-lg lg:text-xl leading-[1.4] font-semibold text-slate-800 flex-grow pr-4"> 
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="h-12 w-12 md:h-8 md:w-8 text-[#0a4afc] transition-transform duration-300 transform rotate-180" aria-hidden="true" />
                ) : (
                  <Plus className="h-12 w-12 md:h-8 md:w-8 text-slate-500 transition-transform duration-300" aria-hidden="true" />
                )}
              </button>
              <div
                id={`faq-content-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <p className="px-5 pb-6 text-lg leading-[1.4] text-slate-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}