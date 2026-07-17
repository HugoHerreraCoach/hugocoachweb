import React from "react";
import Image from "next/image";

const reasons = [
  "Porque conozco el contenido.",
  "Porque he visto lo que este sistema puede hacer por equipos que estaban estancados.",
  "Y porque prefiero arriesgarme yo… a que tú te quedes con la duda de si esto podría haber cambiado tus resultados.",
];

export default function WarrantySection() {
  return (
    <section className="bg-white w-full max-w-[1200px] mx-auto md:py-8">
      {/* Titulo */}
      <div className="flex w-[70%] h-0.5 bg-red-600 mx-auto mb-2"></div>
      <h2 className="font-inter font-extrabold text-3xl text-center md:text-4xl text-black leading-[1] mb-3 px-8">
        Garantía total. Cero riesgos. Solo resultados.
      </h2>
      <div className="w-[70%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

      {/* Parte responsiva */}
      <div className="flex flex-col lg:flex-row justify-center items-center bg-white pb-10 lg:gap-12 lg:pt-10 lg:pb-10">
        {/* Parte Izquierda - Imagen */}
        <Image
          src="/subdomains/liderexperto/venta/warranty.jpg"
          alt="Libro Líder Experto"
          width={500}
          height={500}
          className="w-[70%] max-w-[300px] mb-2 lg:w-[40%]"
        />

        {/* Parte Derecha - Texto */}
        <div className="w-full lg:w-[60%]">
          <p className="font-inter font-regular text-2xl text-black leading-[1.2] px-4 py-4">
            Si pides el libro, lo lees y sientes que{" "}
            <span className="font-bold">no te aportó valor real</span>, envíanos un correo electrónico a <span className="text-xl md:text-2xl text-blue-600">contacto@hugoherreracoach.com</span>{" "}
            <span className="font-bold">y te reembolsaremos tu inversión completa.</span>
            <br /><br />
            Así de simple.
          </p>
          <ul className="font-inter font-regular text-2xl text-black leading-[1.2] space-y-4 pl-10 list-disc list-outside">
            <li>No tienes que devolver el libro.</li>
            <li>No tienes que justificar nada.</li>
            <li>Sin preguntas. Sin papeleo. Sin letra chica.</li>
          </ul>
        </div>
      </div>

      {/* Titulo */}
      <div className="flex w-[70%] h-0.5 bg-red-600 mx-auto mb-2"></div>
      <h3 className="font-inter font-extrabold text-3xl text-center md:text-4xl text-black leading-[1] mb-3 px-8">
        ¿Por qué me atrevo a darte esta garantía?
      </h3>
      <div className="w-[70%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>

      {/* Bullets points */}
      <div className="p-4 px-8 max-w-[900px] mx-auto">
        {reasons.map((reason) => (
          <div key={reason} className="flex items-start mb-4 lg:py-2">
            <Image
              src="/subdomains/liderexperto/venta/bulletPointIcon.jpg"
              alt="Icono bullet point"
              width={80}
              height={80}
              className="w-[24px] mr-3 mt-[2px]"
            />
            <p className="font-inter font-regular text-2xl text-black leading-[1.2]">
              {reason}
            </p>
          </div>
        ))}
      </div>

      {/* Linea horizontal */}
      <div className="h-px w-[90%] bg-black mx-auto mt-10"></div>
      <p className="font-inter font-regular text-2xl px-8 py-8 text-black leading-[1] whitespace-pre-line lg:pt-20">
        Si llegaste hasta aquí, ya sabes que tu equipo puede dar mucho más.
        <br />
        <br />
        Y que lo único que te está faltando es estructura, dirección y
        herramientas reales.
        <br />
        <br />
        Eso es exactamente lo que te llevas con esta oferta:
      </p>
    </section>
  );
}
