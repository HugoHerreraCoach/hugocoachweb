import Link from 'next/link';
import { LLAMADA_GRATIS_URL } from '@/lib/servicios';

export const CtaHistoria = () => {
    return (
        <section className="bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,1)),url('/images/historia/buildBackground.jpg')] bg-no-repeat bg-cover min-h-[90vh] flex justify-center items-center text-white py-16 lg:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-balance">
                    Mi historia no tiene que ser la tuya.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl mx-auto text-gray-200 text-balance">
                    Puedes ahorrarte los años de frustración y empezar hoy a construir un sistema de ventas para tu negocio.
                </p>
                <p className="mt-8 text-xl lg:text-2xl mx-auto text-gray-200 text-balance">
                    Elige cómo empezar:
                </p>

                {/* Contenedor de los dos llamados a la acción */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start max-w-4xl mx-auto">
                    
                    {/* Opción 1: Agendar Llamada */}
                    <div className="flex flex-col items-center gap-y-4">
                        <p className="text-base font-bold tracking-widest uppercase text-gray-400">
                            Para hablar con alguien hoy
                        </p>
                        <a
                            href={LLAMADA_GRATIS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 text-xl w-full sm:w-auto"
                        >
                            Llamada gratis de 20 min
                        </a>
                        <p className="text-lg text-gray-400 max-w-sm">
                            Si estás listo para actuar, agenda 20 minutos con un asesor de mi equipo. Le cuentas de tu negocio y vemos si podemos ayudarte.
                        </p>
                    </div>

                    {/* Opción 2: Obtener Libro Físico (CORREGIDO) */}
                    <div className="flex flex-col items-center gap-y-4">
                         <p className="text-base font-bold tracking-widest uppercase text-gray-400">
                            Para aprender a tu ritmo
                        </p>
                        <Link
                            href="https://liderexperto.hugoherreracoach.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-transparent border border-gray-600 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors text- w-full sm:w-auto"
                        >
                            Quiero mi libro
                        </Link>
                         <p className="text-lg text-gray-400 max-w-sm">
                            Si prefieres aprender a tu ritmo, te regalo mi libro físico Líder Experto. Solo pagas el costo de envío.
                        </p>
                    </div>

                </div>

                <p className="mt-12 text-lg text-gray-300">
                    ¿Prefieres ver resultados antes?{' '}
                    <Link href="/casos-de-exito" className="font-semibold text-white underline underline-offset-4 hover:text-gray-300">
                        Mira los casos de éxito
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
};