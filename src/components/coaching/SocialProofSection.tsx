// src/components/coaching/SocialProofSection.tsx

import { Star } from 'lucide-react';

// Datos de los testimonios para mantener el código organizado.
const testimonials = [
    {
        quote: "Extraordinario, se aprendió muchísimo. Hugo es directo y va al grano. Sales con herramientas que puedes usar al instante.",
        name: "Arnold Gallardo",
        role: "Asistente a entrenamiento",
        // Reemplazar con la ruta real de la imagen
        imageUrl: "https://placehold.co/100x100/e2e8f0/475569?text=AG",
    },
    {
        quote: "Su dominio del tema y forma de conectar hicieron que cada minuto fuera valioso. Una charla llena de ideas interesantes y aplicables.",
        name: "Edith Tovar Pino",
        role: "Asistente a Conferencia",
        // Reemplazar con la ruta real de la imagen
        imageUrl: "https://placehold.co/100x100/e2e8f0/475569?text=ET",
    },
];

// Lista de logos de empresas.
const companyLogos = [
    { name: 'Century 21', src: 'https://placehold.co/140x48/ffffff/9ca3af?text=Century+21' },
    { name: 'Inclub', src: 'https://placehold.co/140x48/ffffff/9ca3af?text=Inclub' },
    { name: 'Fuxion', src: 'https://placehold.co/140x48/ffffff/9ca3af?text=Fuxion' },
    { name: 'Royal Prestige', src: 'https://placehold.co/140x48/ffffff/9ca3af?text=Royal+Prestige' },
    { name: 'TopX', src: 'https://placehold.co/140x48/ffffff/9ca3af?text=TopX' },
];

export default function SocialProofSection() {
    return (
        <section className="bg-slate-900 text-white py-20 lg:py-28">
            <div className="container mx-auto max-w-6xl px-4">
                {/* Encabezado de la sección */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight lg:text-5xl text-balance">
                        Mi sistema no promete. Produce resultados.
                    </h2>
                </div>

                {/* Contenedor de los testimonios */}
                <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <figure key={index} className="flex flex-col rounded-2xl bg-black/20 p-8 ring-1 ring-white/10">
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                            </div>
                            <blockquote className="flex-grow text-lg leading-relaxed text-slate-300">
                                <p>&quot;{testimonial.quote}&quot;</p>
                            </blockquote>
                            <figcaption className="mt-8 flex items-center gap-4">
                                <img className="h-14 w-14 rounded-full object-cover" src={testimonial.imageUrl} alt={`Foto de ${testimonial.name}`} />
                                <div>
                                    <div className="font-semibold text-white">{testimonial.name}</div>
                                    <div className="text-slate-400">{testimonial.role}</div>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                {/* Sección de logos de empresas */}
                <div className="mt-24 text-center">
                    <h3 className="text-xl font-semibold text-slate-400">
                        Vendedores de estas empresas ya usan mi sistema para cerrar más:
                    </h3>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                        {companyLogos.map((logo) => (
                            <img
                                key={logo.name}
                                src={logo.src}
                                alt={`Logo de ${logo.name}`}
                                className="h-10 w-auto"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
