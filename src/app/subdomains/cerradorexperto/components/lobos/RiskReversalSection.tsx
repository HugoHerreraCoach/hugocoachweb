import Image from 'next/image';
import { ShieldCheck } from 'lucide-react'; // Ícono para la garantía

// Array con los datos de los testimonios para un código más limpio
const testimonials = [
    {
        name: 'Lenin Salvador',
        role: 'CEO de Impulsa Inmobiliaria',
        imageSrc: '/subdomains/cerradorexperto/images/lobos/lenin.jpg',
        resultTitle: 'Multipliqué por 6 mis resultados en ventas.',
        quote: '"Había meses que mi negocio iba bien, y otros donde no vendiamos casi nada. Para probar, le di el sistema a una vendedora del equipo y sus cierres se multiplicaron por 6 en una semana. Quedó claro que para escalar, es necesario un buen proceso de ventas"',
    },
    {
        name: 'Mery Livias',
        role: 'Asesora de Red Multinivel',
        imageSrc: '/subdomains/cerradorexperto/images/lobos/mery.jpg',
        resultTitle: 'Un método paso a paso para agendar, presentar y cerrar.',
        quote: '"Mi problema era siempre el mismo: enviaba la información y el prospecto desaparecía. No tenía un método para hacer el seguimiento. El sistema de Hugo me dio un paso a paso que de verdad funciona; un guion para guiar la conversación y llevar al cliente al cierre sin presionar."',
    },
];

const RiskReversalSection = () => {
    return (
        // Usamos un fondo oscuro para volver al tono principal de la marca
        <section id="oto-risk-reversal" className="relative bg-slate-950 text-white py-24 sm:py-32">
            {/* Efecto de fondo opcional, similar al de la página de Cerrador Experto */}

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Título de la Sección */}
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        No lo digo yo. Lo dice la estructura en sus resultados.
                    </h2>
                    <p className="mt-6 text-xl lg:text-2xl leading-relaxed text-slate-300">
                        Vendedores que pasaron de dejar sus resultados a la suerte a tener un proceso que cierra de forma consistente.
                    </p>
                </div>

                {/* Grid de Testimonios */}
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-5xl lg:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <figure
                            key={testimonial.name}
                            className="flex flex-col rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-md"
                        >
                            <div className="flex-grow">
                                <h3 className="text-2xl font-semibold text-white text-balance leading-tight">
                                    {testimonial.resultTitle}
                                </h3>
                                <blockquote className="mt-4 text-xl text-slate-300 text-balance">
                                    <p>{testimonial.quote}</p>
                                </blockquote>
                            </div>
                            <figcaption className="mt-8 flex items-center gap-x-4">
                                <Image
                                    className="h-14 w-14 rounded-full object-cover"
                                    src={testimonial.imageSrc}
                                    alt={`Foto de ${testimonial.name}`}
                                    width={500}
                                    height={500}
                                />
                                <div>
                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                    <div className="text-primary-blue">{testimonial.role}</div>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                {/* Sección de Garantía */}
                <div className="mt-24">
                    <div className="relative mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-primary-blue to-accent-green p-1 shadow-2xl shadow-primary-blue/20">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="rounded-full bg-gradient-to-br from-primary-blue to-secondary-blue p-2 shadow-lg">
                                <div className="rounded-full bg-slate-900 p-4">
                                    <ShieldCheck className="h-16 w-16 text-primary-blue" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-[22px] bg-slate-900/80 pt-20 pb-12 px-4 text-center backdrop-blur-sm lg:px-12">
                            <h2 className="text-3xl font-extrabold text-white text-balance lg:text-4xl">
                                Garantía de Resultados
                            </h2>
                            <p className="mt-4 text-xl lg:text-2xl text-slate-300 leading-[1.4]">
                                Tienes 30 días para implementar el sistema &quot;Lobos de Ventas&quot;
                            </p>
                            <p className="mt-4 text-xl lg:text-2xl text-slate-300 leading-[1.4]">
                                Únete a los talleres, aplica los guiones y ejecuta el proceso. Si después de hacerlo no sientes que tienes una estructura clara para duplicar tus ventas, envíame un correo.
                            </p>
                            <p className="mt-4 text-xl lg:text-2xl text-slate-300 leading-[1.4]">
                                <strong className='text-white'>Te devolveré el 100% de tu inversión</strong> en este programa y también el dinero de tu libro &quot;Cerrador Experto&quot;. El riesgo es completamente mío.
                            </p>
                            <div className="mt-6 border-t border-slate-700/80 pt-6">
                                <p className="text-2xl font-semibold italic text-slate-200">
                                    &quot;O tienes resultados, o no quiero tu dinero. Así de simple.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default RiskReversalSection;