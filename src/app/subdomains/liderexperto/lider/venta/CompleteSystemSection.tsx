import React from 'react';
import Image from 'next/image';

const CompleteSystemSection: React.FC = () => {
    return (
        <section className=" bg-black py-12 px-4 rounded-t-[40px] lg:pt-20">
            {/* Título */}
            <p className="font-barlow-condensed font-bold text-3xl md:text-4xl lg:text-5xl max-w-[1200px] mx-auto text-center text-white leading-[1.1]">
                No te llevas solo un libro.<br/> 
                Te llevas el <span className="text-[#E40200] underline">sistema completo</span>para convertir a tu equipo en una <span className="text-[#E40200] underline">máquina de ventas.</span>
            </p>

            {/* Parte Responsiva */}
            <div className="flex flex-col lg:flex-row lg:py-16 max-w-[1200px] mx-auto">
                {/* Columna Izquieda - Imagen */}
                <Image 
                    src="/subdomains/liderexperto/venta/bonosMockup.jpg"
                    alt="Bonos de Lider Experto"
                    width={700}
                    height={344}
                    className='w-[90%] mx-auto max-w-[500px] py-4'
                />

                {/* Columna Derecha - Texto */}
                <p className="font-inter font-medium text-white text-xl leading-[1.2] px-8 lg:text-2xl">
                    El libro Líder Experto te entrega la estrategia.<br/><br/>
                    Pero los bonos… <span className='font-bold'>te dan la ejecución.</span><br/><br/>
                    Son herramientas prácticas que uso con mis clientes privados para que implementes más rápido y sin depender de nadie.<br/><br/>
                    Hoy, al pedir tu copia, te los llevas todos <span className='underline'>GRATIS</span>.
                </p>
            </div>
        </section>
    );
};

export default CompleteSystemSection;