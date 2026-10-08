// Ruta: app/components/historia/LaBusquedaDelSecreto.tsx
import Image from 'next/image';


export const LaBusquedaDelSecreto = () => {
    return (
        <section className="bg-gradient-to-br from-[#01081b] to-[#113699] text-white py-16 lg:py-24">
            <div className="container mx-auto px-6 max-w-7xl text-white">
                <div className="lg:hidden">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">Capítulo 2</p>
                    <h2 className="mt-2 text-3xl font-bold leading-tight text-white">
                        La frase que me cambió.
                    </h2>
                </div>
                <div className="grid grid-cols-1 mx-auto items-center gap-4 lg:grid-cols-5 lg:gap-16">

                    {/* Columna de la Imagen (2/5 en escritorio) */}
                    <div className="order-1 flex justify-center lg:order-2 lg:col-span-2 mt-6">
                        <Image
                            src="/images/historia/padreRicoBook.png"
                            alt="Libro Padre Rico, Padre Pobre de Robert Kiyosaki"
                            width={340}
                            height={539}
                            className="w-[200px] lg:w-[340px] transition-transform hover:scale-105 duration-500"
                        />
                    </div>

                    {/* Columna del Texto (3/5 en escritorio) */}
                    <div className="order-2 lg:order-1 lg:col-span-3">
                        <p className="hidden lg:block text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">Capítulo 2</p>
                        <h2 className="hidden lg:block mt-3 text-3xl font-bold leading-tight mb-8 text-white lg:text-5xl">
                            La frase que me cambió.
                        </h2>
                        <p className="text-xl leading-[1.4] text-white lg:text-2xl">
                            Cuando cerró mi último negocio me sentí un fraude. Entonces leí una frase de Robert Kiyosaki que me golpeó:
                        </p>
                        <blockquote className="relative mt-6 border-l-4 border-blue-600 pl-6 italic">
                            <p className="text-2xl font-semibold text-white lg:text-3xl">
                                “Si quieres tener éxito en la vida, necesitas ser un buen negociador y un buen orador.”
                            </p>
                        </blockquote>
                        <p className="mt-6 text-xl leading-[1.4] text-white lg:text-2xl">
                            Ahí vi lo que me faltaba. No era más esfuerzo. Era una habilidad que no tenía: <span className="font-semibold">comunicar y vender.</span><br /><br />
                            Me obsesioné con aprenderla para no volver a fracasar por lo mismo.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};