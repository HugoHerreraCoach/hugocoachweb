// app/components/historia/PuntoDeInflexion.tsx
'use client';

import Image from "next/image";
import { useState, useEffect, type ReactNode } from 'react';
import { useIntersectionObserver } from "@/app/hooks/useIntersectionObserver"; // Asegúrate que la ruta sea correcta

// --- Componente de Texto con Opacidad Animada ---
interface AnimatedOpacityTextProps {
    children: ReactNode;
}

const AnimatedOpacityText = ({ children }: AnimatedOpacityTextProps) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
    return (
        <div
            ref={ref}
            className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {children}
        </div>
    );
};

// --- Componente de Texto con Efecto Máquina de Escribir ---
interface TypewriterProps {
    text: string;
    className?: string;
}

const AnimatedTypewriterText = ({ text, className }: TypewriterProps) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
    const [displayedText, setDisplayedText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(true);

    useEffect(() => {
        if (isVisible) {
            let i = 0;
            const intervalId = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(intervalId);
                    setIsTyping(false); // Detiene el parpadeo del cursor
                }
            }, 50); // Velocidad de escritura en milisegundos

            return () => clearInterval(intervalId); // Limpieza
        }
    }, [isVisible, text]);

    return (
        <div ref={ref} className={className}>
            <p className="text-xl lg:text-3xl font-semibold italic text-white leading-snug">
                &quot;{displayedText}
                {isTyping && (
                    <span className="inline-block w-[2px] h-[1em] ml-1 bg-white animate-blink" aria-hidden="true"></span>
                )}
                &quot;
            </p>
        </div>
    );
};


export const PuntoDeInflexion = () => {
    return (
        <section className="bg-gradient-to-tr from-[#0F172A] to-[#000000] text-white py-16 lg:py-24">
            <div className="px-4 lg:px-6 max-w-7xl mx-auto">
                {/* El Título */}
                <h2 className="text-3xl lg:text-5xl font-bold text-balance text-center">
                    Mi mayor fracaso profesional me mostró el verdadero secreto.
                </h2>

                {/* --- SECCIÓN INTRODUCTORIA CON LAYOUT DIVIDIDO --- */}
                <div className="mt-8 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">

                    {/* Columna Izquierda: Imagen */}
                    <div className="w-full">
                        <Image
                            src="/images/racser3.jpg"
                            alt="Hugo Herrera en una sesión de coaching de ventas"
                            width={1000}
                            height={750}
                            className="rounded-xl shadow-lg mx-auto w-full max-w-sm lg:max-w-full"
                        />
                    </div>

                    {/* Columna Derecha: Texto */}
                    <div className="text-center lg:text-left">
                        <p className="text-xl lg:text-2xl text-gray-200 text-balance leading-[1.4]">
                            Me lancé a entrenar equipos comerciales y, al principio, los resultados eran increíbles. Los equipos salían motivados y las ventas subían... <span className="font-semibold">pero solo por unas semanas.</span>
                            <br /><br />
                            Creí que había encontrado la fórmula, pero estaba equivocado. Poco después, siempre recibía la misma llamada:
                        </p>
                        {/* --- EFECTO DE OPACIDAD APLICADO AQUÍ --- */}
                        <AnimatedOpacityText>
                            <p className="mt-6 text-2xl font-bold lg:text-3xl text-blue-500 italic text-balance">
                                &quot;Hugo, volvimos a lo de antes. La energía del equipo se perdió.&quot;
                            </p>
                        </AnimatedOpacityText>
                    </div>
                </div>


                {/* --- SECCIÓN DE MAYOR FRUSTRACIÓN --- */}
                <div className="text-center mt-8 lg:mt-16">
                    <p className="text-xl lg:text-2xl text-gray-200 mx-auto text-balance leading-[1.4] max-w-4xl">
                        Mi frustración llegó a su límite con una empresa de 70 vendedores. Después de dar mi mejor entrenamiento, el dueño me dijo la frase que lo cambió todo:
                    </p>

                    {/* --- EFECTO DE MÁQUINA DE ESCRIBIR APLICADO AQUÍ --- */}
                    <AnimatedTypewriterText
                        text="Hugo, aprecio el esfuerzo, pero las ventas siguen exactamente igual."
                        className="max-w-2xl mx-auto mt-8 lg:mt-10 bg-[#0a4afc]/30 border border-[#0a4afc] rounded-xl p-6 lg:p-8 shadow-lg shadow-blue-500/10"
                    />

                </div>

                {/* --- SECCIÓN DE TARJETAS --- */}
                <div className="mt-8 lg:mt-12 text-left max-w-7xl mx-auto">
                    <h3 className="text-2xl lg:text-3xl text-white font-bold text-center text-balance">
                        Ese golpe me dolió, pero no me detuvo.
                    </h3>
                    <p className="mt-4 text-xl lg:text-2xl text-gray-200 leading-[1.4] text-center text-balance max-w-4xl mx-auto">
                        En lugar de culpar a los vendedores, hice algo diferente: <span className="font-semibold text-white">me fui al campo para ver su trabajo de cerca.</span>
                    </p>

                    {/* Contenedor de las tarjetas con Grid Layout */}
                    <div className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                        {/* Tarjeta 1 */}
                        <div className="flex flex-col bg-gradient-to-tr from-[#1E3A8A]/60 to-[#0F172A]/60 rounded-xl overflow-hidden">
                            <Image
                                src="/images/racser1.jpg"
                                alt="Observando a los vendedores en la calle"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-6 pt-4 flex-1">
                                <p className="text-white font-bold leading-snug text-xl lg:text-2xl">1. Acompañé a los vendedores en sus rutas.</p>
                                <p className="mt-2 text-lg text-gray-200 leading-[1.4]">Observé cómo hablaban con los clientes y manejaban las objeciones. Vi que algunos aplicaban mis técnicas, pero otros volvían a sus viejos hábitos.</p>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="flex flex-col bg-gradient-to-tr from-[#1E3A8A]/60 to-[#0F172A]/60  rounded-xl overflow-hidden">
                            <Image
                                src="/images/racser2.jpg"
                                alt="Asistiendo a reuniones de equipo"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-6 pt-4 flex-1">
                                <p className="text-white font-bold leading-snug text-xl lg:text-2xl">2. Asistí a sus reuniones de equipo.</p>
                                <p className="mt-2 text-lg text-gray-200 leading-relaxed">Escuché cómo los gerentes los dirigían, qué métricas revisaban y, más importante, qué información clave estaban ignorando.</p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 lg:mt-12 text-xl lg:text-2xl text-gray-300 leading-[1.4] text-center max-w-4xl mx-auto">
                        <span className="font-semibold text-white text-2xl lg:text-3xl">Fue en esas reuniones donde lo entendí todo.</span><br/><br/>
                        Noté una desconexión total entre los líderes y el equipo de ventas. La comunicación se limitaba a resolver los problemas urgentes del día, pero sin un plan o dirección. No había una estructura de trabajo ni un seguimiento real.
                    </p>
                </div>

                {/* La Gran Epifanía (se mantiene) */}
                <div className="text-center">
                    <p className="mt-8 lg:mt-12 text-3xl lg:text-4xl font-barlow-condensed text-blue-500 font-black uppercase tracking-wide text-balance">
                        El problema nunca fue la habilidad del vendedor.<br /> <span className="text-white">¡Era la ausencia de un sistema que lo respaldara!</span>
                    </p>
                </div>
            </div>
        </section>
    );
};