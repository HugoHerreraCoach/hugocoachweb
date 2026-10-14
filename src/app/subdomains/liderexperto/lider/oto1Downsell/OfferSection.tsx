"use client"
import Image from "next/image";
import Link from "next/link";
import { PRODUCTOS_LE } from "@liderexperto/lib/productos";
import OfertaUpsell from "@liderexperto/components/OfertaUpsell";

const products = [
  {
    id: 1,
    name: "Programa completo (acceso de por vida)",
    value: "1,100",
  },
  {
    id: 2,
    name: "Talleres en vivo por 1 año",
    value: "1,200",
  },
  {
    id: 3,
    name: "Libro digital &quot;Cerrador Experto&quot;",
    value: "100",
  },
  {
    id: 4,
    name: "Comunidad privada en WhatsApp",
    value: "300",
  },
];

export default function OfferSection() {
  return (
    <>
      <section className="flex flex-col justify-center items-center text-center pb-16">
        {/* Primera parte Negra */}
        <div className="bg-black w-full h-[20vh] mb-[-12vh]"></div>
        <div className="px-4">
          {/* Cabecera de Stack - Parte negra*/}
          <div className="bg-white shadow-xl w-full max-w-[920px] mx-auto rounded-t-3xl flex flex-col justify-center items-center">
            <Image
              src="/subdomains/liderexperto/lobosDownsell/lobosMockup2.png"
              alt="Bonos de líder experto"
              width={800}
              height={378}
              className="w-[80%] max-w-[620px] mt-[-8vh] mb-6"
            />
            <p className="font-inter font-black px-4 text-2xl md:text-3xl text-center text-black">
              RESUMEN DE LO QUE OBTENDRÁS
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
                  <div className="flex w-[80%] md:w-[73%] items-start justify-start">
                    <Image
                      src="/subdomains/liderexperto/venta/checkIcon2.jpg"
                      alt="Icono check"
                      width={80}
                      height={80}
                      className="w-[22px] mr-3 mt-[2px]"
                    />
                    <p className="font-montserrat font-medium text-black text-left text-xl md:text-2xl">
                      {product.name}
                    </p>
                  </div>
                  <p className="w-[20%] md:w-[27%] font-montserrat font-bold text-[#E40200] text-xl md:text-2xl">
                    S/{product.value} (Valor)
                  </p>
                </div>
              ))}
              <p className="font-montserrat font-bold text-center text-xl md:text-2xl pt-4 text-black">
                Valor real: <span className="line-through">S/2,700</span>
              </p>
              <p className="font-montserrat font-bold text-center text-xl md:text-2xl pt-0 pb-6 text-[#E40200]">
                Valor con Oferta: S/497
              </p>
              <p className="font-montserrat font-extrabold text-center text-3xl md:text-4xl text-black">
                Acceder Hoy por <span className="underline">3 cuotas</span> de
              </p>
              <p className="font-montserrat font-black text-center py-4 text-7xl md:text-8xl text-[#04B40F]">
                S/167
              </p>

              {/* Cobro con 1 clic (tarjeta guardada al pagar el libro) o formulario seguro de Stripe */}
              <div className="mx-auto my-4">
                <OfertaUpsell
                  productId={PRODUCTOS_LE.LOBOS_CUOTAS}
                  monto={167}
                  descripcion="Programa Lobos de Ventas (oferta en 3 cuotas)"
                  exitoUrl="/gracias"
                  showIcon={false}
                  buttonClassName="bg-[#2375ED] p-4 rounded-xl text-white cursor-pointer block"
                >
                  <span className="font-barlow font-extrabold text-2xl md:text-3xl leading-[1]">
                    ¡Reclamar oferta ahora!<br/>
                    <span className="font-barlow-condensed font-normal text-lg">¡SÍ! Quiero el programa en 3 cuotas</span>
                  </span>
                </OfertaUpsell>
              </div>

              <p className="font-montserrat font-normal text-black text-normal md:text-xl leading-[1.2]">
                  🔒 Pago 100% seguro y encriptado. <span className="font-semibold">Garantía de satisfacción por 7 días.</span>
              </p>
              <Link className="font-montserrat font-medium text-[#565454] text-xl underline mb-8 mt-10 cursor-pointer leading-[1.2]" href="/gracias">
                  No, gracias. No quiero entrenar a mi equipo.
              </Link>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
}