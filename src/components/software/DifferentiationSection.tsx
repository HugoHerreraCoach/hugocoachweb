import { Target, PenTool, GaugeCircle } from 'lucide-react';


export default function DifferentiationSection() {
  const pillars = [
    {
      icon: <Target className="h-7 w-7 text-white" />,
      title: "Inteligencia Comercial, no solo Código.",
      description: "No soy un programador que aprendió de ventas. Soy un estratega de ventas que usa la tecnología para escalar resultados. Cada proyecto nace desde el campo de batalla comercial, no desde una plantilla de diseño."
    },
    {
      icon: <PenTool className="h-7 w-7 text-white" />,
      title: "Mensajes que Venden, no solo Describen.",
      description: "Una web bonita no paga las cuentas. Una web que persuade, sí. Inyecto ADN de ventas en cada palabra, diseñando un mensaje que no solo informa, sino que califica, rebate objeciones y provoca la acción de compra."
    },
    {
      icon: <GaugeCircle className="h-7 w-7 text-white" />,
      title: "Velocidad que se Traduce en Ventas.",
      description: "Cada segundo de carga que pierdes, es un cliente que se va a tu competencia. Por eso construyo con tecnología de élite (Next.js), no con plantillas lentas. El resultado es una experiencia superior y una tasa de conversión mediblemente más alta."
    }
  ];

  return (
    <section className="w-full bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
            Una agencia te entrega una herramienta. Yo te instalo un sistema.
          </h2>
          <p className="mt-6 text-xl lg:text-2xl leading-[1.4] text-slate-600 text-balance">
            Cualquiera puede construir una web. Pocos pueden construir una máquina de ventas.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl bg-slate-900 p-8 text-white shadow-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0a4afc]">
                {pillar.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold">{pillar.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
