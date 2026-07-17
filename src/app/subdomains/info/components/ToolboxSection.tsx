import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Resource {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  src: string;
  width: number;
  height: number;
}

// --- DATOS DE LOS RECURSOS (SIN CAMBIOS) ---
const resources: Resource[] = [
    {
        title: "Mapa para Desarmar Objeciones",
        description: "Ignora la excusa, ataca la objeción real y toma el control. Un sistema probado para cerrar más.",
        buttonText: "Dominar Objeciones",
        href: 'https://hugoherreracoach.com/recursos/objeciones',
        src: '/subdomains/info/images/objeciones.png',
        width: 700,
        height: 921,
    },
    {
        title: "Guion de Calificación Estratégica",
        description: "El guion exacto para filtrar curiosos y detectar compradores reales en minutos. Deja de perder tu tiempo.",
        buttonText: "Calificar en Minutos",
        href: 'https://hugoherreracoach.com/recursos/preguntas',
        src: '/subdomains/info/images/preguntas.png',
        width: 700,
        height: 848,
    },
    {
        title: "Radiografía de Sistema Comercial",
        description: "Encuentra los 15 errores ocultos que frenan tus ventas. Recibe un plan de acción claro para escalar.",
        buttonText: "Quiero mi Plan de Acción",
        href: 'https://hugoherreracoach.com/recursos/radiografia',
        src: '/subdomains/info/images/radiografia.png',
        width: 700,
        height: 931,
    },
    {
        title: "Sistema de Inducción para Vendedores",
        description: "El sistema de 30 días para forjar vendedores de élite. Instala el proceso y ahorra tu tiempo.",
        buttonText: "Automatizar Capacitación",
        href: 'https://hugoherreracoach.com/recursos/capacitacion',
        src: '/subdomains/info/images/capacitacion.jpg',
        width: 700,
        height: 989,
    }
];

// --- COMPONENTE DE TARJETA REFACTORIZADO ---
const ToolboxCard: React.FC<Resource> = ({ title, description, buttonText, href, src, width, height }) => {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-px transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/30">
      {/* Efecto de borde iluminado al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-slate-900 to-slate-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative flex h-full flex-col rounded-[15px] bg-slate-900 p-6 text-left">
        {/* Contenedor de la Imagen */}
        <div className="mb-6 flex justify-center">
            <Image
                src={src}
                alt={title}
                width={width}
                height={height}
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 25vw"
                className='w-auto h-auto max-h-[250px] max-w-full'
            />
        </div>
        
        <h3 className="mb-2 text-2xl font-bold text-white text-balance">{title}</h3>
        <p className="mb-6 flex-grow text-slate-400 text-xl text-balance">{description}</p>
        
        {/* --- INICIO DE LA OPTIMIZACIÓN DE ESTILO DEL BOTÓN --- */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-lg bg-slate-800 px-5 py-3 text-xl font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0a4afc] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        {/* --- FIN DE LA OPTIMIZACIÓN DE ESTILO DEL BOTÓN --- */}
      </div>
    </div>
  );
};

// --- COMPONENTE DE LA SECCIÓN PRINCIPAL (CON GRID AJUSTADO) ---
const ToolboxSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20 sm:py-24">
      {/* Efecto de Aurora Estático */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-full -translate-x-1/2 bg-[radial-gradient(closest-side_at_50%_50%,rgba(37,99,235,0.15),transparent_100%)]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white text-balance lg:text-5xl">
            Recursos Gratuitos:
          </h2>
          <p className="mt-4 text-xl lg:text-2xl text-slate-300 text-balance mx-auto">
            Menos teoría, más acción. Descarga el método exacto que necesitas para escalar tus resultados.
          </p>
        </div>

        {/* Grid ajustado para mejor espaciado */}
        <div className="mx-auto mt-10 lg:mt-16 grid max-w-md grid-cols-1 gap-8 sm:max-w-none lg:grid-cols-2">
          {resources.map((resource) => (
            <ToolboxCard key={resource.title} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolboxSection;