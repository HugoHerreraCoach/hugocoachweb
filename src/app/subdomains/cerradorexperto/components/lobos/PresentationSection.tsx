import Image from 'next/image';
import {
    Library,
    Users,
    MessageSquareText,
    Network,
    BadgeCheck,
    Sparkles,
} from 'lucide-react';
import type { FC, ElementType } from 'react';

// 1. ESTRUCTURA DE DATOS TIPADA Y CON ICONOS ESPECÍFICOS
// Definimos un tipo estricto para cada beneficio.
type Benefit = {
    title: string;
    description: string;
    icon: ElementType; // Usamos ElementType para pasar el componente del ícono directamente.
};

// Asignamos un ícono de lucide-react a cada beneficio.
const programBenefits: Benefit[] = [
    {
        title: 'Arsenal de Ventas (+300 Lecciones)',
        description:
            'Acceso de por vida al sistema paso a paso. Consulta guiones y procesos probados en el momento exacto que los necesites.',
        icon: Library,
    },
    {
        title: 'Coaching Grupal en Vivo (1 Año)',
        description:
            'Cada 15 días, nos reunimos para darte coaching directo y entrenarte con temas de vanguardia como marketing e IA para ventas.',
        icon: Users,
    },
    {
        title: 'Soporte Directo por WhatsApp (30 Días)',
        description:
            '¿Tienes dudas o no sabes cómo manejar una objeción? Escríbeme y te doy la estructura para que tomes el control y resuelvas.',
        icon: MessageSquareText,
    },
    {
        title: 'Acceso al Círculo Interno',
        description:
            'Una comunidad privada y exclusiva para hacer networking y compartir estrategias con otros profesionales que operan con un sistema.',
        icon: Network,
    },
    {
        title: 'Certificación "Lobo de Ventas"',
        description:
            'Un certificado que valida tu dominio del sistema y te posiciona como un vendedor de alto rendimiento.',
        icon: BadgeCheck,
    },
    {
        title: 'Actualizaciones de por Vida',
        description:
            'El mercado evoluciona, tu arsenal también. Recibe todas las futuras lecciones y estrategias del sistema sin costo adicional.',
        icon: Sparkles,
    },
];

/**
 * Sección de presentación que detalla los beneficios del programa "Lobos de Ventas".
 * Utiliza un diseño de tarjetas moderno con iconografía específica para cada beneficio.
 * @returns {React.ReactElement} El componente de la sección de presentación.
 */
const PresentationSection: FC = () => {
    return (
        <section
            id="oto-presentation"
            className="bg-slate-900 text-white py-24 sm:py-32 border-t border-b border-slate-700/50"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Título y Subtítulo */}
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        El Sistema de Entrenamiento Completo
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-relaxed text-slate-300">
                        Más que un curso, es la estructura y el acompañamiento que necesitas
                        para ejecutar, dominar y mantenerte a la vanguardia en ventas.
                    </p>
                </div>

                {/* Listado de Beneficios */}
                <div className="mx-auto mt-10">
                    <h3 className="text-2xl font-bold text-center text-white mb-6 lg:mb-12">
                        Al añadir &quot;Lobos de Ventas&quot; a tu orden, recibes acceso
                        inmediato a:
                    </h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {programBenefits.map((benefit) => {
                            // Renderizamos el ícono dinámicamente
                            const Icon = benefit.icon;
                            return (
                                // 2. DISEÑO DE TARJETA PREMIUM CON BORDE GRADIENTE Y EFECTO HOVER
                                <div
                                    key={benefit.title}
                                    className="rounded-xl p-px bg-gradient-to-br from-slate-700 via-slate-800 to-slate-700 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-teal-400/20"
                                >
                                    <div className="bg-slate-800/80 rounded-[11px] p-6 h-full flex flex-col items-start">
                                        {/* 3. ICONO CON EFECTO "GLOW" */}
                                        <div className='flex'>
                                            <div className="flex  flex-shrink-0  items-center justify-center h-12 w-12 rounded-lg bg-teal-900/50 border border-teal-400/30">
                                                <Icon
                                                    className="h-7 w-7 text-teal-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <h4 className="text-xl ml-2 font-semibold leading-tight text-white">
                                                {benefit.title}
                                            </h4>
                                        </div>
                                        <div className="mt-5">
                                            <p className="mt-2 text-lg leading-[1.4] text-slate-400">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mockup del Producto */}
                <div className="mt-12 text-center">
                    <Image
                        src="/subdomains/cerradorexperto/images/lobos/lobosMockup.png"
                        alt="Acceso al programa Lobos de Ventas en todos los dispositivos"
                        width={800}
                        height={378}
                        className="w-full max-w-[800px] mx-auto"
                    />
                    <p className="mt-8 text-xl lg:text-2xl text-slate-400 italic max-w-3xl mx-auto">
                        Entrena donde sea, cuando sea. Tu sistema de ventas te acompaña en
                        tu laptop, tablet o celular, siempre listo para la acción.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PresentationSection;