import Image from "next/image"

const cards = [
    {
        id: 1,
        src: "/subdomains/liderexperto/lobosDownsell/videoIcon.jpg",
        alt: "Icono de video",
        title: "Más de 500 videos cortos y didácticos:",
        text: "Accede a lecciones prácticas que puedes aplicar de inmediato.",
    },
    {
        id: 2,
        src: "/subdomains/liderexperto/lobosDownsell/papersIcon.jpg",
        alt: "Icono de papeles",
        title: "Modelos de scripts de ventas:",
        text: "Optimiza tus conversaciones con clientes potenciales",
    },
    {
        id: 3,
        src: "/subdomains/liderexperto/lobosDownsell/boardIcon.jpg",
        alt: "Icono de tablero",
        title: "Ejercicios prácticos:",
        text: "Interioriza cada concepto y mejora tus habilidades.",
    },
    {
        id: 4,
        src: "/subdomains/liderexperto/lobosDownsell/clickIcon.jpg",
        alt: "Icono de click",
        title: "Acceso a recursos y herramientas exclusivas:",
        text: "Potencia tu aprendizaje con materiales adicionales.",
    },
]

export default function DescriptionProgram() {
    return (
        <section className="bg-black p-4 text-white flex flex-col justify-center items-center text-center lg:py-14">
            
            {/* Primera parte - Qué es el programa */}
            <div className="w-full max-w-[1000px] py-10 flex flex-col items-center">
                {/* Titulo */}
                <div className="flex w-[80%] h-0.5 bg-red-600 mx-auto"></div>
                <h2 className="font-inter font-extrabold text-2xl text-center md:text-4xl lg:text-5xl leading-[1] my-2 md:my-3">
                    ¿Qué es el Programa Lobos de Ventas?
                </h2>
                <div className="w-[80%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                {/* Parte responsiva */}
                <div className="flex flex-col items-center lg:flex-row lg:gap-10 lg:py-16">
                    <Image 
                        src="/subdomains/liderexperto/lobosDownsell/lobosMockup.jpg"
                        alt="Programa Lobos de Ventas"
                        width={700}
                        height={329}
                        className="w-[90%] lg:w-[40%]  max-w-[700px] py-4"
                    />
                    <p className="font-montserrat font-medium lg:w-[60%] text-xl md:text-2xl leading-[1.2]">
                        Lobos de Ventas es el programa de capacitación más completo en español para formar vendedores de alto rendimiento en 30 días.<br/><br/>  
                        Utilizado por los mejores equipos de ventas en Latinoamérica.
                    </p>
                </div>
                
            </div>

            {/* Segunda parte - Contenido del programa */}
            <div className="w-full flex flex-col items-center text-white pb-10">
                <h2 className="font-barlow font-black text-4xl lg:text-5xl underline decoration-2 px-6 pb-10">
                    Contenido del Programa
                </h2>

                {/* Tarjetas */}
                <div className="w-full grid justify-center gap-8 grid-cols-[repeat(auto-fit,minmax(250px,300px))]">
                    {cards.map((card) => (
                        <div key={card.id} className={`border-1 rounded-xl p-8 min-[300px]`}>
                            <Image 
                                src={card.src}
                                alt={card.alt}
                                width={250}
                                height={250}
                                className="w-[80px] mx-auto pb-4"
                            />
                            <p className="font-barlow font-bold text-xl">
                                {card.title}
                            </p>
                            <p className="font-barlow font-medium text-xl">
                                {card.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            




        </section>
    )
}
