// Ruta: app/components/historia/LaBusquedaDelSecreto.tsx
import Image from 'next/image';


export const LaBusquedaDelSecreto = () => {
    return (
        <section className="bg-gradient-to-br from-[#01081b] to-[#113699] text-white py-16 lg:py-24">
            <div className="container mx-auto px-6 max-w-7xl text-white">
                <h2 className="text-3xl font-bold leading-tight lg:hidden text-white lg:text-5xl">
                    La frase que lo cambió todo...
                </h2>
                <div className="grid grid-cols-1 mx-auto items-center gap-4 lg:grid-cols-5 lg:gap-16">

                    {/* Columna de la Imagen (2/5 en escritorio) */}
                    <div className="order-1 flex justify-center lg:order-2 lg:col-span-2 mt-6">
                        <Image
                            src="/images/padreRicoBook.png"
                            alt="Libro Padre Rico, Padre Pobre de Robert Kiyosaki"
                            width={340}
                            height={539}
                            className="w-[200px] lg:w-[340px] transition-transform hover:scale-105 duration-500"
                        />
                    </div>

                    {/* Columna del Texto (3/5 en escritorio) */}
                    <div className="order-2 lg:order-1 lg:col-span-3">
                        <h2 className="hidden lg:block text-3xl font-bold leading-tight mb-8 text-white lg:text-5xl">
                            La frase que lo cambió todo...
                        </h2>
                        <p className="text-xl leading-[1.4] text-white lg:text-2xl">
                            Después de que mi último negocio fracasara, estaba perdido. Me sentía un fraude. Fue entonces cuando, en un libro de Robert Kiyosaki, una frase me abofeteó y cambió el rumbo de todo:
                        </p>
                        <blockquote className="relative mt-6 border-l-4 border-blue-600 pl-6 italic">
                            <p className="text-2xl font-semibold text-white lg:text-3xl">
                                “Si quieres tener éxito en la vida, necesitas ser un buen negociador y un buen orador.”
                            </p>
                        </blockquote>
                        <p className="mt-6 text-xl leading-[1.4] text-white lg:text-2xl">
                            ¡Esa era la pieza que me faltaba! No se trataba de más esfuerzo, sino de una habilidad que no tenía.<br /><br />
                            Así que me obsesioné con dominar la comunicación y las ventas, decidido a no volver a fracasar por la misma razón.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};