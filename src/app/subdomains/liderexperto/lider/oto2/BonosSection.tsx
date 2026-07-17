import Image from "next/image"

const temas = [
    {
        id: 1,
        text: <>Sientes que estás cobrando menos de lo que deberías</>,
    },
    {
        id: 2,
        text: <>Quieres subir precios, pero te da miedo perder ventas</>,
    },
    {
        id: 3,
        text: <>Ofreces un gran valor… pero no sabes cómo justificarlo</>,
    },
    {
        id: 4,
        text: <>Estás cansado de competir solo por ser “más barato”</>,
    },
    {
        id: 5,
        text: <>Quieres construir un negocio rentable, no solo sobrevivir</>,
    },
]

export default function BonosSection() {
    return (
        <div>
            <section className="bg-[#0E203A] p-4 text-white flex flex-col justify-center items-center text-center lg:py-14">    
                {/* Primera parte - Qué es el programa */}
                <div className="w-full py-10 flex flex-col items-center">
                    {/* Titulo 2 */}
                    <div className="flex w-[80%] h-0.5 bg-red-600 mx-auto"></div>
                    <h2 className="w-full font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                        Bonos Incluidos
                    </h2>
                    <div className="w-[80%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                    {/* Tarjetas bonos */}
                    <div className="w-full grid justify-center gap-8 pt-4 grid-cols-[repeat(auto-fit,minmax(250px,300px))] lg:pt-16">
                        <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                            <Image 
                                src="/subdomains/liderexperto/pricing/bono1.jpg"
                                alt="bono 2"
                                width={400}
                                height={530}
                                className="w-[150px] mx-auto pb-4"
                            />
                            <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                                Plantilla de diseño de Escalera de Valor
                            </p>
                        </div>
                        <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                            <Image 
                                src="/subdomains/liderexperto/pricing/bono2.jpg"
                                alt="bono 2"
                                width={400}
                                height={550}
                                className="w-[150px] mx-auto pb-4"
                            />
                            <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                                Matriz para construir tu oferta irresistible
                            </p>
                        </div>
                        <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                            <Image 
                                src="/subdomains/liderexperto/pricing/bono3.jpg"
                                alt="bono 3"
                                width={400}
                                height={525}
                                className="w-[170px] mx-auto pb-4"
                            />
                            <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                                Guías de guiones para presentar precios y cerrar premium
                            </p>
                        </div>
                        <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                            <Image 
                                src="/subdomains/liderexperto/pricing/bono4.jpg"
                                alt="bono 4"
                                width={400}
                                height={600}
                                className="w-[150px] mx-auto pb-4"
                            />
                            <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                                Plantilla para calcular valor percibido y rentabilidad
                            </p>
                        </div>
                        <div className={"border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]"}>
                            <Image 
                                src="/subdomains/liderexperto/pricing/bono5.jpg"
                                alt="bono 5"
                                width={400}
                                height={514}
                                className="w-[180px] mx-auto pb-4"
                            />
                            <p className="font-montserrat font-semibold text-xl leading-[1.2] pb-2">
                                Acceso de por vida al contenido en plataforma privada
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full max-w-[1000px] mx-auto py-10 px-4 flex flex-col items-center">
                {/* Titulo 1 */}
                <div className="flex w-[80%] h-0.5 bg-red-600 mx-auto"></div>
                <h3 className="font-inter font-extrabold text-3xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    Este curso es para ti si:
                </h3>
                <div className="w-[80%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                {/* Bullets Points */}
                <div className="grid lg:grid-cols-2 pb-12 lg:gap-x-8 px-4 md:px-8 lg:pt-12 lg:pb-20">
                    {temas.map((tema) => (
                        <div key={tema.id} className="flex items-start justify-start text-left py-2">
                            <Image
                                src="/subdomains/liderexperto/pricing/checkIcon.jpg"
                                alt="Icono de check"
                                width={100}
                                height={100}
                                className="w-[20px] mr-2"
                            />
                            <p className="font-montserrat font-medium text-xl md:text-2xl leading-[1.2]">
                                {tema.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#0E203A] p-4 py-8 text-white flex flex-col justify-center items-center text-center lg:py-10">
                <p className="font-barlow font-black text-3xl md:text-4xl lg:text-5xl">
                    INVERSIÓN ÚNICA
                </p>
            </section>
        </div>
        
    )
}
