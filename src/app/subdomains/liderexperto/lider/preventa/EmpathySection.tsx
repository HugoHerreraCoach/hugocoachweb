"use client"
import Image from "next/image"

export default function EmpathySection() {
  return (
    <section className="bg-[#fafafa] flex flex-col items-center mx-auto py-8 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 max-w-[1200px] lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Columna izquierda - Imagen */}
          {/* Imagen principal */}
          <Image
              src="/subdomains/liderexperto/preventa/frustrated.jpg"
              alt="Hugo Herrera"
              width={600}
              height={344}
              className="rounded-xl overflow-hidden"
          />

          {/* Columna derecha - Contenido */}
          <div className="order-2 lg:order-2 space-y-6">
            {/* Título principal */}
            <h3 className="font-inter text-center lg:text-left text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
              No eres el único...
              <br />y no es tu culpa.
            </h3>

            {/* Contenido de texto */}
            <p className="font-montserrat font-medium text-black text-xl py-4 leading-[1.2]">
              Muchos dueños de negocio con los que he trabajado estaban en la misma situación:<br/><br/>
              <span className="font-montserrat font-bold underline">con buenos vendedores, buenos productos...pero sin resultados constantes.</span><br/><br/>
              Habían probado <span className="font-bold">motivar, capacitar, incluso cambiar gente. </span>Pero nada parecía funcionar de forma sostenida.<br/><br/>
              Y sentían que, si ellos no estaban detrás de cada detalle, las ventas simplemente no estaban.<br/><br/>
              Esa sensación <span className="font-bold"> frustra, agota... y hace dudar </span>incluso de lo que uno está construyendo.<br/><br/>
              Pero no por qué ser así.<br/><br/>
              <span className="font-bold">Cuando entiendes qué está fallando —y lo corriges— todo cambia.</span><br/><br/>
              Lo he visto muchas veces: equipos que antes dependían de la suerte, hoy venden con claridad, ritmo y sin tanto desgaste.
            </p>
            
          </div>
        </div>
    </section>
  )
}
