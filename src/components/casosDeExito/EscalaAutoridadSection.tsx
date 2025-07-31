// app/components/casosDeExito/EscalaAutoridadSection.tsx
import React from 'react';
import Image from 'next/image';
import { Briefcase, GraduationCap, Youtube, Instagram, Facebook, Linkedin } from 'lucide-react';


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
    Icono: React.ElementType;
    width: number;
    height: number;
}

interface StatComunidad {
    plataforma: string;
    valor: string;
    Icono: React.ElementType;
}


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


const pruebaSocialData: PruebaSocial[] = [
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/jurgenKlaric.jpg',
        titulo: 'Sesión Estratégica con Jürgen Klarić',
        descripcion: 'Decodificando la ciencia de la venta. No se trata de qué decir, sino de cómo el cerebro del cliente procesa la decisión. Un sistema para vender a la mente.',
        Icono: GraduationCap,
        width: 1080,
        height: 1080,
    },
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/alexDey.jpg',
        titulo: 'Intercambio de Tácticas con Alex Dey',
        descripcion: 'Del maestro de la motivación con disciplina. Aquí no hay "pensar fuera de la caja", hay un guion probado y una estructura de cierre que funciona. Pura ejecución.',
        Icono: GraduationCap,
        width: 560,
        height: 560,
    },
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/margaritaPasos.jpg',
        titulo: 'Alineando Métodos con Margarita Pasos',
        descripcion: 'La pasión es un motor, pero necesita un chasis. Con Margarita, nos enfocamos en transformar la energía en un proceso de ventas medible. Menos emoción, más conversión.',
        Icono: GraduationCap,
        width: 540,
        height: 540,
    },
    {
        tipo: 'mentor',
        imageUrl: '/images/casosdeexito/germanKutnick.jpg',
        titulo: 'Mastermind con Germán Kuttnick',
        descripcion: 'El impacto se construye, no se improvisa. Estructurando mensajes que no solo motivan, sino que provocan acción inmediata. Estrategia pura para cerrar ventas desde el escenario.',
        Icono: GraduationCap,
        width: 1080,
        height: 1079,
    },
    
    // --- EMPRESAS (DATOS DE EJEMPLO, MANTENIDOS) ---
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/cctInmobiliaria.jpg', 
        titulo: 'Implementando el Cierre Ascendente en CCT',
        descripcion: 'El cierre no es un arte, es una ciencia. Aquí, instalando un guion de cierre probado en el equipo de una de las inmobiliarias líderes de la región.',
        Icono: Briefcase,
        width: 1080,
        height: 864,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/dabconPeru.jpg',
        titulo: 'Taller de Ventas para Dabcon Perú',
        descripcion: 'Construyendo un equipo de alto rendimiento. Foco en el sistema, no en la improvisación. Resultados medibles desde el primer día.',
        Icono: Briefcase,
        width: 1080,
        height: 864,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/unialfaInmobiliaria.jpg',
        titulo: 'Entrenamiento para Unialfa Inmobiliaria',
        descripcion: 'Llevando al equipo del caos a la estructura. Definimos un proceso comercial claro para duplicar la tasa de conversión de visitas a cierres.',
        Icono: Briefcase,
        width: 1080,
        height: 864,
    },
    {
        tipo: 'empresa',
        imageUrl: '/images/casosdeexito/tallerAyni.jpg',
        titulo: 'Sesión de Estrategia Comercial con Ayni',
        descripcion: 'No importa el tamaño del equipo, importa la claridad del proceso. Afilando el guion de ventas para escalar las operaciones con un método predecible.',
        Icono: Briefcase,
        width: 1080,
        height: 864,
    },
];

const comunidadStatsData: StatComunidad[] = [
    { plataforma: 'Instagram', valor: '120k+', Icono: Instagram },
    { plataforma: 'YouTube', valor: '95k+', Icono: Youtube },
    { plataforma: 'Facebook', valor: '70k+', Icono: Facebook },
    { plataforma: 'LinkedIn', valor: '15k+', Icono: Linkedin },
];


const EscalaAutoridadSection: React.FC = () => {
    return (
        <section className="bg-black text-white py-20 lg:py-28">
            <div className="container mx-auto max-w-7xl px-4">

                {/* --- Sub-sección 1: Eventos Récord --- */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-balance">
                        Las Cifras que Nadie Más Puede Mostrar
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto text-balance">
                        No hablamos de salones, hablamos de estadios llenos. La prueba irrefutable de la demanda por nuestros eventos a una escala nunca antes vista.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventosData.map((evento) => (
                        <div key={evento.nombre} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl group">
                            <Image
                                src={evento.imageUrl}
                                alt={`Evento ${evento.nombre} en ${evento.ciudad}`}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
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

                {/* --- Sub-sección 2: Empresas y Mentores (Nuevo Diseño) --- */}
                <div className="mt-24 lg:mt-32 text-center">
                    <h3 className="text-4xl font-bold text-white text-balance">
                        El Sistema se Construye con los Mejores
                    </h3>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto text-balance">
                        Mi sistema está validado con más de 120 empresas y ha sido afilado junto a los referentes que definen las reglas del juego en ventas y liderazgo.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pruebaSocialData.map((prueba) => (
                        <div key={prueba.titulo} className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-blue-500/50 transition-colors duration-300">
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={prueba.imageUrl}
                                    alt={prueba.titulo}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            </div>
                            <div className="flex-grow flex flex-col p-4">
                                <div className="flex items-center gap-2">
                                    <prueba.Icono className="w-5 h-5 text-blue-400" />
                                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                                        {prueba.tipo === 'empresa' ? 'Empresas' : 'Mentores'}
                                    </p>
                                </div>
                                <h4 className="mt-2 text-lg font-bold text-white">{prueba.titulo}</h4>
                                <p className="mt-1 text-sm text-slate-400 flex-grow">{prueba.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Sub-sección 3: Comunidad (Nuevo Diseño) --- */}
                <div className="mt-24 lg:mt-32 max-w-5xl mx-auto text-center">
                    <h3 className="text-4xl font-bold text-white text-balance">
                        Una Comunidad de Más de 300,000 Profesionales
                    </h3>
                    <p className="mt-6 text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto text-balance">
                        No son seguidores, son líderes y vendedores que aplican activamente estos sistemas para crecer. Los números son la consecuencia de los resultados.
                    </p>
                    <div className="mt-16 bg-slate-900/70 border border-slate-800 rounded-2xl p-8 lg:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {comunidadStatsData.map((stat) => (
                                <div key={stat.plataforma} className="flex flex-col items-center text-center">
                                    <stat.Icono className="w-10 h-10 text-slate-400 mb-3" />
                                    <p className="text-4xl lg:text-5xl font-black tracking-tighter text-white">{stat.valor}</p>
                                    <p className="text-base font-semibold text-slate-300">{stat.plataforma}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-center text-slate-500 text-sm">
                            Suma total de comunidad en plataformas principales. Cifras verificables públicamente.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EscalaAutoridadSection;