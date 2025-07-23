import Image from 'next/image';
import { Quote } from 'lucide-react'; // Importamos el icono Quote de lucide-react

interface TeamTestimonial {
    name: string;
    role: string;
    image: string;
    quote: string;
}

const testimonial: TeamTestimonial = {
    name: 'Lenin Fernández',
    role: 'Gerente Comercial de Inmobiliaria Impulsa',
    image: '/images/equipos/lenin.jpg',
    quote: 'Hugo, tu entrenamiento ha sido un cambio total para nosotros. De vender apenas un lote a la semana, pasamos a ¡multiplicar nuestros resultados por 6! Ayer mismo cerramos 7 ventas gracias a lo que nos enseñaste.',
};

export function TestimonialSection(): React.ReactElement {
    return (
        // Sección de Testimonios con un fondo de gradiente consistente
        <section className="relative w-full py-20 sm:py-28 text-white bg-gradient-to-b from-black to-slate-900 bg-fixed">
            <div className="relative z-10 container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    {/* Icono de cita de lucide-react */}
                    <Quote className="mx-auto h-12 w-12 text-[#0a4afc] mb-4" aria-hidden="true" />
                    <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        Esto no es un testimonio. Es la prueba de que el sistema funciona.
                    </h2>
                    <figure className="mt-10  max-w-4xl mx-auto">
                        <figcaption className="mt-8 flex flex-col mx-auto items-center justify-center gap-x-4">
                            <Image
                                className="h-20 w-20 lg:h-24 lg:w-24 mb-2 rounded-full object-cover"
                                src={testimonial.image}
                                alt={`Foto de ${testimonial.name}`}
                                width={600}
                                height={613}
                            />
                            <div>
                                <div className="font-semibold text-lg lg:text-2xl">{testimonial.name}</div>
                                <div className="text-slate-400 text-base lg:text-xl">{testimonial.role}</div>
                            </div>
                        </figcaption>
                        <blockquote className="text-xl lg:text-2xl mt-4 leading-[1.6] italic text-slate-300 text-balance">
                            <p>“{testimonial.quote}”</p>
                        </blockquote>

                    </figure>
                </div>

                {/* Puente Narrativo */}
                <div className="my-12 text-center max-w-5xl mx-auto">
                    <p className="text-xl lg:text-2xl text-slate-200 leading-[1.4]">
                        El resultado de Lenin no es casualidad. Es la consecuencia de una decisión: dejar de ser el supervisor de su equipo para convertirse en el arquitecto de su sistema de ventas. Ahora te toca a ti tomar esa misma decisión.
                    </p>
                </div>
            </div>
        </section>
    );
}