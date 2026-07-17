import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';

const ConnectionSection = () => {
    return (
        <section id="connection" className="bg-gray-950 text-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Título de la Sección */}
                <div className="mx-auto text-center">
                    <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
                        Ya tienes la herramienta más potente. Ahora, construye el sistema.
                    </h2>
                </div>

                {/* Contenedor del Diagrama Visual */}
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-[1fr_auto_1fr]">

                    {/* Columna Izquierda: El Motor (Cerrador Experto) */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold text-white">El Motor</h3>
                        <p className="mt-2 text-xl text-slate-300">La potencia para cerrar tratos.</p>
                        {/* Reemplaza con la ruta a la imagen de tu libro */}
                        <Image
                            src="/subdomains/cerradorexperto/images/cerradorExperto.jpg" // Asegúrate de que esta ruta sea correcta
                            alt="Libro Cerrador Experto"
                            width={300}
                            height={424} // Proporción de ejemplo, ajústala a tu imagen
                            className="mt-6 w-full max-w-[250px] rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Columna Central: El Conector (Icono Responsivo) */}
                    <div className="flex items-center justify-center">
                        {/* Icono para vista móvil (apunta hacia abajo) */}
                        <ArrowDown
                            className="h-12 w-12 text-slate-200 block lg:hidden"
                            aria-hidden="true"
                        />
                        {/* Icono para vista de escritorio (apunta a la derecha) */}
                        <ArrowRight
                            className="h-16 w-16 text-slate-200 hidden lg:block"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Columna Derecha: El Vehículo Completo (Lobos de Ventas) */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold text-accent-green">El Vehículo Completo</h3>
                        <p className="mt-2 text-xl text-slate-300">La estructura para ganar la carrera.</p>
                        {/* Reemplaza con la ruta a la imagen del programa */}
                        <Image
                            src="/subdomains/cerradorexperto/images/lobos/lobosProgram.jpg"
                            alt="Programa Lobos de Ventas"
                            width={600}
                            height={600}
                            className="mt-6 w-full max-w-[400px] rounded-lg shadow-2xl"
                        />
                    </div>
                </div>

                {/* Párrafo de Conexión */}
                <div className="mx-auto mt-16 text-center">
                    <p className="text-xl lg:text-2xl leading-relaxed text-slate-300">
                        Has asegurado el motor: la potencia probada para el momento decisivo del cierre.
                        <br /><br />
                        Un profesional, sin embargo, no solo tiene un buen motor;
                        construye el <strong className="text-white">vehículo completo</strong>.
                        <br /><br />
                        Este programa te entrega los planos para que ensambles tu propio <strong className="text-white">sistema de ventas</strong>, dándote control y predictibilidad desde la prospección hasta la recompra.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default ConnectionSection;