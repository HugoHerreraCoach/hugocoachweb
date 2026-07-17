import React from 'react';
import Image from 'next/image';

const FeaturedProductSection = (): React.ReactElement => {
    return (
        // CAMBIO: Añadido overflow-hidden para contener el efecto de fondo
        <section className="bg-slate-950 py-16 sm:py-20 relative overflow-hidden">
            {/* CAMBIO: Añadido efecto de aurora para crear foco visual */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side_at_50%_50%,rgba(37,99,235,0.15),transparent_100%)]"></div>

            {/* z-10 para que el contenido esté sobre el fondo */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 gap-y-8 max-w-7xl mx-auto md:grid-cols-2 md:gap-x-0 md:items-center">

                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance text-center md:text-left md:col-start-2 md:row-start-1">
                        El Sistema para Dominar el Cierre de Ventas.
                    </h2>
                    
                    <div className="flex justify-center md:justify-center md:col-start-1 md:row-start-1 md:row-span-3">
                        <a
                            href="https://cerradorexperto.hugoherreracoach.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Image
                                src="/subdomains/info/images/cerradorExperto.jpg"
                                alt="Portada del libro Cerrador Experto de Hugo Herrera"
                                width={920}
                                height={1300}
                                className="rounded-lg max-w-[380px] w-full shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-105"
                            />
                        </a>
                    </div>

                    <p className="text-xl md:text-2xl text-slate-300 text-balance text-center mx-auto md:text-left md:mx-0 md:col-start-2 md:row-start-2">
                        Te entrego mi arsenal completo: <span className="font-bold text-white">139 respuestas probadas</span>, palabra por palabra, para demoler cualquier objeción y cerrar la venta. Es tu guion de cierre.
                    </p>
                    
                    <div className="flex flex-col justify-center items-center gap-y-4 md:items-start md:col-start-2 md:row-start-3">
                        {/* CAMBIO: Aplicado el estilo de Botón Primario */}
                        <a
                            href="https://cerradorexperto.hugoherreracoach.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-lg bg-gradient-to-b from-[#0a4afc] to-[#153eb5] px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        >
                            Obtener el Sistema ($7 USD)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProductSection;