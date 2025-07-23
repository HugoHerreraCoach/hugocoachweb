import Image from 'next/image';
import {Quote} from 'lucide-react';

export default function SocialProofSection() {
    const testimonials = [
        {
            quote: "El embudo que Hugo construyó no solo es rápido, es una máquina de calificar leads. Pasamos de recibir 2 a 3 reuniones por semana a tener 10, y de mucha mejor calidad. Nos ahorró horas de reuniones sin sentido.",
            name: "Kelvin Izquierdo",
            company: "Emprendedor Digital",
            image: "/images/software/kelvin.jpg"
        },
        {
            quote: "Estábamos ahogados en trabajo manual para gestionar los pedidos. El software a medida que nos entregó Hugo automatizó el 80% del proceso. Ahora mi equipo se dedica a vender, no a llenar excels.",
            name: "Antonio Resurrección",
            company: "Comercializadora de Productos",
            image: "/images/software/antonio.jpg"
        }
    ];

    return (
        <section className="w-full text-white py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-black to-slate-900 bg-fixed">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mx-auto">
                    <Quote className="mx-auto h-12 w-12 text-[#0a4afc]" />
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        Sistemas reales, resultados medibles.
                    </h2>
                </div>
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {testimonials.map((testimonial) => (
                        <figure key={testimonial.name} className="rounded-2xl bg-slate-900/50 p-8 ring-1 ring-white/10 flex flex-col">
                            <blockquote className="flex-grow">
                                <p className="text-xl lg:text-2xl leading-[1.4] text-slate-300 italic">“{testimonial.quote}”</p>
                            </blockquote>
                            <figcaption className="mt-6 flex items-center gap-4">
                                <Image
                                    className="h-24 w-24 rounded-full object-cover"
                                    src={testimonial.image}
                                    alt={`Foto de ${testimonial.name}`}
                                    width={300}
                                    height={300}
                                />
                                <div>
                                    <div className="font-bold text-lg lg:text-xl leading-[1.2] text-white">{testimonial.name}</div>
                                    <div className="text-slate-400 lg:pt-1 leading-[1.2] text-base lg:text-lg">{testimonial.company}</div>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                {/* Aquí puedes añadir la barra de logos si lo deseas */}
            </div>
        </section>
    );
}