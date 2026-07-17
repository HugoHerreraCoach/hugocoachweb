"use client";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#fafafa] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1200px] flex flex-col items-center mx-auto">
        {/* Título con subrayado rojo */}
        <div className="flex w-[90%] h-0.5 bg-red-600 mx-auto"></div>
        <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold text-black leading-[1] text-center my-2 md:my-3">
          Es momento de <span className="text-red-600">liderar</span> de una
          forma distinta.
        </h2>
        <div className="w-[90%] h-0.5 bg-red-600 mx-auto mb-4 lg:mb-0"></div>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl font-medium text-black py-4 md:py-8">
          Si llegaste hasta aquí, es porque algo<span className="font-bold"> te hizo clic.</span>
        </p>

        {/* Lista con puntos rojos */}
        <div className="space-y-4 max-w-[1000px]">
          <div className="flex items-start pl-2 pb-4">
            <div className="w-4 h-4 rounded-full bg-red-600 mt-1.5 mr-3 flex-shrink-0"></div>
            <p className="font-medium text-xl md:text-2xl leading-[1.2] text-black">
              Tal vez estás cansado de intentar una cosa tras otra, esperando que tu equipo finalmente despegue.
            </p>
          </div>

          <div className="flex items-start pl-2">
            <div className="w-4 h-4 rounded-full bg-red-600 mt-1.5 mr-3 flex-shrink-0"></div>
            <p className="font-medium text-xl md:text-2xl leading-[1.2] text-black">
              Tal vez ya te diste cuenta de que<span className="font-bold"> no necesitas trabajar más... necesitas trabajar con más dirección.</span>
            </p>
          </div>
        </div>

        {/* Texto explicativo */}
        <div className="space-y-4 pt-6">
          <p className="font-medium text-xl md:text-2xl text-black leading-[1.3]">
            Lo que viene no es una promesa mágica.<br/><br/>
            Es una forma distinta de liderar, basada en claridad, estructura y resultados reales.<br/><br/>
            Y si estás listo para eso, entonces este es tu siguiente paso.<br/><br/>
            Porque no se trata solo de vender más este mes…<br/><br/>
            Se trata de construir un equipo que venda bien todos los meses, con o sin ti.
          </p>
        </div>
        {/* Botón CTA */}
        <Link href="/" className="flex items-center justify-center hover:bg-green-700  font-barlow-condensed mt-8 font-bold text-xl md:text-2xl p-4 md:px-10 bg-green-600 border-b-6 border-[#00960B]  text-white rounded-lg cursor-pointer">
            MUÉSTRAME CÓMO APLICAR EL SISTEMA
        </Link>
      </div>
    </section>
  );
}
