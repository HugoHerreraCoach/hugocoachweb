// src/components/casosDeExito/EscalaAutoridadSection.tsx
import React from 'react';
import Image from 'next/image';

// 1. Estructura de datos para cada tipo de prueba
type EventoRecord = {
    imageUrl: string;
    asistentes: string;
    nombre: string;
    ciudad: string;
    sello: string;
};

type Mentor = {
    imageUrl: string;
    nombre: string;
    credencial: string;
};

// 2. Centralizamos los datos para fácil edición
const eventosData: EventoRecord[] = [
    {
        imageUrl: '/images/casos-de-exito/eventos/arequipa.jpg', // Reemplaza
        asistentes: '4,000',
        nombre: 'Negocios Inquebrantables',
        ciudad: 'Arequipa',
        sello: 'El Evento Educativo de Pago Más Grande del Perú',
    },
    {
        imageUrl: '/images/casos-de-exito/eventos/cajamarca.jpg', // Reemplaza
        asistentes: '2,000',
        nombre: 'Construye tu Riqueza',
        ciudad: 'Cajamarca',
        sello: 'Récord de Asistencia Regional',
    },
    {
        imageUrl: '/images/casos-de-exito/eventos/jaen.jpg', // Reemplaza
        asistentes: '500',
        nombre: 'Ventas y Persuasión',
        ciudad: 'Jaén',
        sello: 'Capacidad Total y Récord Local',
    },
];

const mentoresData: Mentor[] = [
    // Añade tus 5 mentores aquí
    { imageUrl: '/images/casos-de-exito/mentores/mentor1.jpg', nombre: 'Mentor Reconocido 1', credencial: 'Estratega de Negocios' },
    { imageUrl: '/images/casos-de-exito/mentores/mentor2.jpg', nombre: 'Mentor Reconocido 2', credencial: 'Experto en Marketing' },
    // ... etc.
];

const empresasData = [ // Simplemente un array de rutas de imágenes
    '/images/casos-de-exito/empresas/empresa1.jpg',
    '/images/casos-de-exito/empresas/empresa2.jpg',
    '/images/casos-de-exito/empresas/empresa3.jpg',
    '/images/casos-de-exito/empresas/empresa4.jpg',
];

const EscalaAutoridadSection: React.FC = () => {
    return (
        <section className="bg-black text-white py-20 lg:py-28">
            <div className="container mx-auto max-w-7xl px-4">
                {/* --- Sub-sección 1: Eventos Récord --- */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
                        Récords de Asistencia: La Demanda por un Sistema Real
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto text-balance">
                        Cuando un método es probado, el mercado responde. No organizamos charlas, construimos los eventos educativos de pago más grandes del país. Cifras, no opiniones.
                    </p>
                </div>

                <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {eventosData.map((evento) => (
                        <div key={evento.nombre} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl group">
                            <Image src={evento.imageUrl} alt={`Evento ${evento.nombre} en ${evento.ciudad}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-left">
                                <h3 className="text-6xl font-black tracking-tighter">{evento.asistentes}</h3>
                                <p className="text-xl font-bold leading-tight">Asistentes en {evento.ciudad}</p>
                                <div className="mt-4 border-t-2 border-[#0a4afc] w-1/4"></div>
                                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-blue-400">{evento.sello}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Sub-sección 2 y 3: Empresas y Mentores --- */}
                <div className="mt-20 lg:mt-28 text-center">
                    <h3 className="text-3xl font-bold text-white text-balance">Instalado en Empresas, Forjado con los Mejores</h3>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-lg text-slate-300 text-center mb-4">Sistemas probados en el campo de batalla real:</p>
                        <div className="grid grid-cols-2 gap-4">
                            {empresasData.map((logo, i) => (
                                <div key={i} className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-center">
                                    <Image src={logo} alt={`Cliente empresarial ${i + 1}`} width={400} height={200} className="w-full h-auto object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-lg text-slate-300 text-center mb-4">Un método construido sobre hombros de gigantes:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {mentoresData.map((mentor) => (
                                <div key={mentor.nombre} className="text-center">
                                    <Image src={mentor.imageUrl} alt={`Hugo Herrera con ${mentor.nombre}`} width={120} height={120} className="w-28 h-28 rounded-full object-cover mx-auto border-2 border-slate-600" />
                                    <p className="mt-2 text-sm font-semibold">{mentor.nombre}</p>
                                    <p className="text-xs text-slate-400">{mentor.credencial}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Sub-sección 4: Comunidad --- */}
                <div className="mt-20 lg:mt-28 max-w-3xl mx-auto text-center bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                    <h3 className="text-7xl font-black tracking-tighter text-white">+300,000</h3>
                    <p className="mt-2 text-2xl font-bold text-blue-400">Vendedores y Líderes en Nuestra Comunidad</p>
                    <p className="mt-4 text-lg text-slate-300">Más que seguidores, son profesionales que buscan un sistema que funcione. Los números no mienten.</p>
                </div>

            </div>
        </section>
    );
};

export default EscalaAutoridadSection;