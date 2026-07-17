"use client"
import Image from "next/image"
import Link from "next/link"


const problems = [
    {
      imageSrc: "/subdomains/liderexperto/preventa/teamIcon.jpg",
      text: "Tienes vendedores, pero sientes que podrían dar mucho más.",
      borderColor: "border-red-600", 
    },
    {
      imageSrc: "/subdomains/liderexperto/preventa/unstableIcon.jpg",
      text: "Tus ventas suben un mes y bajan al siguiente, sin razón clara.",
      borderColor: "border-white", 
    },
    {
      imageSrc: "/subdomains/liderexperto/preventa/teachingIcon.jpg",
      text: "Ya probaste motivarlos, capacitarlos o incluso cambiar personas... pero los resultados no se mantienen.",
      borderColor: "border-red-600", 
    },
    {
      imageSrc: "/subdomains/liderexperto/preventa/delegationIcon.jpg",
      text: "Estás siempre pendiente del equipo, porque si tú no estás, las cosas no avanzan.",
      borderColor: "border-white", 
    },
    {
      imageSrc: "/subdomains/liderexperto/preventa/frustratedIcon.jpg",
      text: "Sabes que algo no está funcionando, pero no logras identificar qué es.",
      borderColor: "border-red-600", 
    },
];

export default function ProblemsSection() {
  return (
    <section className="bg-black py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Grid responsivo para las tarjetas de problemas */}
        <div className="w-full grid justify-center gap-8 pt-4 grid-cols-[repeat(auto-fit,minmax(250px,300px))] lg:pt-16">
          {problems.map((problem, index) => (
            <div key={index} className={`bg-black border-2 flex flex-col items-center ${problem.borderColor} rounded-lg p-6 text-center min-h-[200px]`}>
              <Image
                src={problem.imageSrc || "/placeholder.svg"}
                alt={`Problema ${index + 1}`}
                width={140}
                height={140}
                className="w-[100px] my-4"
              />
              <p className="text-white font-inter font-medium text-xl leading-[1.2]">{problem.text}</p>
            </div>
          ))}
        </div>

        {/* Testimonial y botón */}
        <div className="flex flex-col items-center text-center pt-12 space-y-6">
          {/* Testimonial */}
            <p className="font-medium italic text-white text-xl md:text-2xl leading-[1.4] mb-4">
              &quot;Antes sentía que tenía que estar encima de todo para que el equipo venda. Probamos capacitaciones, charlas, bonos… y nada funcionaba por mucho tiempo. Con el sistema que aprendimos con Hugo, todo cambió. Ahora las ventas son más constantes, y yo tengo más claridad y control que nunca.&quot;
            </p>
            <p className="text-white text-lg md:text-xl font-medium">— Abey Díaz, Gerente de Ventas</p>

          {/* Botón de llamada a la acción */}
          <Link href="#descubre" className="flex items-center justify-center font-barlow-condensed font-bold text-2xl md:text-3xl p-4 px-8 md:px-10 bg-green-600 border-b-6 border-[#00960B] hover:bg-green-700  text-white rounded-lg cursor-pointer">
              VER VIDEO COMPLETO
              <Image 
                  src="/subdomains/liderexperto/preventa/arrowRightIcon.png"
                  alt="Icono derecha"
                  width={80}
                  height={80}
                  className="w-6 md:w-8 ml-2 mt-[2px]"
              />
          </Link>

        </div>
      </div>
    </section>
  )
}
