"use client"
import Image from "next/image"

export default function CallToAction() {
  return (
    <section className="bg-[#fafafa] pt-16 pb-0 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Columna izquierda - Contenido principal */}
        <h2 className="text-4xl md:text-4xl text-center font-extrabold text-black">
            Si esto tiene sentido para ti, quiero darte algo más
        </h2>

        {/* texto */}
        <p className="text-xl md:text-2xl pt-8 font-medium text-black px-4">
          Todo lo que viste en este video <span className="font-bold underline">es solo el inicio</span><br/><br/>
          Después de trabajar con tantos equipos, entendí que <span className="font-bold">muchos dueños de negocio tienen claro lo que quieren... pero no cómo lograrlo.</span><br/><br/>
          Por eso decidí <span className="font-bold">reunir todo lo que funciona </span>—de forma clara, sin rodeos— en un material que puedas aplicar desde el primer día.
        </p>

        {/* Imagen del libro */}
        <Image
            src="/subdomains/liderexperto/preventa/liderExpertoMockup.jpg"
            alt="Libro Lider Experto"
            width={660}
            height={371}
            className="w-[90%] max-w-[600px] justify-self-center"
        />

        {/* texto */}
        <p className="text-xl md:text-2xl font-medium text-black px-4 md:pb-8">
          Es un libro físico, diseñado especialmente para dueños de negocio como tú, que quieren dejar atrás los altibajos y construir un equipo que venda bien, todos los meses.<br/><br/>
          En el siguiente paso <span className="font-bold">te voy a mostrar cómo puedes obtenerlo sin pagar por el contenido. </span>Solo cubres el envío, y te lo mando a donde estés.
        </p>    

      </div>
    </section>
  )
}
