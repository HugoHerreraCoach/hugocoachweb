// app/components/historia/PrimerosClientes.tsx
import Image from "next/image";

export const PrimerosClientes = () => {
    return (
        <section className="bg-gradient-to-br from-[#ffffff] to-[#dedede] text-black pt-16 lg:pt-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-8xl"> {/* Aumentado el max-w para el layout de 2 columnas */}
                    <p className="text-center text-sm font-semibold uppercase tracking-widest text-blue-700">Capítulo 3</p>
                    <h2 className="mt-3 text-balance text-center text-3xl font-bold text-gray-900 md:text-5xl">
                        Mis primeros clientes fueron empresas.
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
                                Con lo que aprendí, empecé a dar <span className="font-semibold">coaching a empresas.</span> Quería que los equipos trabajaran mejor juntos.
                            </p>
                            <p>
                                <span className="font-semibold">Funcionó rápido.</span> El ambiente mejoraba, los dueños estaban contentos y me recomendaban.
                            </p>
                            <p>
                                Hasta que un día, <span className="font-semibold">me pidieron algo más.</span>
                            </p>
                        </div>
                    </div>

                    {/* Sección de la Cita (sin cambios estructurales) */}
                    <div className="rounded-2xl mt-8 bg-white px-4 py-8 mb-16 lg:p-12 text-center shadow-2xl shadow-black/20">
                        <p className="text-xl lg:text-2xl text-gray-800 ">
                            Los dueños me decían:
                        </p>
                        <blockquote className="my-4">
                            <p className="text-balance text-2xl font-bold italic leading-[1.2] text-[#153eb5] lg:text-3xl">
                                &quot;Hugo, esto es increíble… ¿podrías preparar un entrenamiento de ventas para ellos?&quot;
                            </p>
                        </blockquote>
                        <p className="mt-4 text-2xl lg:text-3xl text-gray-800">
                            Dije que <span className="font-bold">sí.</span>
                        </p>
                        <p className="mt-4 text-xl lg:text-2xl text-gray-800">
                            Llevaba años estudiando ventas. ¿Qué tan difícil podía ser? Mucho más de lo que pensaba.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN PARALLAX --- */}
            <div className="relative overflow-hidden">

                {/* 2. Capa de Imagen de Fondo (con efecto Parallax corregido) */}
                <div
                    className="absolute inset-0 bg-cover bg-center 
                   bg-[url('/images/cambioBackground.jpg')] blur-[2px] z-0
                   bg-scroll md:bg-fixed" // <-- CAMBIO APLICADO AQUÍ
                ></div>

                {/* 3. Capa de Superposición Oscura */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40 z-10"></div>

                {/* 4. Capa de Contenido */}
                <div className="relative z-20 p-4 py-20 lg:py-40">
                    <p className="mx-auto max-w-5xl text-center text-2xl font-semibold leading-snug text-white md:text-4xl text-balance">
                        Estaba por aprender la lección más cara de mi carrera.
                    </p>
                </div>
            </div>
        </section>
    );
};