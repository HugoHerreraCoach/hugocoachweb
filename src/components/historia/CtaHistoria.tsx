import Link from 'next/link';

export const CtaHistoria = () => {
    return (
        <section className="bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,1)),url('/images/buildBackground.jpg')] bg-no-repeat bg-cover min-h-[90vh] flex justify-center items-center text-white py-16 lg:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-balance">
                    El esfuerzo te trajo hasta aquí. La estructura te llevará al siguiente nivel.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl mx-auto text-gray-200 text-balance">
                    Mi historia no tiene por qué ser la tuya. Puedes ahorrarte los años de frustración y empezar a construir el sistema que tu negocio merece, empezando hoy mismo.
                </p>
                <p className="mt-8 text-xl lg:text-2xl mx-auto text-gray-200 text-balance">
                    Te ofrezco dos caminos para comenzar. Elige el que mejor se adapte a tu momento:
                </p>

                {/* Contenedor de los dos llamados a la acción */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start max-w-4xl mx-auto">
                    
                    {/* Opción 1: Agendar Llamada */}
                    <div className="flex flex-col items-center gap-y-4">
                        <p className="text-base font-bold tracking-widest uppercase text-gray-400">
                            PARA UNA SOLUCIÓN RÁPIDA
                        </p>
                        <a
                            href="https://calendly.com/hugoherrera-coach/agendar-videollamada"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 text-xl w-full sm:w-auto"
                        >
                            Agendar Diagnóstico Estratégico
                        </a>
                        <p className="text-lg text-gray-400 max-w-sm">
                            Si estás listo para actuar, tengamos una sesión 1 a 1 gratuita para analizar tu negocio y darte un plan de acción inmediato.
                        </p>
                    </div>

                    {/* Opción 2: Obtener Libro Físico (CORREGIDO) */}
                    <div className="flex flex-col items-center gap-y-4">
                         <p className="text-base font-bold tracking-widest uppercase text-gray-400">
                            PARA APRENDER A TU RITMO
                        </p>
                        <Link
                            href="https://liderexperto.hugoherreracoach.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-transparent border border-gray-600 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors text- w-full sm:w-auto"
                        >
                            Quiero mi Libro Gratis
                        </Link>
                         <p className="text-lg text-gray-400 max-w-sm">
                            Si prefieres tener la guía completa en tus manos, te regalo mi libro físico; solo cubre el costo de envío. Es el primer paso perfecto para entender la metodología.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};