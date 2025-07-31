// src/components/casosDeExito/LiderExpertoSection.tsx
import React from 'react';
import Image from 'next/image';
import YoutubePlayer from '@/components/ui/YoutubePlayer'; // Reutilizamos tu sistema de video

// 1. Estructura de datos flexible para manejar tanto videos como imágenes.
type LiderExpertoPrueba = {
    type: 'video' | 'image';
    id: string; // Usaremos el videoId de YouTube o un nombre de archivo para la key
    imageUrl?: string; // Para las fotos y los thumbnails de video
    youtubeVideoId?: string;
    cita: string;
    nombre: string;
    rol: string;
};

// 2. Centralizamos los 7 activos de prueba para este producto.
const pruebasLiderExperto: LiderExpertoPrueba[] = [
    {
        type: 'video',
        id: 'VIDEO_ID_1', // Reemplaza
        youtubeVideoId: 'VIDEO_ID_1',
        cita: 'La herramienta que necesitaba para estandarizar el proceso de mi equipo. Por fin hablamos el mismo idioma.',
        nombre: 'Gerente Comercial',
        rol: 'Empresa de Tecnología',
    },
    {
        type: 'image',
        id: 'foto-lider-1.jpg', // Reemplaza
        imageUrl: '/images/casos-de-exito/lider-experto/foto1.jpg', // Reemplaza
        cita: 'Un manual directo, sin adornos. Lo implementamos y vimos un cambio en la estructura de las reuniones de venta.',
        nombre: 'Dueña de Negocio',
        rol: 'Agencia de Marketing',
    },
    {
        type: 'video',
        id: 'VIDEO_ID_2',
        youtubeVideoId: 'VIDEO_ID_2',
        cita: 'Compré el libro para mí y terminé comprándolo para mis 10 supervisores. Material 100% aplicable.',
        nombre: 'Jefe de Ventas',
        rol: 'Sector Industrial',
    },
    // ... Completa con tus 4 activos restantes (2 videos, 2 fotos)
];

const LiderExpertoSection: React.FC = () => {
    return (
        <section className="bg-black py-20 lg:py-28">
            <div className="container mx-auto max-w-7xl px-4 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                    Líderes que Construyen Equipos de Élite
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto text-balance">
                    Un buen líder no tiene carisma, tiene un sistema. Aquí, la prueba de cómo el manual &quot;Líder Experto&quot; se convierte en la herramienta para construir equipos que venden más y mejor.
                </p>
            </div>

            <div className="container mx-auto max-w-7xl px-4 mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {pruebasLiderExperto.map((prueba) => (
                    <div key={prueba.id}>
                        <div className="overflow-hidden rounded-2xl shadow-xl shadow-black/30">
                            {prueba.type === 'video' && prueba.youtubeVideoId ? (
                                <YoutubePlayer
                                    videoId={prueba.youtubeVideoId}
                                    thumbnailUrl={prueba.imageUrl}
                                />
                            ) : (
                                <Image
                                    src={prueba.imageUrl || '/images/placeholder.jpg'}
                                    alt={`Prueba del libro 'Líder Experto' por ${prueba.nombre}`}
                                    width={500}
                                    height={500}
                                    className="w-full h-auto object-cover aspect-[4/3]"
                                />
                            )}
                        </div>
                        <div className="text-left text-white mt-4 bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                            <blockquote className="text-md text-slate-300 italic leading-snug">
                                &quot;{prueba.cita}&quot;
                            </blockquote>
                            <div className="mt-3 border-t border-slate-700 pt-3">
                                <p className="font-semibold">{prueba.nombre}</p>
                                <p className="text-sm text-slate-400">{prueba.rol}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LiderExpertoSection;