import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Libro físico LÍDER EXPERTO",
    value: 80,
  },
  {
    id: 2,
    name: "Scripts de ventas (WhatsApp, llamada y presencial)",
    value: 47,
  },
  {
    id: 3,
    name: "Plantillas de seguimiento",
    value: 37,
  },
  {
    id: 4,
    name: "Mapa definitivo para manejar objeciones",
    value: 67,
  },
  {
    id: 5,
    name: "Radiografía Comercial (3 fases + 15 errores)",
    value: 57,
  },
  {
    id: 6,
    name: "Guía de 50 preguntas para calificar clientes",
    value: 27,
  },
];

export default function StackSection() {
  return (
    <section className="bg-white pt-[12%] md:pt-[10%] lg:pt-[8%]">
      {/* Contenedor Stack*/}
      <div className="pt-4 px-2 pb-8">
        {/* Cabecera de Stack - Parte negra*/}
        <div className="bg-black shadow-xl w-full max-w-[920px] mx-auto rounded-t-3xl flex flex-col justify-center items-center">
          <Image
            src="/subdomains/liderexperto/venta/bonusMockup3.png"
            alt="Bonos de líder experto"
            width={700}
            height={298}
            className="w-[90%] max-w-[700px] mt-[calc(-15%)]"
          />
          <p className="font-inter font-bold px-4 text-2xl md:text-3xl text-center text-white">
            Déjame mostrarte <span className="italic">LO QUE TE LLEVAS</span>
          </p>
          <div className="h-[4px] w-full bg-[#E40200] mx-auto mt-4"></div>
        </div>

        {/* Cuerpo de Stack - Parte ploma*/}
        <div className="bg-[#fafafa] shadow-xl w-full max-w-[920px] mx-auto px-4 py-6 md:px-20">
          <div className="flex flex-col">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-start py-2"
              >
                <div className="flex w-[80%] items-start justify-start">
                  <Image
                    src="/subdomains/liderexperto/venta/checkIcon2.jpg"
                    alt="Icono check"
                    width={80}
                    height={80}
                    className="w-[22px] mr-3 mt-[2px]"
                  />
                  <p className="font-montserrat font-medium text-black text-xl md:text-2xl">
                    {product.name}
                  </p>
                </div>
                <p className="w-[20%] font-montserrat font-bold text-[#E40200] text-xl md:text-2xl">
                  S/{product.value} (Valor)
                </p>
              </div>
            ))}
            <p className="font-montserrat font-bold text-center text-2xl md:text-3xl pt-4 text-[#E40200]">
              Valor total: <span className="line-through">S/315.00</span>
            </p>
            <p className="font-montserrat font-semibold text-center text-2xl md:text-3xl text-black">
              Hoy, te llevas todo esto:
            </p>
            <p className="font-montserrat font-black text-center py-4 text-5xl md:text-7xl text-[#04B40F]">
              ¡GRATIS!
            </p>
            <p className="font-montserrat font-medium text-center text-lg md:text-xl text-black">
              Solo cubres el envío. Nada más.
            </p>
            <a
              className="bg-[#2375ED] p-4 rounded-xl mx-auto my-4 text-center text-white font-barlow font-extrabold text-2xl md:text-3xl leading-[1] hover:bg-blue-600"
              href="#form"
            >
              ¡Reclamar oferta ahora!
              <br />
              <span className="font-barlow-condensed font-normal text-lg">
                ¡SÍ! ¡Quiero este libro GRATIS!
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
