"use client";

import Image from "next/image";
import { useState } from 'react'; 

const questions = [
    {
        id: 1,
        question: "¿El libro es físico o digital?",
        answer: "Es un libro físico, impreso y enviado a la puerta de tu casa u oficina. \n\nNo es un PDF ni un curso camuflado. Es una herramienta que vas a subrayar, revisar con tu equipo y tener siempre a la mano.\n\nPorque un buen líder se apoya en sistemas, no solo en ideas."
    },
    {
        id: 2,
        question: "¿Cuánto demora en llegar?",
        answer: "Procesamos el pedido en menos de 24 horas.\n\nEl tiempo de entrega va de 2 a 5 días hábiles según tu ciudad.\n\nApenas el libro sea despachado, te lo notificaremos."
    },
    {
        id: 3,
        question: "¿El contenido es aplicable o solo teoría?",
        answer: "Cada página está pensada para usarse, no para decorar tu estantería.\n\nLo que aprendes lo puedes aplicar desde el primer capítulo, y los bonos te dan todo lo necesario para ejecutar sin depender de nadie."
    },
    {
        id: 4,
        question: "¿De verdad solo pago el envío? ¿No hay nada más?",
        answer: "Sí. Solo S/19 para cubrir el envío hasta tu puerta.\n\nNo hay suscripciones, cobros escondidos ni letra chica. Recibes el libro completo, con todos los bonos incluidos, sin pagar nada más.\n\nEs una inversión mínima para el impacto que puede generar en tu equipo."
    },
    {
        id: 5,
        question: "¿Y si no me funciona?",
        answer: "Te devuelvo el 100% de tu inversión. Sin preguntas. No tienes que devolver el libro, ni justificar nada.\n\nPrefiero que tengas confianza total, a que te quedes con la duda."
    },
    {
        id: 6,
        question: "¿Los bonos también vienen incluidos?",
        answer: "Sí. Los 5 bonos están incluidos en esta oferta: Scripts de ventas, Plantillas de seguimiento, Mapa de objeciones, Guía de preguntas y Radiografía comercial.\n\nTodo lo necesario para convertir el contenido del libro en acción real."
    },
    {
        id: 7,
        question: "¿Y si aún no tengo equipo de ventas?",
        answer: "No importa si ya tienes un equipo, estás por construir uno desde cero o estás considerando reemplazar a los vendedores que hoy tienes. Este libro te será útil en cualquiera de esos escenarios.\n\nTe muestra cómo ordenar lo que ya tienes, cómo formar un equipo sólido desde la base, y cómo tomar decisiones estratégicas si estás evaluando hacer cambios."
    },
    {
        id: 8,
        question: "¿Y si no soy un experto en ventas?",
        answer: "No necesitas serlo. Este libro no está pensado para que tú vendas más, sino para que logres que tu equipo venda más.\n\nSi tú lideras personas, este libro es para ti."
    },
];

export default function QuestionsSection() {
    // El estado openQuestionId puede ser un número o null
    const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

    // Especificamos que 'id' es de tipo 'number'
    const toggleQuestion = (id: number) => {
        if (openQuestionId === id) {
            setOpenQuestionId(null);
        } else {
            setOpenQuestionId(id);
        }
    };

    return (
        <section className="bg-black p-4 py-10 flex flex-col">
            <div className="max-w-[900px] mx-auto mb-8">
                <p className="font-inter font-bold text-white text-2xl md:text-3xl">
                    Otros líderes también se hicieron estas preguntas:
                </p>
            </div>
            <div className="max-w-[900px] mx-auto">
                {questions.map((question) => (
                    <div
                        key={question.id}
                        className="bg-white my-4 rounded-xl border-l-[6px] border-[#E40200] shadow-lg overflow-hidden"
                    >
                        <button
                            type="button"
                            // Cuando llamas a toggleQuestion, question.id es un número
                            onClick={() => toggleQuestion(question.id)}
                            className="w-full flex items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#E40200]/70 cursor-pointer"
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
                            <p className="flex-1 font-inter font-semibold text-xl md:text-2xl text-black leading-[1.2]">
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
                                <p className="font-inter font-normal text-xl md:text-2xl leading-[1.2] whitespace-pre-line">
                                    {question.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a 
                className="bg-[#2375ED] hover:bg-blue-600 p-4 rounded-xl mx-auto text-center my-4 mb-8 col-span-3 text-white font-barlow font-extrabold text-2xl md:text-3xl leading-[1]"
                href="#form"
            >
                ¡OBTENER UNA COPIA GRATUITA! <br />
                <span className="font-barlow-condensed font-normal text-lg">¡Sí! ¡Quiero este Libro GRATIS!</span>
            </a>
        </section>
    );
}