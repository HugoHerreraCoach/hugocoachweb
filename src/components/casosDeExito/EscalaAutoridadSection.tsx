// app/components/casosDeExito/EscalaAutoridadSection.tsx
import React from 'react';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

// --- TIPOS DE DATOS (Interfaces y Tipos) ---

interface EventoRecord {
    imageUrl: string;
    asistentes: string;
    nombre: string;
    ciudad: string;
    sello: string;
}

interface PruebaSocial {
    tipo: 'empresa' | 'mentor';
    imageUrl: string;
    titulo: string;
    descripcion: string;
    width: number;
    height: number;
}


type IconSource = React.ElementType | string;
interface SocialIconProps {
    iconSource: IconSource;
    className?: string;
}

interface SocialIconProps {
  iconSource: IconSource;
  className?: string;
}


const SocialIcon: React.FC<SocialIconProps> = ({ iconSource, className }) => {
    if (typeof iconSource === 'string') {
        return (
            <div className={`relative ${className}`}>
                <Image
                    src={iconSource}
                    alt={`Icono de ${iconSource}`}
                    fill
                    className="object-contain"
                    sizes="40px"
                />
            </div>
        );
    }

    const IconComponent = iconSource;
    return <IconComponent className={className} />;
};

interface StatComunidad {
    plataforma: string;
    valor: string;
    icon: IconSource;
}

// --- DATOS DEL COMPONENTE ---

const eventosData: EventoRecord[] = [
    {
        imageUrl: '/images/casosdeexito/arequipa.jpg',
        asistentes: '4,000',
        nombre: 'Negocios Inquebrantables',
        ciudad: 'Arequipa',
        sello: 'El Evento Educativo de Pago Más Grande del Perú',
    },
    {
        imageUrl: '/images/casosdeexito/cajamarca.jpg',
        asistentes: '2,000',
        nombre: 'Construye tu Riqueza',
        ciudad: 'Cajamarca',
        sello: 'Récord de Asistencia Regional',
    },
    {
        imageUrl: '/images/casosdeexito/jaen.jpg',
        asistentes: '500',
        nombre: 'Ventas y Persuasión',
        ciudad: 'Jaén',
        sello: 'Capacidad Total y Récord Local',
    },
];

// Los 'titulo' y 'descripcion' han sido restaurados a su versión original.
const pruebaSocialData: PruebaSocial[] = [
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/jurgenKlaric.jpg',
        titulo: 'Jürgen Klarić: Decodificando el Cierre Neuro-Científico.',
        descripcion: 'Analizando juntos el proceso cerebral de la compra. Ciencia aplicada a un guion de ventas.',
        width: 1080,
        height: 1080,
    },
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/alexDey.jpg',
        titulo: 'Alex Dey: Estructura, no Carisma.',
        descripcion: 'En el escenario y fuera de él, el foco es el mismo: el guion, la disciplina y el sistema que funcionan. Pura ejecución.',
        width: 560,
        height: 560,
    },
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/margaritaPasos.jpg',
        titulo: 'Margarita Pasos: Traduciendo la Pasión a un Proceso.',
        descripcion: 'Transformando la energía en un proceso de ventas medible. Menos emoción, más conversión.',
        width: 540,
        height: 540,
    },
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/germanKutnick.jpg',
        titulo: 'Germán Kuttnick: El Mensaje que Provoca la Acción.',
        descripcion: 'Estructurando un mensaje que no solo inspira, sino que cierra la venta desde el escenario.',
        width: 1080,
        height: 1079,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/cctInmobiliaria.jpg',
        titulo: 'CCT Inmobiliaria: Guion de Cierre Implementado.',
        descripcion: 'Instalamos un guion de cierre probado para unificar al equipo y aumentar sus ventas.',
        width: 1080,
        height: 864,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/dabconPeru.jpg',
        titulo: 'Dabcon Perú: Del Talento Individual al Sistema.',
        descripcion: 'Implementamos una rutina comercial medible. El resultado: duplicamos los indicadores clave del equipo.',
        width: 1080,
        height: 864,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/unialfaInmobiliaria.jpg',
        titulo: 'Unialfa Ecuador: Un Proceso, Resultados Predecibles.',
        descripcion: 'Definimos un proceso de ventas claro para convertir más visitas en cierres seguros.',
        width: 1080,
        height: 864,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/tallerAyni.jpg',
        titulo: 'Financiera Ayni: Proceso para Escalar.',
        descripcion: 'Creamos un método de ventas para que su crecimiento sea constante y predecible.',
        width: 1080,
        height: 864,
    },
];

const comunidadStatsData: StatComunidad[] = [
    { plataforma: 'Tiktok', valor: '280k+', icon: '/icons/tiktokIcon.png' },
    { plataforma: 'Facebook', valor: '30k+', icon: '/icons/facebookIcon.png' },
    { plataforma: 'Instagram', valor: '16k+', icon: '/icons/instagramIcon.png' },
    { plataforma: 'LinkedIn', valor: '3k+', icon: '/icons/linkedinIcon.png' },
];


const EscalaAutoridadSection: React.FC = () => {
    const mentores = pruebaSocialData.filter((p) => p.tipo === 'mentor');
    const empresas = pruebaSocialData.filter((p) => p.tipo === 'empresa');

    return (
        <section className="bg-black text-white py-20 lg:py-28">
            <div className="container mx-auto max-w-8xl px-4">

                {/* --- Sub-sección 1: Eventos Récord --- */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
                        Las Cifras que Nadie Más Puede Mostrar
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        No hablamos de salones, hablamos de estadios llenos. La prueba irrefutable de la demanda por nuestros eventos a una escala nunca antes vista.
                    </p>
                </div>
                <div className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventosData.map((evento) => (
                        <div key={evento.nombre} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl group">
                            <Image
                                src={evento.imageUrl}
                                alt={`Evento ${evento.nombre} en ${evento.ciudad}`}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-left">
                                <h3 className="text-6xl font-black tracking-tighter">{evento.asistentes}</h3>
                                <p className="text-xl font-bold leading-tight">Asistentes en {evento.ciudad}</p>
                                <div className="mt-4 border-t-2 border-[#0a4afc] w-1/4"></div>
                                <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-blue-400">{evento.sello}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Sub-sección 2: Mentores --- */}
                <div className="mt-24 lg:mt-32 text-center">
                    <h3 className="text-4xl lg:text-5xl font-bold text-white text-balance">
                        En el Escenario con los Maestros del Juego.
                    </h3>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        He compartido escenario y sesiones estratégicas con los referentes de la industria. El objetivo fue retar sus métodos para fortalecer mi propio sistema.
                    </p>
                </div>
                <div className="mt-10 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mentores.map((mentor) => (
                        <div key={mentor.titulo} className="group flex flex-col items-center text-center bg-slate-900/50 border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900">
                            <div className="relative mb-6">
                                <Image
                                    src={mentor.imageUrl}
                                    alt={mentor.titulo}
                                    width={250}
                                    height={250}
                                    className="rounded-full object-cover border-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-300"
                                />
                                {/* Ícono decorativo ajustado */}
                                <div className="absolute -bottom-2 -right-2 bg-slate-800 border-4 border-slate-900 rounded-full p-2.5 group-hover:bg-blue-950 transition-colors duration-300">
                                    <GraduationCap className="w-6 h-6 text-blue-400" />
                                </div>
                            </div>
                            <h4 className="text-xl lg:text-2xl font-bold text-white text-balance">{mentor.titulo}</h4>
                            <p className="mt-2 text-lg lg:text-xl text-slate-400 flex-grow">{mentor.descripcion}</p>
                        </div>
                    ))}
                </div>

                {/* --- Sub-sección 3: Empresas --- */}
                <div className="mt-24 lg:mt-32 text-center">
                    <h3 className="text-4xl lg:text-5xl font-bold text-white text-balance">
                        Más de 120 Empresas. Un Único Sistema Probado.
                    </h3>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        El éxito de un sistema no se mide en un solo caso, sino en su capacidad para replicarse. Esta es la prueba de que nuestro proceso genera resultados predecibles en múltiples equipos e industrias.
                    </p>
                </div>
                <div className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {empresas.map((empresa) => (
                        <div key={empresa.titulo} className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-colors duration-300">
                            <div className="relative aspect-[5/4] w-full">
                                <Image
                                    src={empresa.imageUrl}
                                    alt={empresa.titulo}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-transform duration-500 ease-in-out group-hover:scale-105"></div>
                            </div>
                            <div className="flex-grow flex flex-col p-5">
                                <h4 className="mt-3 text-xl lg:text-2xl font-bold text-white">{empresa.titulo}</h4>
                                <p className="mt-1 text-lg lg:text-xl text-slate-400 flex-grow">{empresa.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Sub-sección 4: Comunidad --- */}
                <div className="mt-24 lg:mt-32 max-w-5xl mx-auto text-center">
                    <h3 className="text-4xl lg:text-5xl font-bold text-white text-balance">
                        Un Movimiento de +300,000. No un Club de Fans.
                    </h3>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 mx-auto text-balance">
                        No siguen a una persona, siguen la promesa de un método que funciona.
                    </p>
                    <div className="mt-10 lg:mt-16 bg-slate-900/70 border border-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {comunidadStatsData.map((stat) => (
                                <div key={stat.plataforma} className="flex flex-col items-center text-center">
                                    <SocialIcon
                                        iconSource={stat.icon}
                                        className="w-10 h-10 text-slate-400 mb-3"
                                    />
                                    <p className="text-4xl lg:text-5xl font-black tracking-tighter text-white">{stat.valor}</p>
                                    <p className="text-lg lg:text-xl font-semibold text-slate-300">{stat.plataforma}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-slate-500 text-base">
                            Comunidad en plataformas principales. Cifras verificables públicamente.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EscalaAutoridadSection;