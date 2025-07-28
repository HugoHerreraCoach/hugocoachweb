// src/components/coaching/HeroSection.tsx

import Image from 'next/image';
import Link from 'next/link';


export default function HeroSection() {
    return (
        <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
            {/* Fondo con imagen y gradiente superpuesto */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/coaching/coachingHeader.jpg"
                    alt="Hugo Herrera, coach de ventas, en una sesión estratégica"
                    fill
                    priority
                    quality={80}
                    className="object-cover opacity-30 object-center"
                />
                {/* Gradiente oscuro para asegurar la legibilidad del texto sobre la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
            </div>

            {/* Contenido principal de la sección */}
            <div className="relative z-20 max-w-4xl px-4">
                {/* Título Principal: Directo y enfocado en el resultado */}
                <h1 className="text-4xl font-bold tracking-tight leading-tight text-white md:text-6xl text-balance">
                    Deja de Esforzarte. Empieza a Cerrar.
                </h1>

                {/* Subtítulo: Expande la promesa y se dirige al avatar */}
                <p className="mt-6 text-xl md:text-2xl leading-[1.6] text-slate-300 text-balance">
                    Te daré el sistema y el plan de acción 1 a 1 para que dupliques tu tasa de cierre y tus comisiones en tiempo récord.
                </p>

                {/* Llamada a la Acción (CTA): Clara, visible y con un diseño premium */}
                <div className="mt-10">
                    <Link
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-4 py-3 text-lg lg:text-xl font-semibold leading-[1.4] text-white shadow-sm transition-colors duration-500 ease-in-out hover:from-[#153eb5] hover:to-[#0a4afc]"
                    >
                        Agendar Sesión de Aceleración
                    </Link>
                </div>
            </div>
        </section>
    );
}
