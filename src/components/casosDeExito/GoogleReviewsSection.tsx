// src/components/casosDeExito/GoogleReviewsSection.tsx


'use client';

import React, { useState } from 'react'; // AÑADIDO: useState
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import TestimonialModal from '@/components/ui/TestimonialModal'; 

type ResenaDestacada = {
    imageUrl: string;
    altText: string;
    width?: number;
    height?: number;
};

const resenasDestacadas: ResenaDestacada[] = [
    {
        imageUrl: '/images/casosdeexito/google1.jpg',
        altText: 'Testimonio destacado de un cliente satisfecho en Google',
        width: 1000,
        height: 505,
    },
    {
        imageUrl: '/images/casosdeexito/google2.jpg',
        altText: 'Reseña de 5 estrellas de un líder de equipo en Google',
        width: 1000,
        height: 524,
    },
    {
        imageUrl: '/images/casosdeexito/google3.jpg',
        altText: 'Comentario positivo sobre los resultados obtenidos tras el coaching',
        width: 1000,
        height: 351,
    },
    {
        imageUrl: '/images/casosdeexito/google4.jpg',
        altText: 'Prueba social de un evento de Hugo Herrera compartida en Google',
        width: 1000,
        height: 523,
    },
];

const GoogleReviewsSection: React.FC = () => {
    const [selectedReview, setSelectedReview] = useState<ResenaDestacada | null>(null);

    return (
        <section className="bg-slate-50 py-20 lg:py-28">
            <div className="container mx-auto max-w-8xl px-4 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                    No Creas en mi Palabra. Cree en los Datos.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-slate-600 mx-auto text-balance">
                    Un caso de éxito puede ser suerte. Dos pueden ser coincidencia. Más de 180 es la prueba irrefutable de un sistema que funciona de manera consistente.
                </p>

                <div className="mt-12 lg:mt-16">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-6xl lg:text-7xl font-bold text-slate-900">4.9</span>
                        <div className="flex flex-col items-start">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-6 w-6 lg:h-7 lg:w-7 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-lg font-semibold text-slate-600">
                                +180 Reseñas Verificadas
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
                    {resenasDestacadas.map((resena, index) => (
                        // MODIFICADO: Añadido cursor-pointer, onClick y un ligero foco para indicar interactividad.
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                            onClick={() => setSelectedReview(resena)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedReview(resena);
                                }
                            }}
                            tabIndex={0} // Hace que el div sea enfocable
                        >
                            <Image
                                src={resena.imageUrl}
                                alt={resena.altText}
                                width={resena.width}
                                height={resena.height}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-8 lg:mt-16">
                    <Link
                        href="https://www.google.com/search?q=Hugo+Herrera+Coach+Opiniones&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EwD0jM5nya9iE3X-y2aq5X2sfMZg5mwQ0sa1YSFAiKjcE78QCnqQNnweQ_rLcKaoHYX5YiPkPyxPch_M-pNmK00AOeUL-LQMDazu1R-6-W2WKwu1og%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md bg-white px-8 py-4 text-lg font-bold text-slate-800 shadow-md ring-1 ring-slate-200 transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:scale-105"
                    >
                        Ver Todas las Pruebas en Google
                    </Link>
                </div>
            </div>

            {/* AÑADIDO: Renderizado condicional del modal.
                Solo se muestra si `selectedReview` no es nulo. */}
            {selectedReview && (
                <TestimonialModal
                    review={selectedReview}
                    onClose={() => setSelectedReview(null)}
                />
            )}
        </section>
    );
};

export default GoogleReviewsSection;