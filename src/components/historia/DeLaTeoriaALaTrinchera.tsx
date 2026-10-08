import Image from 'next/image';

export const DeLaTeoriaALaTrinchera = () => {
    return (
        <section className="bg-white text-black py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Capítulo 5</p>
                <h2 className="mt-3 text-3xl lg:text-5xl font-extrabold text-balance">
                    Para enseñar a dirigir ventas, primero tuve que dirigir un equipo.
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-balance text-gray-700 leading-[1.4]">
                    Me hice una pregunta incómoda: <span className='font-semibold'>¿sabía yo construir ese sistema en el mundo real?</span> La respuesta honesta era no.<br /><br />
                    Mis capacitaciones eran <span className='font-semibold'>parches de motivación</span> que duraban semanas. Por integridad, no podía seguir vendiendo algo que sabía incompleto.
                </p>

                <div className="lg:grid lg:grid-cols-5 max-w-6xl mx-auto lg:gap-2 mt-6 lg:items-center">
                    <Image
                        src="/images/historia/inmobiliaria.jpg"
                        alt="Hugo Herrera liderando un equipo de ventas"
                        width={530}
                        height={734}
                        className="w-[100%] max-w-[400px] mx-auto lg:ml-6 transition-transform hover:scale-105 duration-500 rounded-xl shadow-2xl lg:col-span-2 lg:order-last"
                    />
                    <p className="mt-6 text-xl lg:text-2xl lg:text-left text-gray-700 leading-[1.4] lg:col-span-3">
                        Así que pausé mi negocio de coaching y <span className='font-semibold'>acepté un puesto de gerente de ventas</span> en una inmobiliaria.<br /><br />
                        Ahí entendí que dirigir no es dar un discurso. Es planificar, ajustar, escuchar y sostener al equipo. <span className='font-semibold'>Todos los días.</span><br /><br />
                        Apliqué mi método con ese equipo y las ventas empezaron a crecer de forma sostenida. Ahí supe que <span className='font-semibold'>tenía un sistema probado.</span>
                    </p>
                </div>


                <div className="text-center mt-8">
                    <p className="mt-4 text-xl lg:text-2xl text-gray-700 leading-[1.4]">
                        Cuando volví a asesorar, mi propósito era el mismo, pero mi forma de trabajar había cambiado.
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-4">
                        Ya no enseñaba técnicas para cerrar ventas.
                        <span className="block text-[#153eb5] mt-2">Ahora diseñaba sistemas de ventas completos.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};