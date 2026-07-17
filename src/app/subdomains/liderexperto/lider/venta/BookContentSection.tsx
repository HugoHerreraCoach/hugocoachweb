import React from 'react';
import Image from 'next/image';

const BookContentSection: React.FC = () => {
    return (
        <section className="bg-white py-12 md:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4">
                
                    {/* Título principal */}
                    <div className="flex w-48 h-0.5 bg-red-600 mx-auto mb-2 md:w-180"></div>
                        <h2 className="font-montserrat text-3xl text-center md:text-5xl font-black text-black leading-[1.1] mb-3">
                            ¿QUÉ CONTIENE ESTE LIBRO?
                        </h2>
                    <div className="w-48 h-0.5 bg-red-600 mx-auto mb-6 md:w-180"></div>

                
                    <div className="flex flex-col items-center">
                        {/* Columna izquierda - Imagen */}
                        <Image
                            src="/subdomains/liderexperto/venta/liderExpertoMockup2.jpg"
                            alt="Libro Líder Experto"
                            width={600}
                            height={659}
                            className="w-full max-w-[400px]"
                        />
                        {/* Columna derecha - Contenido de texto */}
                        <div className='flex flex-col justify-center'>
                            <p className="font-barlow-condensed mb-6 text-3xl text-center md:text-3xl lg:text-5xl font-bold leading-[1.2] text-black">
                                No necesitas motivar más a tu equipo. Necesitas liderarlos con un sistema.
                            </p>
                            <p className="font-inter font-medium md:text-center text-xl md:text-2xl text-black">
                                Líder Experto no es un libro más con frases inspiradoras.<br/><br/>
                                Es un manual claro, práctico y accionable que puedes aplicar desde el primer capítulo.<br/><br/>
                                Te guía paso a paso para diagnosticar, estructurar, liderar y escalar tu equipo comercial, sin importar si estás empezando o ya tienes años con tu negocio.
                            </p>
                        </div>
                    </div>
                    
            </div>
        </section>
    );
};

export default BookContentSection;