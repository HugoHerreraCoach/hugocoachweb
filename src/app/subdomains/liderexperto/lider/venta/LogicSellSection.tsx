import Image from "next/image";

export default function LogicSellSection() {
  return (
    <section>
      {/* Primera parte - Fondo blanco */}
      <div className="bg-white py-8 px-8 text-black max-w-[960px] mx-auto lg:text-center">
        <p className="font-inter font-semibold text-3xl italic leading-[1.2] pb-6">
          S/19 es menos de lo que te cuesta un combo de comida rápida.
        </p>
        <p className="font-inter font-regular text-2xl leading-[1.2] pb-6">
          Pero lo que vas a descubrir aquí puede liberarte de años de frustración comercial y darte el control de tu negocio que tanto buscas.
          <br />
          <br />
          Este es el sistema que me hubiera cambiado la vida si lo hubiera tenido desde el primer día.
        </p>
        <p className="font-inter font-semibold text-3xl leading-[1.2] pb-6">
          Haz clic. Pide tu libro.
        </p>
        <p className="font-inter font-regular text-2xl leading-[1.2] pb-6">
          Y empieza hoy mismo a construir un equipo que venda más y funcione sin
          ti.
        </p>
        <p className="font-inter font-bold text-2xl text-center leading-[1.2] p-6 border-2 border-dotted border-red-500">
          Decisiones como esta separan a los líderes que avanzan… de los que se
          quedan esperando.
        </p>
      </div>

      {/* Segunda parte - Fondo negro */}
      <div className="bg-black">
        <div className="flex flex-col max-w-[1200px] mx-auto px-4 mt-[150px] lg:mt-12 md:px-8 lg:flex-row lg:gap-20 lg:py-12 items-center justify-center">
          
          {/* Parte Izquierda - Imagen + texto + cuadro */}
          <div className="flex flex-col mt-[-150px] lg:mt-0 lg:w-[50%] items-center text-white">
            <Image
              src="/subdomains/liderexperto/venta/handBook.png"
              alt="Libro lider Experto en mano"
              width={700}
              height={700}
              className="w-[90%] max-w-[500px]"
            />
            <p className="font-inter font-medium text-xl md:text-2xl py-4">
              Esta oferta no estará disponible para siempre.
            </p>
            <p className="font-ranga font-regular text-center text-4xl md:text-5xl text-white p-4 px-6 bg-[#E40200]">
              100 Unidades Disponibles
            </p>
          </div>

          {/* Parte Derecha - Texto complementario */}
          <div className="flex flex-col lg:w-[50%] text-white">
            <p className="font-inter font-medium text-xl md:text-2xl pt-8">
              Cuando se acaben las copias físicas actuales, el precio subirá o
              el libro pasará a formar parte de un programa más completo con
              otro valor.
            </p>
            <p className="font-inter font-extrabold text-2xl md:text-3xl py-6">
              ¿Por qué?
            </p>
            <p className="font-inter font-medium text-xl md:text-2xl">
              Porque quienes ya aplicaron este sistema están obteniendo
              resultados reales.
              <br />
              <br />Y porque el contenido que estás a punto de recibir vale
              mucho más que lo que estás invirtiendo hoy.
            </p>
            <div className="h-px w-[90%] bg-white mx-auto mt-10"></div>
            <p className="font-inter font-medium text-xl md:text-2xl py-4 text-center">
              Hoy, puedes llevarte todo:
            </p>
            <ul className="font-inter font-medium max-w-[450px] md:mx-auto text-xl md:text-2xl list-disc list-outside pl-12">
              <li>El libro físico Líder Experto,</li>
              <li>Las herramientas,</li>
              <li>Los scripts,</li>
              <li>Los diagnósticos,</li>
              <li>Las plantillas…</li>
              <li>Y el sistema completo…</li>
            </ul>
            <div className="py-6 flex flex-col items-center">
              <p className="font-inter font-bold text-2xl md:text-3xl text-black leading-[1.2] bg-[#fafafa] shadow-xl rounded-2xl px-10 py-6 max-w-[520px] text-center mb-[-100px] lg:mb-0">
                <span className="italic">Por solo S/19. </span>Solo el costo de
                envío. Nada más.
              </p>
            </div>
          </div>
        </div>

        {/* Tercera parte - Fondo blanco */}
        <div className="bg-white px-4 py-12 pt-[112px] lg:pt-12">
          <div className="max-w-[1200px] mx-auto">
            <p className="font-inter font-medium text-2xl text-black leading-[1] md:text-center">
              Si después de todo lo que viste todavía estás dudando…<br /><br />
              <span className="font-bold">tal vez este libro es exactamente lo que necesitas.</span><br /><br />
              Porque un verdadero líder no espera a sentirse listo.<br /><br />
              <span className="font-bold">Decide. Implementa. Y mejora.</span><br /><br />
              Haz clic. Pide tu copia.<br /><br />
              Y empieza hoy mismo a liderar un equipo que vende más, responde mejor y crece contigo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
