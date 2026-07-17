import React from "react";
import Image from "next/image";

const BonosSection: React.FC = () => {
  const bonos = [
    {
      id: 1,
      title: "Scripts de Ventas por WhatsApp, Llamada y Presencial",
      image: "/subdomains/liderexperto/venta/bono1.jpg",
      text: "Evita que tu equipo improvise en cada conversación.\n\nRecibe guiones listos para usar, diseñados para abrir, sostener y cerrar ventas con confianza.\n\n Incluye frases clave para cada canal, desde el primer mensaje hasta el cierre.\n\n Tu equipo sabrá exactamente qué decir para vender sin sonar forzado",
    },
    {
      id: 2,
      title: "Plantillas de Seguimiento Efectivo",
      image: "/subdomains/liderexperto/venta/bono2.jpg",
      text: "La mayoría de las ventas no se pierden por el producto… se pierden por un mal seguimiento.\n\n Con estas plantillas, tu equipo sabrá qué decir, cuándo hacerlo y cómo mantener el interés del cliente.\n\n Secuencias listas para copiar, personalizar y cerrar más ventas. Convierte el “te aviso” en un “¿dónde pago?”",
    },
    {
      id: 3,
      title: "Mapa Definitivo para Manejo de Objeciones",
      image: "/subdomains/liderexperto/venta/bono3.jpg",
      text: "Muchas veces, tu equipo no cierra porque responde a lo que el cliente dice… y no a lo que realmente piensa.\n\n Este mapa los entrena para detectar la verdadera objeción detrás de cada “no tengo tiempo”, “lo voy a pensar” o “está caro”, y guiarlos con respuestas que sí abren la puerta al cierre.\n\n Cuando saben lo que realmente está frenando la venta, saben exactamente cómo moverla hacia adelante.",
    },
    {
      id: 4,
      title: "Radiografía Comercial",
      image: "/subdomains/liderexperto/venta/bono4.jpg",
      text: "La mayoría de dueños de negocio no saben exactamente dónde está el verdadero cuello de botella en su proceso de ventas.\n\n ¿Es que no atraen suficientes prospectos? ¿Es que no saben cerrar? ¿O simplemente no están listos para crecer?\n\n Esta radiografía te muestra las 3 fases clave de cualquier negocio: Atracción, Cierre y Crecimiento.\n\n Y lo más importante: te ayuda a identificar con precisión en cuál estás fallando… y qué hacer al respecto.",
    },
    {
      id: 5,
      title: "Guía de 50 Preguntas para Calificar Clientes",
      image: "/subdomains/liderexperto/venta/bono5.jpg",
      text: "No todos los que preguntan van a comprarte.\n\n Con esta guía, tu equipo aprenderá a identificar rápidamente a los prospectos con verdadero potencial, y a enfocar su energía donde sí hay ventas.\n\n Vende más, perdiendo menos tiempo con quien no va a comprar.",
    },
  ];

  return (
    <section className="bg-white">
      {bonos.map((bono) => (
        <div key={bono.id} className="border-b-1 mb-6">
          <div className="bg-[#E40200] px-2">
            <h3 className="font-barlow-condensed font-medium text-2xl md:text-3xl text-white text-center leading[1.2] py-2 md:py-4 lg:py-6"><span className="font-bold">BONO #{bono.id}</span> - {bono.title}</h3>
          </div>

          <div className="flex flex-col justify-center items-center p-4 lg:flex-row max-w-[1200px] mx-auto lg:py-10">
            {/* Parte izquierda - Imagen del bono */}
            <Image
              src={bono.image}
              alt={bono.title}
              width={500}
              height={500}
              className="w-[70%] md:max-w-[500px] mx-auto mb-4"
            />
      
            {/* Parte derecha - Texto del bono */}
            <p className="font-inter font-medium text-xl px-6 whitespace-pre-line pb-2 md:text-2xl text-black">
              {bono.text}
            </p>
          </div>
            
          <div className="bg-[#FBE3E3] p-6 py-4 w-[80%] max-w-3xl mx-auto mb-8">
            <p className="font-barlow-condensed font-bold italic text-2xl text-center leading-[1] md:text-3xl text-black">
              ¡Obtén esto GRATIS cuando ordenes tu copia de Líder Experto!
            </p>
          </div>
          

        </div>
      ))}
    </section>
  );
};

export default BonosSection;
