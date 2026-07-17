"use client"

import Image from "next/image"
import VideoPlayer from "@liderexperto/components/VideoPlayer"
import { useState, useEffect } from 'react'; 
import Link from "next/link";

// Meta Ads tracking
declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

// Helper function to safely call fbq
const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    if (window.fbq && typeof window.fbq === 'function') {
    //   console.log(`🎯 Meta Pixel: Tracking ${eventName}`, data);
      window.fbq('track', eventName, data);
    } else {
    //   console.warn(`⚠️ Meta Pixel: fbq not available for ${eventName}`);
    }
  }
};


const questions = [
    {
        id: 1,
        question: "¿Cuándo recibiré el libro?",
        answer: "Una vez confirmados tus datos, procesaremos el envío en un plazo de 24 a 48 horas hábiles.\n\nEl tiempo de entrega dependerá de tu ubicación, pero normalmente toma entre 3 a 7 días hábiles."
    },
    {
        id: 2,
        question: "¿Qué bonos voy a recibir y cómo me los entregan?",
        answer: "Con la compra del libro Líder Experto recibirás bonos digitales incluidos, como guiones, plantillas y herramientas prácticas para aplicar con tu equipo.\n\nSi además añadiste el audiolibro o la clase grabada con documentos editables, también te daremos acceso a esos materiales.\n\nTodo te llegará por correo o WhatsApp en un plazo máximo de 24 horas hábiles.\n\nSi no los ves, revisa tu carpeta de spam o promociones"
    },
    {
        id: 3,
        question: "¿Qué hago si tengo un problema con mi pedido o no recibo los accesos?",
        answer: "Si tienes cualquier inconveniente con el envío del libro o con la entrega de tus materiales digitales, puedes escribirnos directamente a: 📧 info@hugoherreracoach.com\n\nTe responderemos en un plazo máximo de 24 horas hábiles."
    },
    {
        id: 4,
        question: "¿La asesoría personalizada tiene algún costo?",
        answer: "No. La asesoría no tiene costo, pero es solo para quienes califican.\n\nEstá dirigida a dueños de negocio que ya adquirieron el libro Líder Experto y están listos para aplicar lo aprendido con su equipo.\n\nSi quieres acceder, completa el formulario de aplicación.\n\nEvaluaremos tu caso y, si cumples con los criterios, te contactaremos por correo o WhatsApp para coordinar la sesión."
    },
];

export default function GraciasStart() {

    // El estado openQuestionId puede ser un número o null
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

    // Track ViewContent when component mounts (only once)
    useEffect(() => {
        // 1. Browser pixel tracking
        trackEvent('ViewContent', {
            content_type: 'thank_you_page',
            content_ids: ['gracias-lider-experto'],
            content_name: 'Página de Gracias - Libro Líder Experto',
            value: 0, // No direct monetary value for thank you page
            currency: 'PEN'
        });

        // 2. Server-side API tracking
        const trackViewContent = async () => {
            try {
                await fetch('/api/meta/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventName: 'ViewContent',
                        userData: {}, // No user data available on thank you page typically
                        customData: {
                            content_type: 'thank_you_page',
                            content_ids: ['gracias-lider-experto'],
                            content_name: 'Página de Gracias - Libro Líder Experto',
                            value: 0,
                            currency: 'PEN'
                        }
                    }),
                });
            } catch (error) {
                console.error("Error sending ViewContent event to CAPI:", error);
            }
        };

        trackViewContent();
    }, []); // Empty dependency array to run only once

    // Especificamos que 'id' es de tipo 'number'
    const toggleQuestion = (id: number) => {
        if (openQuestionId === id) {
            setOpenQuestionId(null);
        } else {
            setOpenQuestionId(id);
        }
    }

    return (
        <section className="flex flex-col items-center">
            {/* Primera parte - video */}
            <div className="bg-black w-full flex flex-col items-center">
                <div  className="bg-black text-white max-w-[1200px] p-4 pb-8 flex flex-col items-center">
                    <Image
                        src="/subdomains/liderexperto/gracias/logoLiderExperto.jpg"
                        alt="Logo líder experto"
                        width={500}
                        height={292}
                        className="w-[30%] max-w-[200px] mt-8"
                    />
                    <h1 className="font-barlow font-black text-3xl md:text-4xl lg:text-5xl text-center my-4">
                        ¡Felicidades! Tu pedido fue recibido con éxito.
                    </h1>

                    {/* Barra superior de video + Video */}
                    <div className="bg-red-600 w-full flex py-2 px-4 items-center justify-center rounded-t-lg">
                        <Image 
                            src="/subdomains/liderexperto/lobos/playIcon.png"
                            alt="Icono de play"
                            width={80}
                            height={80}
                            className="w-[26px] mr-2"
                        />
                        <p className="text-xl text-white md:text-2xl lg:text-3xl font-barlow-condensed font-regular text-center leading-[1.2]">
                            Los próximos pasos...
                        </p>
                    </div>
                    <VideoPlayer
                        src="https://stream.mux.com/C0100ezzluf02uKjjRUqRPaJ024w5eXzITbhTXN101k02s600E.m3u8"
                        poster="/placeholder.svg?height=400&width=600"
                        className="mb-2"
                    />
                </div>
                {/* Linea inferior roja */}
                <div className="h-1 bg-red-600 w-full"></div>
            </div>
            
            
            {/* Segunda parte - Aplica para la asesoría */}
            <div className="bg-white w-full text-black max-w-[1200px] p-4 py-8 flex flex-col items-center">
                <h2 className="font-montserrat font-extrabold mt-6 text-2xl md:text-3xl lg:text-4xl text-center leading-[1.2]">
                    ¿TE GUSTARÍA RECIBIR UNA ASESORÍA PERSONALIZADA PARA TU NEGOCIO?
                </h2>
                <div className="h-[2px] bg-red-600 w-[50%] mt-2"></div>
                <Image
                    src="/subdomains/liderexperto/gracias/bottomIcon.jpg"
                    alt="Icono hacia abajo"
                    width={375}
                    height={78}
                    className="w-[50%] max-w-[300px] mt-6"
                />
                <p className="font-montserrat font-medium text-xl md:text-2xl py-4 md:px-8 leading-!1.2]">
                    Hemos aperturado <span className="font-bold">10 cupos por semana</span> para sesiones 1 a 1 con dueños de negocio que acaban de adquirir el libro Líder Experto.<br/><br/>
                    Estas asesorías son <span className="font-bold underline">GRATUITAS</span> por ahora y están enfocadas en ayudarte a <span className="font-bold">detectar por qué tu equipo no está vendiendo como debería…</span> y cómo solucionarlo.<br/><br/>
                    Si estás comprometido con mejorar y estás listo para aplicar lo aprendido, puedes postular aquí para tener una <span className="font-bold">sesión personalizada con Hugo Herrera</span> o con un miembro de su equipo. 
                </p>
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSf8rvCE3CI00MSuK87__8QSwGb5UJjxYIRFF3QFJY4HsFUQYQ/viewform?usp=dialog"

                    className="bg-[#0FBA72] flex items-center px-4 py-4 my-2 rounded-lg mx-auto cursor-pointer border-b-6 border-[#01A25E]"
                >
                    <button className="font-barlow-condensed font-bold text-3xl md:text-3xl lg:text-4xl text-white leading-[1.2] cursor-pointer">
                        Quiero postular a la asesoría gratuita
                    </button>
                </Link>
                <p className="font-montserrat font-medium text-xl md:text-2xl py-4 md:px-8 leading-!1.2] text-center">
                    Al hacer clic, serás redirigido a un formulario corto para conocerte mejor y asegurarnos de que esta sesión sea útil para ti.
                </p>
            </div>


            {/* Tercera parte - Preguntas frecuentes */}
            <div className="bg-black w-full p-4 py-10 flex flex-col">
                <div className="max-w-[900px] mx-auto mb-8">
                    <p className="font-inter font-bold text-white text-2xl md:text-3xl">
                        Otros líderes también se hicieron estas preguntas:
                    </p>
                </div>
                <div className="max-w-[900px] w-full mx-auto">
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            className="bg-white my-4 rounded-xl border-l-[6px] border-[#E40200] shadow-lg overflow-hidden"
                        >
                            <button
                                type="button"
                                // Cuando llamas a toggleQuestion, question.id es un número
                                onClick={() => toggleQuestion(question.id)}
                                className="w-full flex items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#E40200]/70"
                                aria-expanded={openQuestionId === question.id}
                                aria-controls={`answer-${question.id}`}
                            >
                                <Image
                                    src="/subdomains/liderexperto/venta/crossIcon.jpg"
                                    alt={openQuestionId === question.id ? "Cerrar respuesta" : "Abrir respuesta"}
                                    width={80}
                                    height={80}
                                    className={`w-[27px] h-[27px] mr-2 flex-shrink-0 transition-transform duration-300 ease-in-out ${
                                        openQuestionId === question.id ? 'rotate-45' : '-rotate-0'
                                    }`}
                                />
                                <p className="flex-1 font-inter font-semibold text-xl md:text-2xl text-black leading-[1.1]">
                                    {question.question}
                                </p>
                            </button>
    
                            <div
                                id={`answer-${question.id}`}
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openQuestionId === question.id ? 'max-h-[500px]' : 'max-h-0'
                                }`}
                                aria-hidden={openQuestionId !== question.id}
                            >
                                <div className="px-4 pb-4 pt-2 text-black">
                                    <p className="font-inter font-normal text-lg md:text-2xl leading-[1.2] whitespace-pre-line">
                                        {question.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
   
        </section>
    )
}
