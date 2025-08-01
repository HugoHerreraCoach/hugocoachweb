'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';
import { useState, useRef, useEffect, CSSProperties } from 'react';

// --- Interfaces y Datos ---
interface Testimonial {
    name: string;
    role: string;
    company: string;
    image: string;
    quote: string;
}

interface CompanyLogo {
    name: string;
    path: string;
    width: number;
    height: number;
}

const testimonials: Testimonial[] = [
    {
        name: 'Abey Díaz',
        role: 'Gerente Comercial',
        company: 'Precisur',
        image: '/images/empresas/abey.jpg',
        quote: 'Implementar el sistema nos trajo un 30% más en ventas el primer mes. Por primera vez tenemos un método de trabajo que sí funciona.'
    },
    {
        name: 'Isabel Belasquez',
        role: 'Dueña',
        company: 'Belcan Inmobiliaria',
        image: '/images/empresas/isabel.jpg',
        quote: 'Las ventas no son mi fuerte, pero con esta estructura duplicamos los resultados en 2 semanas. Mi equipo ahora tiene un guion de ventas que provoca resultados.'
    },
];

const companyLogos: CompanyLogo[] = [
    { name: 'Municipalidad de Cajamarca', path: '/images/empresas/municipalidadCajamarca.png', width: 300, height: 924 },
    { name: 'Top X', path: '/images/empresas/topXLogo.png', width: 220, height: 1226 },
    { name: 'Century 21', path: '/images/empresas/century21Logo.png', width: 300, height: 696 },
    { name: 'Inclub', path: '/images/empresas/inclubLogo.png', width: 300, height: 903 },
    { name: 'Royal Prestige', path: '/images/empresas/royalLogo.png', width: 300, height: 1526 },
    { name: 'Fuxion', path: '/images/empresas/fuxionLogo.png', width: 175, height: 536 },
];

export function SocialProofSection() {
    // 1. Definimos los keyframes de la animación del marquee en una constante.
    const marqueeKeyframes = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `;

    // 2. Lógica para calcular dinámicamente la duración de la animación.
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState<string>('40s');

    useEffect(() => {
        // Solo ejecutamos esto en el cliente, donde 'marqueeRef' existe.
        if (!marqueeRef.current) return;

        const calculateDuration = () => {
            const container = marqueeRef.current;
            if (container) {
                // Velocidad constante en píxeles por segundo. ¡Puedes ajustarla!
                const speed: number = 60;
                // La animación recorre la mitad del ancho total (porque duplicamos el contenido).
                const distance: number = container.scrollWidth / 2;
                setAnimationDuration(`${distance / speed}s`);
            }
        };

        calculateDuration(); // Calculamos al montar el componente.

        // Usamos ResizeObserver para recalcular si el layout cambia (ej. rotación del móvil).
        const resizeObserver = new ResizeObserver(calculateDuration);
        resizeObserver.observe(document.body);

        // Limpiamos el observer al desmontar el componente para evitar memory leaks.
        return () => resizeObserver.disconnect();
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar.

    return (
        <>
            {/* Inyectamos los keyframes en el head del documento */}
            <style>{marqueeKeyframes}</style>

            <section className="w-full text-white py-20 sm:py-28 overflow-hidden bg-gradient-to-t from-black to-slate-900 bg-fixed">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="text-center">
                        <Quote className="mx-auto h-12 w-12 text-[#0a4afc] mb-4" aria-hidden="true" />
                        <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                            El sistema funciona. Y funciona rápido.
                        </h2>
                        <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-300 mx-auto text-balance">
                            No importa si eres un gerente comercial con años en el campo o un dueño de negocio para quien las ventas son un punto débil. El resultado de implementar un sistema probado es el mismo: un aumento de ventas medible y rápido. Aquí tienes la prueba.
                        </p>
                    </div>

                    <div className="mt-10 lg:mt-16 grid grid-cols-1 gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-2">
                        {testimonials.map((testimonial) => (
                            <figure key={testimonial.name} className="bg-black/20 p-8 rounded-2xl shadow-xl border border-gray-800 flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-[#0a4afc]/50">
                                <blockquote className="text-lg lg:text-xl leading-relaxed text-slate-200 flex-grow">
                                    <p className="italic">
                                        “{testimonial.quote}”
                                    </p>
                                </blockquote>
                                <figcaption className="mt-8 flex items-center gap-x-4">
                                    <Image
                                        className="h-20 w-20 rounded-full object-cover border-2 border-[#0a4afc]"
                                        src={testimonial.image}
                                        alt={`Foto de ${testimonial.name}`}
                                        width={80} // Coincide con h-20 w-20
                                        height={80} // Coincide con h-20 w-20
                                    />
                                    <div>
                                        <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                                        <div className="text-slate-400 text-sm">{`${testimonial.role}, ${testimonial.company}`}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    <div className="mt-16 lg:mt-24 text-center">
                        <h3 className="text-xl lg:text-3xl font-bold text-white mb-10 text-balance">
                            Empresas que han implementado mi metodología de gestión:
                        </h3>
                        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                            {/* 3. Contenedor de la animación con la ref y el estilo dinámico */}
                            <div
                                ref={marqueeRef}
                                className="flex items-center w-max" // 'w-max' es crucial para que el contenedor se expanda al tamaño de su contenido
                                style={{ animation: `marquee ${animationDuration} linear infinite` } as CSSProperties}
                            >
                                {/* Duplicamos los logos para un bucle infinito y fluido */}
                                {[...companyLogos, ...companyLogos].map((logo, index) => (
                                    <div key={`${logo.name}-${index}`} className="mx-8 flex-shrink-0">
                                        <Image
                                            className="max-h-[70px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                                            src={logo.path}
                                            alt={logo.name}
                                            width={logo.width}
                                            height={logo.height}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}