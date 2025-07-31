import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
    return (
        <section className="bg-slate-900 relative w-full min-h-[90vh] flex flex-col justify-center items-center py-20 sm:py-28 text-white overflow-hidden">
            <Image
                src="/images/hugoHeader.png"
                alt="Fotografía de Hugo Herrera como coach, de fondo en la sección de llamada a la acción"
                fill
                priority
                quality={80}
                className="object-contain object-top pt-12 md:pt-0"
            />
            {/* Capa de degradado para asegurar la legibilidad del texto */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/40 z-[1]"
                aria-hidden="true"
            ></div>

            {/* 2. Contenido centrado y con `z-index` para estar al frente */}
            <div className="relative z-[2] container mx-auto max-w-4xl px-6 pt-40 md:pt-12 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                    La Evidencia es Clara
                </h2>
                <p className="mt-6 text-xl leading-8 text-slate-200 text-balance lg:text-2xl">
                    La pregunta ya no es si el método funciona. La única pregunta es: ¿cuánto tiempo más vas a esperar para tener el tuyo? Da el primer paso.
                </p>

                {/* 3. Botón de CTA mejorado con un icono de lucide-react */}
                <div className="mt-10">
                    <Link
                        href="https://calendly.com/hugoherrera-coach/agendar-videollamada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-6 py-4 text-lg font-semibold text-white transition-colors duration-300 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc] sm:px-8 sm:text-xl"
                    >
                        Definir mi Plan de Acción
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;