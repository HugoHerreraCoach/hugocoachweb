// src/components/casosDeExito/TestimoniosVideoSection.tsx
'use client';

import React from 'react';
// Asumimos que tu componente está en esta ruta. Ajústala si es necesario.
import YoutubePlayer from '@/components/ui/YoutubePlayer';
import { testimoniosData } from '@/lib/testimonios';




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
                        Lo que dicen los equipos que ya trabajaron conmigo.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        Escucha a empresarios, líderes y vendedores contar qué cambió en su equipo.
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