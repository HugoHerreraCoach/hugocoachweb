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
        id: 'ZbJ70_NS2cI',
        youtubeVideoId: 'ZbJ70_NS2cI',
        cita: 'Hugo Herrera es un maestro. Su libro te entrega el material que necesitas para acelerar tu crecimiento como líder.',
        nombre: 'Germán Kuttnick',
        rol: 'Conferencista Internacional y Autor Best Seller',
    },
    {
        type: 'video',
        id: 'w2VLU47PoMU',
        youtubeVideoId: 'w2VLU47PoMU',
        cita: 'Hugo me convocó a su evento con Brian Tracy y Margarita Pasos. Pura ejecución. Un crack.',
        nombre: 'Cristian Arens',
        rol: 'Inversionista, Emprendedor y Autor Best Seller',
    },
    {
        type: 'video',
        id: '-EAwx1LrF9I',
        youtubeVideoId: '-EAwx1LrF9I',
        cita: 'Una sola decisión lo cambió todo. El sistema de Hugo me dio claridad y llevó mi negocio al siguiente nivel.',
        nombre: 'Sindy Castillo',
        rol: 'Empresaria y Fundadora, Nails Art',
    },
];

const LiderExpertoSection: React.FC = () => {
    return (
        <section className="bg-black py-20 lg:py-28">
            <div className="container mx-auto max-w-8xl px-4 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                    Un Buen Líder no Nace, se Construye.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                    Referentes del más alto nivel y empresarios de campo te muestran el antes y el después de aplicar &quot;Líder Experto&quot;.
                </p>
            </div>

            <div className="container mx-auto max-w-8xl px-4 mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
                            <blockquote className="text-xl text-slate-300 italic leading-snug">
                                &quot;{prueba.cita}&quot;
                            </blockquote>
                            <div className="mt-3 border-t border-slate-700 pt-3">
                                <p className="font-semibold text-xl">{prueba.nombre}</p>
                                <p className="text-lg text-slate-400">{prueba.rol}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LiderExpertoSection;