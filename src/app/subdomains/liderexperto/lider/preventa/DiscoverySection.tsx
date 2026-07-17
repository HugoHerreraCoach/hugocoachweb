"use client"
import Image from "next/image"


const discoveries = [
    {
        id: "1",
        src: "/subdomains/liderexperto/preventa/stepOneIcon.jpg",
        width: 350,
        height: 92,
        text: "Por qué tu equipo no está vendiendo como debería, aunque ya hayas probado motivarlos o capacitarlos.",
    },
    {
        id: "2",
        src: "/subdomains/liderexperto/preventa/stepTwoIcon.jpg",
        width: 350,
        height: 90,
        text: "El error silencioso que cometen muchos dueños de negocio sin darse cuenta... y que les cuesta miles en ventas perdidas.",
    },
    {
        id: "3",
        width: 350,
        height: 101,
        src: "/subdomains/liderexperto/preventa/stepThreeIcon.jpg",
        text: "Qué hacen diferente las empresas que venden bien todos los meses, sin vivir con esa incertidumbre constante.",
    },
    {
        id: "4",
        width: 350,
        height: 101,
        src: "/subdomains/liderexperto/preventa/stepFourIcon.jpg",
        text: "Por qué más técnica o más presión no son la solución, y qué deberías hacer en su lugar.",
    },
    {
        id: "5",
        width: 350,
        height: 100,
        src: "/subdomains/liderexperto/preventa/stepFiveIcon.jpg",
        text: "Cómo empezar a construir un equipo que venda de forma estable, sin tener que cambiar a todos tus vendedores.",
    },
]

export default function DiscoverySection() {

    return (
        <section className="bg-black text-white px-4 md:px-8 lg:px-12">

            <div className="flex flex-col max-w-[1200px] mx-auto items-center pt-10 px-4">

                <div className="flex w-[90%] h-0.5 bg-red-600 mx-auto"></div>
                <p className="font-barlow-condensed font-extrabold text-3xl md:text-5xl mb-2 ">
                    En el video vas a descubrir...
                </p>
                <div className="w-[90%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

                    

                <div className="w-full grid justify-center gap-8 pt-4 grid-cols-[repeat(auto-fit,minmax(250px,300px))] lg:pt-16">
                    {discoveries.map((item) => (
                        <div key={item.id} className="border-2 flex flex-col justify-center border-dotted rounded-xl p-8 max-w-[300px]">
                            <Image 
                                src={item.src}
                                alt="Imagen"
                                width={item.width}
                                height={item.height}
                                className="w-[150px] lg:w-[180px] mx-auto pt-4 pb-6"
                            />
                            <p className="font-barlow font-medium text-xl lg:text-2xl leading-[1.3] pb-2">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Encabezado */}
            <div
                className="bg-[#fafafa] mt-10  w-full  text-center border-t border-gray-300 border-b-0 rounded-t-2xl rounded-b-none p-6 pt-8 mb-[-60px]"
            >
                <h2 className="text-xl md:text-3xl lg:text-4xl text-black font-montserrat font-medium leading-[1.2]">
                    ¿Quién soy yo y
                </h2>
                <h2 className="text-2xl md:text-4xl lg:text-5xl text-black font-montserrat font-bold leading-[1.2]">
                    por qué puedo ayudarte?
                </h2>

            </div>

        </section>
    )
}

