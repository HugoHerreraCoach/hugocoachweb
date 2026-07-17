import React from 'react';
import Image from 'next/image';

const BookPromoComponent = () => {
  return (
      <section className="bg-white flex items-center justify-center p-4 pt-24 md:pt-32 lg:py-12">
          <div className="bg-black rounded-t-[40px] rounded-br-[100px] rounded-bl-none px-6 py-8 max-w-[1600px] flex flex-col lg:flex-row items-center lg:gap-10 lg:p-20 lg:rounded-4xl">

            {/* Imagen de los 5 libros - Izquierda */}
            <Image
              src="/subdomains/liderexperto/venta/bonosMockup2.png"
              width={700}
              height={318}
              alt="5 libros de negocio apilados"
              className="w-full max-w-[600px] mb-8 mt-[-120px] md:mt-[-160px] lg:mt-[0] lg:w-[40%]"
            />

            {/* Texto - derecha */}
            <div className="text-center flex flex-col items-center px-8 lg:w-[60%]">
              <h1 className="font-extrabold font-inter leading-[1.2] text-white text-2xl md:text-3xl lg:text-5xl mb-4">
                Estos 5 bonos convierten el libro en una <span className="underline">herramienta  completa.</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium leading-[1.2] py-4 pb-12 text-white lg:pb-4">
                No te llevas un libro. Te llevas un sistema, guías, scripts, mapas  y plantillas...<br/><br/>
                Todo está pensado para que puedas implementar sin complicaciones, desde el día uno.<br/><br/>
                Y lo mejor: hoy solo cubres el envío.
              </p>
            </div>

          </div>
      </section>
      
  );
};

export default BookPromoComponent;