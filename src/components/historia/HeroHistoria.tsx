import Image from 'next/image';

export const HeroHistoria = () => {
    return (
        <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
            {/* Overlay de fondo sutil si es necesario */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/40 z-10" />

            {/* Imagen de Fondo */}
            <Image
                src="/images/historia/miHistoriaHeader.jpg"
                alt="Hugo Herrera en su faceta como estratega de ventas"
                layout="fill"
                objectFit="cover"
                className="opacity-50"
                priority 
            />

            <div className="container mx-auto px-6 relative z-20">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.2] text-balance">
                    Mis 5 fracasos. Tu próximo sistema de ventas.
                </h1>
                <p className="mt-6 max-w-3xl text-xl md:text-2xl mx-auto text-gray-200 text-balance leading-[1.3]">
                    Fracasé con negocios propios. Después fracasé entrenando equipos. De todo eso salió un método que hoy usan más de 120 equipos comerciales.
                </p>
                <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-gray-300">
                    Hugo Herrera · Entrenador de ventas · Cajamarca, Perú
                </p>
            </div>
        </section>
    );
};