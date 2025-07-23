import Image from 'next/image';

export const DeLaTeoriaALaTrinchera = () => {
    return (
        <section className="bg-white text-black py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 text-center">
                <h2 className="text-3xl lg:text-5xl font-extrabold">
                    Para arreglar el motor, tuve que convertirme en mecánico
                </h2>
                <p className="mt-6 text-xl lg:text-2xl text-balance text-gray-700 leading-[1.4]">
                    Esa revelación me enfrentó a una verdad incómoda: si la solución era un sistema, <span className='font-semibold'>¿sabía yo construir uno desde cero en el mundo real?</span> La respuesta honesta era no.<br /><br />
                    Y eso me puso en una encrucijada. Mi objetivo siempre fue ayudar de verdad a las empresas, pero me di cuenta de que mis capacitaciones se habían convertido en simples <span className='font-semibold'>‘parches’ de motivación.</span><br /><br />
                    La energía que generaba en los equipos se desvanecía en semanas. No era una transformación real y, por integridad, no podía seguir vendiendo una solución que sabía que estaba incompleta.<br />
                </p>

                <div className="lg:grid lg:grid-cols-5 max-w-6xl mx-auto lg:gap-2 mt-6 lg:items-center">
                    <Image
                        src="/images/inmobiliaria.jpg"
                        alt="Hugo Herrera liderando un equipo de ventas"
                        width={530}
                        height={734}
                        className="w-[100%] max-w-[400px] mx-auto lg:ml-6 transition-transform hover:scale-105 duration-500 rounded-xl shadow-2xl lg:col-span-2 lg:order-last"
                    />
                    <p className="mt-6 text-xl lg:text-2xl lg:text-left text-gray-700 leading-[1.4] lg:col-span-3">
                        Así que tomé la decisión más radical y valiosa de mi carrera: puse en pausa mi negocio de coaching y <span className='font-semibold'>acepté un puesto como gerente de ventas.</span><br /><br />
                        Necesitaba dejar la teoría y meterme en la trinchera para aprender, desde adentro, cómo funcionaba un verdadero motor comercial.<br /><br />
                        Fue ahí donde todo cobró sentido. Descubrí que liderar no es dar un discurso; es planificar, ajustar, escuchar y sostener al equipo. <span className='font-semibold'>Todos los días.</span><br /><br />
                        Apliqué mi método con el equipo de la inmobiliaria y los resultados fueron claros: las ventas comenzaron a crecer de forma sostenida. Con esa validación en el campo de batalla, supe que <span className='font-semibold'>tenía un sistema probado.</span>
                    </p>
                </div>


                <div className="text-center mt-8">
                    <p className="mt-4 text-xl lg:text-2xl text-gray-700 leading-[1.4]">
                        Cuando volví a asesorar, mi propósito era el mismo, pero mi método se había transformado.
                    </p>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-4">
                        Ya no enseñaba técnicas para cerrar ventas.
                        <span className="block text-[#153eb5] mt-2">Ahora diseñaba sistemas comerciales completos.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};