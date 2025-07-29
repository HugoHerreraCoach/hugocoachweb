// app/components/historia/PrimerosClientes.tsx
import Image from "next/image";

export const PrimerosClientes = () => {
    return (
        <section className="bg-gradient-to-br from-[#ffffff] to-[#dedede] text-black pt-16 lg:pt-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-8xl"> {/* Aumentado el max-w para el layout de 2 columnas */}
                    <h2 className="text-balance text-center text-3xl font-bold text-gray-900 md:text-5xl">
                        Del éxito en equipos a una nueva misión
                    </h2>

                    {/* Contenedor Grid para la imagen y el texto introductorio */}
                    <div className="mt-6 lg:mt-16 grid grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-12">

                        {/* Columna 1: Imagen */}
                        <div className="flex justify-center">
                            <Image
                                src="/images/historia/taxiPlus.jpg"
                                alt="Hugo Herrera dando una sesión de coaching para empresas"
                                width={1000}
                                height={594}
                                className="rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Columna 2: Párrafos de texto */}
                        <div className="space-y-5 text-xl lg:text-2xl leading-[1.4] text-gray-700">
                            <p>
                                Armado con mis nuevas habilidades, empecé a ofrecer <span className="font-semibold">coaching para empresas.</span>
                            </p>
                            <p>
                                Mi foco era claro: ayudar a los equipos a ser más productivos y a trabajar con mejor sinergia.
                            </p>
                            <p>
                                <span className="font-semibold">Y los resultados llegaron rápido.</span> El ambiente en las empresas mejoraba, los dueños estaban felices y el boca a boca me traía más clientes.
                            </p>
                            <p>
                                Estaba en un gran momento. Sentía que realmente estaba generando un cambio. Y fue entonces, en medio de ese éxito, cuando <span className="font-semibold">mis clientes me presentaron un nuevo desafío.</span>
                            </p>
                        </div>
                    </div>

                    {/* Sección de la Cita (sin cambios estructurales) */}
                    <div className="rounded-2xl mt-8 bg-white/70 px-4 py-8 mb-16 lg:p-12 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
                        <p className="text-xl lg:text-2xl text-gray-800 ">
                            Contentos con la transformación de sus equipos, me decían:
                        </p>
                        <blockquote className="my-4">
                            <p className="text-balance text-2xl font-bold italic leading-[1.2] text-[#153eb5] lg:text-3xl">
                                &quot;Hugo, esto es increíble… ¿Crees que podrías preparar un entrenamiento de ventas para ellos?&quot;
                            </p>
                        </blockquote>
                        <p className="mt-4 text-2xl lg:text-3xl text-gray-800">
                            Mi respuesta fue: <span className="font-bold">&quot;¡Por supuesto que sí!&quot;</span>
                        </p>
                        <p className="mt-4 text-xl lg:text-2xl text-gray-800">
                            Para mí, era un paso lógico. Llevaba años estudiando ventas para conseguir mis propios clientes de coaching, así que pensé que sería sencillo adaptar ese conocimiento.<br /><br />
                            Estaba convencido de que podía darles las herramientas que necesitaban.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN PARALLAX --- */}
            <div className="relative overflow-hidden">

                {/* 2. Capa de Imagen de Fondo (con efecto Parallax) */}
                <div className="absolute inset-0 bg-cover bg-center bg-fixed bg-[url('/images/cambioBackground.jpg')] blur-[2px] z-0"></div>

                {/* 3. Capa de Superposición Oscura */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40 z-10"></div>

                {/* 4. Capa de Contenido */}
                <div className="relative z-20 p-4 py-20 lg:py-40">
                    <p className="mx-auto max-w-5xl text-center text-2xl font-semibold leading-snug text-white md:text-4xl text-balance">
                        Y así, con total confianza, me adentré en el mundo del entrenamiento de ventas, sin saber que estaba a punto de chocar contra un muro que cambiaría mi carrera para siempre...
                    </p>
                </div>
            </div>
        </section>
    );
};