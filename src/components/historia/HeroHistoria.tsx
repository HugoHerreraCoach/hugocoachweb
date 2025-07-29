import Image from 'next/image';

export const HeroHistoria = () => {
    return (
        <section className="relative bg-black text-white flex justify-center items-center min-h-[91vh] text-center py-20 md:py-32 overflow-hidden">
            {/* Overlay de fondo sutil si es necesario */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.8)] z-10" />

            {/* Imagen de Fondo */}
            <Image
                src="/images/historia/miHistoriaHeader.jpg"
                alt="Hugo Herrera en su faceta como estratega de ventas"
                layout="fill"
                objectFit="cover"
                className="opacity-50"
                priority // Carga esta imagen primero
            />

            <div className="container mx-auto px-6 relative z-20">
                <h1 className="text-3xl md:text-6xl font-extrabold leading-[1.2] text-balance">
                    Tuve que fracasar 5 veces para descubrir el sistema que tu negocio necesita.
                </h1>
                <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 text-balance leading-[1.2]">
                    Verás, mi éxito no llegó por trabajar más duro. El esfuerzo sin dirección solo me llevó al agotamiento. La verdadera transformación comenzó con una sola revelación, la misma que hoy puede ahorrarte los tropiezos que yo ya viví.
                </p>
            </div>
        </section>
    );
};