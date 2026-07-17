import React from 'react';
import Image from 'next/image';

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Cathy Reyes",
      role: "Líder de equipo multinivel",
      image: "/subdomains/liderexperto/venta/testimonial1.jpg",
      quote: "Como líder de red, lo daba todo. Capacitaba, apoyaba en cierres, pero si yo no estaba, el equipo no duplicaba. \n\nLíder Experto me enseñó que el problema no era la actitud, sino la falta de ESTRUCTURA. \n\nHoy mi equipo tiene un sistema que funciona, las reuniones son poderosas y las afiliaciones crecen sin que tenga que estar presente."
    },
    {
      id: 2,
      name: "Abey Díaz",
      role: "Gerente de Ventas",
      image: "/subdomains/liderexperto/venta/testimonial2.jpg",
      quote: "Había probado de todo para que mi equipo venda más: cursos, incentivos, reuniones, pero los resultados no duraban.\n\nEl libro me hizo darme cuenta de algo que me costaba admitir: no teníamos un sistema de ventas sólido.\n\n Implementamos los guiones y herramientas del libro, y ese mes cerramos con un 30% más en ventas. \n\nPor primera vez siento que tenemos un método de trabajo sólido, que realmente funciona.",
    },
    {
      id: 3,
      name: "Isabel Belasquez",
      role: "Dueña de negocio",
      image: "/subdomains/liderexperto/venta/testimonial3.jpg",
      quote: "Las ventas nunca fueron mi fuerte, y por eso, liderar al equipo comercial siempre fue difícil para mí.\n\nDespués de leer Líder Experto, todo cambió. Empecé a aplicar la estructura y los procesos de venta que enseña.\n\n¡Y en solo 2 semanas, los resultados fueron increíbles! Duplicamos las ventas, mis vendedores ahora saben perfecto qué hacer y están mucho más motivados.",
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título principal */}
        <div className="text-center mb-2 lg:mb-8">
          <div className="w-48 h-0.5 bg-red-600 mx-auto mb-2 md:w-140 lg:w-190"></div>
          <h2 className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl  font-bold text-black leading-[1] mb-3">
            De frustración a resultados reales.
          </h2>
          <div className="w-48 h-0.5 bg-red-600 mx-auto mb-6 md:w-140 lg:w-190"></div>
          <p className="font-montserrat text-medium text-xl md:text-2xl lg:text-3x leading-[1.2] max-w-2xl mx-auto text-black">
            Líderes de distintos rubros ya aplicaron el sistema de este libro. Estas son algunas de sus historias, contadas por ellos mismos.
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-start items-center rounded-2xl shadow-xl shadow-gray-800/20 p-4 py-8 md:p-8 space-y-6 hover:shadow-xl hover:shadow-gray-700/30 transition-shadow duration-300"
            >
              {/*Imagen*/}
              <Image
                src = {testimonial.image}
                alt = {testimonial.name}
                width={500}
                height={271}
                className='w-full max-w-[500px] '
              />

              {/* Nombre y rol */}
              <div className="text-center space-y-2">
                <h3 className="font-barlow-condensed text-2xl mb-0 md:text-2xl font-bold text-black leading-[1]">
                  {testimonial.name}
                </h3>
                <p className="font-barlow-condensed text-light text-xl md:text-2xl leading-[1.2] mb-4 text-black">
                  {testimonial.role}
                </p>
                <div className="w-10 h-0.5 bg-gray-500 mx-auto"></div>
              </div>

              {/* TEstimonio */}
              <p 
                className="font-barlow text-lg md:text-xl font-medium text-black leading-[1.2] text-center whitespace-pre-line"
              >
                &quot;{testimonial.quote}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;