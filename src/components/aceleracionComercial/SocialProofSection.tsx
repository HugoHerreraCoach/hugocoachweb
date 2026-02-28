'use client';

import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

interface CompanyLogo {
  name: string;
  path: string;
  width: number;
  height: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Abey Díaz',
    role: 'Gerente Comercial',
    company: 'Precisur',
    image: '/images/empresas/abey.jpg',
    quote: 'Implementar el sistema nos trajo un 30% más en ventas el primer mes. Por primera vez tenemos un método de trabajo que sí funciona.',
  },
  {
    name: 'Isabel Belasquez',
    role: 'Dueña',
    company: 'Belcan Inmobiliaria',
    image: '/images/empresas/isabel.jpg',
    quote: 'Las ventas no son mi fuerte, pero con esta estructura duplicamos los resultados en 2 semanas. Mi equipo ahora tiene un guion de ventas que provoca resultados.',
  },
];

const companyLogos: CompanyLogo[] = [
  { name: 'Municipalidad de Cajamarca', path: '/images/empresas/municipalidadCajamarca.png', width: 300, height: 924 },
  { name: 'Top X', path: '/images/empresas/topXLogo.png', width: 220, height: 1226 },
  { name: 'Century 21', path: '/images/empresas/century21Logo.png', width: 300, height: 696 },
  { name: 'Inclub', path: '/images/empresas/inclubLogo.png', width: 300, height: 903 },
  { name: 'Royal Prestige', path: '/images/empresas/royalLogo.png', width: 300, height: 1526 },
  { name: 'Fuxion', path: '/images/empresas/fuxionLogo.png', width: 175, height: 536 },
];

export function SocialProofSection() {
  const marqueeKeyframes = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `;

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState<string>('40s');

  useEffect(() => {
    if (!marqueeRef.current) return;

    const calculateDuration = () => {
      const container = marqueeRef.current;
      if (container) {
        const speed = 60;
        const distance = container.scrollWidth / 2;
        setAnimationDuration(`${distance / speed}s`);
      }
    };

    calculateDuration();

    const resizeObserver = new ResizeObserver(calculateDuration);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <style>{marqueeKeyframes}</style>

      <section className="w-full text-white py-20 sm:py-28 overflow-hidden bg-gradient-to-t from-black to-slate-900 bg-fixed">
        <div className="container mx-auto max-w-7xl px-6">
          <AnimatedOpacity>
            <div className="text-center">
              <Quote className="mx-auto h-12 w-12 text-[#0a4afc] mb-4" aria-hidden="true" />
              <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                Más de 120 empresas ya operan con este sistema.
              </h2>

              {/* Google rating */}
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-lg font-bold text-white">4.9/5</span>
                <span className="text-sm text-slate-400">en Google</span>
              </div>
            </div>
          </AnimatedOpacity>

          <div className="mt-10 lg:mt-16 grid grid-cols-1 gap-10 lg:gap-12 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <AnimatedOpacity key={testimonial.name}>
                <figure className="bg-black/20 p-8 rounded-2xl shadow-xl border border-gray-800 flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-[#0a4afc]/50">
                  <blockquote className="text-lg lg:text-xl leading-relaxed text-slate-200 flex-grow">
                    <p className="italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-x-4">
                    <Image
                      className="h-20 w-20 rounded-full object-cover border-2 border-[#0a4afc]"
                      src={testimonial.image}
                      alt={`Foto de ${testimonial.name}`}
                      width={80}
                      height={80}
                    />
                    <div>
                      <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{`${testimonial.role}, ${testimonial.company}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </AnimatedOpacity>
            ))}
          </div>

          {/* Company logo marquee */}
          <AnimatedOpacity>
            <div className="mt-16 lg:mt-24 text-center">
              <h3 className="text-xl lg:text-3xl font-bold text-white mb-10 text-balance">
                Empresas que han implementado la metodología:
              </h3>
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div
                  ref={marqueeRef}
                  className="flex items-center w-max"
                  style={{ animation: `marquee ${animationDuration} linear infinite` } as CSSProperties}
                >
                  {[...companyLogos, ...companyLogos].map((logo, index) => (
                    <div key={`${logo.name}-${index}`} className="mx-8 flex-shrink-0">
                      <Image
                        className="max-h-[70px] w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                        src={logo.path}
                        alt={logo.name}
                        width={logo.width}
                        height={logo.height}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Link to full case studies */}
              <div className="mt-10">
                <a
                  href="/casos-de-exito"
                  className="inline-flex items-center gap-2 text-[#4d8bff] hover:text-white font-semibold transition-colors duration-300"
                >
                  Ver todos los casos de éxito
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimatedOpacity>
        </div>
      </section>
    </>
  );
}
