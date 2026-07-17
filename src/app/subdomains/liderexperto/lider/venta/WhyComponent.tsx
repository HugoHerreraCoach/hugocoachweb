import React from "react";
import Image from "next/image";

const aspas = [
  "No es una membresía disfrazada.",
  "No hay cobros mensuales.",
  "No hay letra pequeña.",
];
const checks = [
  "Porque quiero que apliques este sistema.",
  "Porque sé lo que se siente tener un equipo que no vende como debería, y no saber por qué.",
  "Porque este libro ya ayudó a otros líderes a cambiar eso, y tú podrías ser el siguiente.",
];

export default function WhyComponent() {
  return (
    <div className="bg-white">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col">
        {/* Primera parte - No estas comprando un curso */}
        <div className="flex flex-col items-center bg-white space-y-2">
          <p className="font-inter text-black font-extrabold text-3xl md:text-4xl px-4 leading-[1.2]">
            No estás comprando un curso{" "}
            <span className="text-red-600"> • </span> No estás comprando una
            suscripción <span className="text-red-600"> • </span>
            <span className="underline">Solo estás pidiendo tu libro.</span>
          </p>
          <p className="font-inter font-regular text-black text-2xl px-4 py-4">
            Después de mostrarte todo lo que incluye esta oferta (el libro, los
            bonos, las herramientas), es normal que te preguntes:
          </p>
          <p className="bg-[#E40200] text-white font-inter font-extrabold text-2xl md:text-3xl text-center px-2 py-2">
            &quot;¿Dónde está el truco?&quot;
          </p>
          <p className="font-inter font-regular text-2xl text-black leading-[1.2] px-4 py-4">
            La respuesta es simple:{" "}
            <span className="font-bold">no hay ninguno.</span>
            <br />
            <br />
            Esto no es un curso encubierto.
          </p>

          {/* Lista de Aspas */}
          <div className="px-4">
            {aspas.map((aspa) => (
              <div key={aspa} className="flex items-start mb-4">
                <Image
                  src="/subdomains/liderexperto/venta/bladeIcon.jpg"
                  alt="Imagen de Por qué"
                  width={80}
                  height={80}
                  className="w-[24px] mr-3 mt-[2px]"
                />
                <p className="font-inter font-regular text-2xl text-black leading-[1.2]">
                  {aspa}
                </p>
              </div>
            ))}
          </div>

          <p className="font-ranga font-regular text-3xl md:text-4xl text-center text-black leading-[1] pt-2 pb-4">
            Solo cubres el costo de envío: S/19
          </p>

          <div className="hidden w-full lg:block pt-16">
            <div className="flex w-[70%] h-0.5 bg-red-600 mx-auto mb-2"></div>
            <h3 className="font-inter font-extrabold text-3xl text-center md:text-4xl text-black leading-[1] mb-3 px-8">
              ¿Por qué lo hago?
            </h3>
            <div className="w-[70%] h-0.5 bg-red-600 mx-auto mb-6 lg:mb-0"></div>
          </div>
        </div>

        {/* 2da parte - Por qué lo hago */}
        <div className="flex flex-col lg:flex-row justify-center items-center bg-white lg:gap-20 lg:pt-10 lg:pb-0">
          {/* Parte Izquierda - Imagen */}
          <Image
            src="/subdomains/liderexperto/venta/openBook.jpg"
            alt="Libro Líder Experto"
            width={700}
            height={388}
            className="w-full max-w-[400px] mb-8 lg:w-[40%]"
          />

          {/* Parte Derecha - Texto */}
          <div className="w-full lg:w-[60%]">
            <div className="lg:hidden">
              <div className="flex w-[70%]  h-0.5 bg-red-600 mx-auto mb-2"></div>
              <h2 className="font-inter font-extrabold text-3xl text-center md:text-4xl text-black leading-[1.1] mb-3">
                ¿Por qué lo hago?
              </h2>
              <div className="w-[70%]  h-0.5 bg-red-600 mx-auto mb-6"></div>
            </div>

            {/* Lista de Checks */}
            <div className="px-4">
              {checks.map((check) => (
                <div key={check} className="flex items-start py-2 md:py-4">
                  <Image
                    src="/subdomains/liderexperto/venta/checkIcon.jpg"
                    alt="Imagen de Por qué"
                    width={80}
                    height={80}
                    className="w-[26px] mr-3 mt-[2px]"
                  />
                  <p className="font-inter font-regular text-2xl text-black leading-[1.2]">
                    {check}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3ra parte - Si lo único que te detiene */}
        <div>
          <p className="font-inter font-regular text-2xl text-black leading-[1] px-4 py-4 mb-0">
            Si lo único que te detiene es la duda… te lo digo claro:
            <br />
            <br />
            <span className="font-bold">
              Esto es lo más seguro que vas a hacer por tu negocio este mes.
            </span>
            <br />
            <br />
            Haz tu pedido. Prueba el sistema.
            <br />
            <br />
            Y si no te sirve, al menos tendrás en tus manos una guía que te
            costó menos que un un combo de comida rápida…
            <br />
            <br />
            <span className="font-bold">
              pero que puede cambiar la forma en la que lideras y vendes el
              resto del año.
            </span>
          </p>
        </div>
        <a 
            className="bg-[#2375ED] hover:bg-blue-600 p-4 rounded-xl mx-auto text-center my-4 mb-10 col-span-3 text-white font-barlow font-extrabold text-2xl md:text-3xl leading-[1]"
            href="#form"
        >
            ¡OBTENER UNA COPIA GRATUITA! <br />
            <span className="font-barlow-condensed font-normal text-lg">¡Sí! ¡Quiero este Libro GRATIS!</span>
        </a>
      </div>
    </div>
  );
}
