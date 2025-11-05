// src/components/casosDeExito/TestimoniosVideoSection.tsx
'use client';

import React from 'react';
// Asumimos que tu componente está en esta ruta. Ajústala si es necesario.
import YoutubePlayer from '@/components/ui/YoutubePlayer';

// La estructura de datos se mantiene.
type TestimonioVideo = {
    thumbnailUrl?: string;
    youtubeVideoId: string;
    resultado: string;
    cita: string;
    nombre: string;
    rol: string;
};

const testimoniosData: TestimonioVideo[] = [
    {
        youtubeVideoId: '5zIWMGWfCi0',
        resultado: 'Transformamos los desafíos de la empresa en crecimiento real',
        cita: 'La asesoría de Hugo nos dio el sistema para lograr un crecimiento que no esperábamos.',
        nombre: 'Zócima Cárdenas',
        rol: 'Fundadora de AIBR Karaz',
    },
    {
        youtubeVideoId: 'j04ENUobSQM',
        resultado: 'Multipliqué por 6 mis resultados semanales.',
        cita: 'Lo vi en mi propia vendedora, Inelda. Aplicó el sistema y los resultados fueron inmediatos.',
        nombre: 'Lenin Salvador',
        rol: 'CEO de Impulsa Inmobiliaria',
    },
    {
        youtubeVideoId: 'sF3VpXXvQNo',
        resultado: 'Vendimos 8 lotes de terreno en un solo mes.',
        cita: 'Solo el módulo de oratoria disparó las ventas y nos llenó la cartera de reservas. El método funciona.',
        nombre: 'Alex Gualpa',
        rol: 'Gerente comercial de Tribu Real State',
    },
    {
        youtubeVideoId: '1Mjpk9SkbNc',
        resultado: 'Ahora sabemos cómo manejar cualquier objeción.',
        cita: 'Esta capacitación nos dio la técnica para manejar objeciones y la estructura de un buen guion de ventas. Es fundamental para todo vendedor.',
        nombre: 'CCT Inmobiliaria',
        rol: 'Asesores de ventas',
    },
    {
        youtubeVideoId: 'VG1qwa1QZgc',
        resultado: 'Un método paso a paso para agendar, presentar y cerrar.',
        cita: 'Hugo te da el guion. Aprendí a hacer cierres efectivos y seguimientos que convierten porque su forma de enseñar es extraordinariamente clara y directa.',
        nombre: 'Mery Livias',
        rol: 'Asesora de Red Multinivel',
    },
    {
        youtubeVideoId: 'oI2jG5q49B8',
        resultado: 'La mejor inversión para el rendimiento de mi equipo.',
        cita: 'Llevamos el curso y nos ayudó muchísimo. Es una inversión directa en las herramientas y el proceso que tu equipo necesita para escalar sus resultados.',
        nombre: 'Elias Vargas',
        rol: 'Líder de Red Multinivel',
    },
    {
        youtubeVideoId: 'JOGFJRrbZZk',
        resultado: 'Nos dió soporte y guía para nuestros emprendimientos',
        cita: 'Es un excelente coach que te tiene paciencia y te enseña todo lo que un emprendedor necesita.',
        nombre: 'Cámara de Mujeres Emprendedoras y Empresarias',
        rol: 'Emprendedoras',
    },
    {
        youtubeVideoId: 'D5SPYMxdhNE',
        resultado: 'Me actualizó tecnológicamente y ahora puedo tener mi empresa en la mano',
        cita: 'Es increíble que ya pueda tener el control de mi empresa y herramientas en la palma de mi mano.',
        nombre: 'Diego Nicolalde',
        rol: 'Gerente General de Ikona Inmobiliaria',
    },
    {
        youtubeVideoId: 'lwjpIWJ7s-k',
        resultado: 'Hoy tenemos a un Ikona de antes y un Ikona del después',
        cita: 'Hoy entendemos que el mejor equipo no se contrata, sino que se construye. Gracias a Hugo por ser parte de este crecimiento.',
        nombre: 'Pamela Gaón',
        rol: 'Fundadora de Ikona Inmobiliaria',
    },
    
];

const TestimoniosVideoSection: React.FC = () => {
    return (
        <>
            <style jsx global>{`
        .simulated-fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 50;
          border-radius: 0;
        }
      `}</style>

            <section className="bg-slate-900 py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        El Sistema en el Campo de Batalla.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        No es teoría, es la aplicación en el mundo real. Escucha cómo equipos como el tuyo usan nuestra estructura para liderar conversaciones y cerrar más ventas.
                    </p>
                </div>

                {/* El Grid: Cada celda contiene un reproductor funcional y su descripción */}
                <div className="container mx-auto max-w-8xl px-4 mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {testimoniosData.map((testimonio) => (
                        <div key={testimonio.youtubeVideoId}>
                            <div className="overflow-hidden rounded-2xl shadow-xl shadow-black/30">
                                <YoutubePlayer
                                    videoId={testimonio.youtubeVideoId}
                                    thumbnailUrl={testimonio.thumbnailUrl}
                                />
                            </div>
                            <div className="text-left text-white mt-4">
                                <h3 className="text-xl lg:text-2xl font-bold leading-tight text-balance">
                                    {testimonio.resultado}
                                </h3>
                                <p className="mt-2 text-md text-lg text-slate-300 italic">
                                    &quot;{testimonio.cita}&quot;
                                </p>
                                <div className="mt-3 border-t border-slate-700 pt-3">
                                    <p className="font-semibold text-lg">{testimonio.nombre}</p>
                                    <p className="text-base text-slate-400">{testimonio.rol}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default TestimoniosVideoSection;