'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- Interfaces y Datos ---
interface Testimonial {
    quote: string;
    name: string;
    role: string;
    imageUrl: string;
}

interface CompanyLogo {
    name: string;
    src: string;
}

// Datos de los testimonios.
const testimonials: Testimonial[] = [
    {
        quote: "Hugo es directo y va al grano. La técnica que me enseñó para responder al 'lo voy a pensar' fue brutal. La primera vez que la usé, cerré una venta de $1,500 que normalmente habría dejado ir. Solo con eso, el programa se pagó solo.",
        name: "Arnold Gallardo",
        role: "Emprendedor digital",
        imageUrl: "/images/coaching/arnold.jpg", 
    },
    {
        quote: "La mentoría de Hugo fue un antes y un después. Yo siempre dudaba en cobrar lo que valía mi trabajo. Hugo me enseñó a comunicar el valor de mi arte. El resultado fue que pude lanzar mi nuevo servicio premium y llené todas las plazas en la primera semana, facturando más que en todo el mes anterior.",
        name: "Sindy Castillo Vera",
        role: "Fundadora de Nails Art",
        imageUrl: "/images/coaching/sindy.jpg", 
    },
];

// Lista de logos de empresas.
const companyLogos: CompanyLogo[] = [
    { name: 'Century 21', src: '/images/empresas/century21Logo.png' },
    { name: 'Inclub', src: '/images/empresas/inclubLogo.png' },
    { name: 'Fuxion', src: '/images/empresas/fuxionLogo.png' },
    { name: 'Royal Prestige', src: '/images/empresas/royalLogo.png' },
    { name: 'TopX', src: '/images/empresas/topXLogo.png' },
    { name: 'Municipalidad de Cajamarca', src: '/images/empresas/municipalidadCajamarca.png' },
];

export default function SocialProofSection() {
    // 1. Definimos los keyframes de la animación del marquee.
    const marqueeKeyframes = `
      @keyframes marqueeLocal {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
    `;

    // 2. Lógica para calcular dinámicamente la duración de la animación.
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [animationDuration, setAnimationDuration] = useState<string>('45s');

    useEffect(() => {
        if (!marqueeRef.current) return;

        const calculateDuration = () => {
            const container = marqueeRef.current;
            if (container) {
                const speed = 55; // Velocidad en píxeles por segundo (ajustable).
                const distance = container.scrollWidth / 2; // La animación recorre la mitad del ancho total.
                setAnimationDuration(`${distance / speed}s`);
            }
        };

        calculateDuration(); // Calcular al montar el componente.

        // Usamos ResizeObserver para recalcular si el layout cambia.
        const resizeObserver = new ResizeObserver(calculateDuration);
        resizeObserver.observe(document.body);

        return () => resizeObserver.disconnect();
    }, []);


    return (
        <>
            {/* Inyectamos los keyframes en el DOM */}
            <style>{marqueeKeyframes}</style>

            <section className="bg-slate-900 text-white py-20 lg:py-28">
                <div className="container mx-auto max-w-6xl px-4">
                    {/* Encabezado de la sección */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight lg:text-5xl text-balance">
                            Mi sistema no promete. Produce resultados.
                        </h2>
                    </div>

                    {/* Contenedor de los testimonios (cuadrícula simple) */}
                    <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                        {testimonials.map((testimonial) => (
                            <figure key={testimonial.name} className="flex flex-col rounded-2xl bg-black/20 p-8 ring-1 ring-white/10">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                </div>
                                <blockquote className="flex-grow text-lg leading-relaxed text-slate-300">
                                    <p>&quot;{testimonial.quote}&quot;</p>
                                </blockquote>
                                <figcaption className="mt-8 flex items-center gap-4">
                                    <Image className="h-14 w-14 rounded-full object-cover" src={testimonial.imageUrl} alt={`Foto de ${testimonial.name}`} width={56} height={56} />
                                    <div>
                                        <div className="font-semibold text-white">{testimonial.name}</div>
                                        <div className="text-slate-400">{testimonial.role}</div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    {/* Sección de logos de empresas con animación marquee */}
                    <div className="pt-12 mb-8 text-center">
                        <h3 className="text-xl lg:text-2xl font-semibold text-slate-400 text-balance">
                            Vendedores de estas empresas ya usan mi sistema para cerrar más:
                        </h3>
                        <div className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                            {/* 3. Aplicamos la animación con duración dinámica. */}
                            <div
                                ref={marqueeRef}
                                className="flex"
                                style={{ animation: `marqueeLocal ${animationDuration} linear infinite` }}
                            >
                                {/* Duplicamos los logos para un bucle infinito y fluido */}
                                {[...companyLogos, ...companyLogos].map((logo, index) => (
                                    <div key={`${logo.name}-${index}`} className="mx-8 flex-shrink-0">
                                        <Image
                                            src={logo.src}
                                            alt={`Logo de ${logo.name}`}
                                            className="h-10 w-auto object-contain lg:h-12"
                                            width={140}
                                            height={48}
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
};