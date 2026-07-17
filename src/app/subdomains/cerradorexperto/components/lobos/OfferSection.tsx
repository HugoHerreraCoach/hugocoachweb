import { Tag } from 'lucide-react'; // Ícono para la caja de ahorro, puedes cambiarlo

const OfferSection = () => {
    return (
        // Usamos un fondo claro (slate-100) para que la caja de la oferta resalte.
        <section id="oto-offer" className="bg-slate-100 py-24 sm:py-32">
            <div className="mx-auto px-4 lg:px-8 max-w-7xl text-center">

                {/* Título de la Sección */}
                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance">
                    Esta Oferta es Para Quienes Ejecutan. Por Eso es Para Ti.
                </h2>

                {/* Contenedor de la Oferta */}
                <div className="mt-12 bg-white rounded-2xl max-w-4xl mx-auto p-6 lg:p-12 border-2 border-dashed border-slate-300 shadow-2xl shadow-primary-blue/10">

                    {/* Anclaje de Precio */}
                    <div>
                        <p className="text-xl text-slate-600">
                            Valor Normal del Programa:
                        </p>
                        <p className="text-5xl font-extrabold text-slate-400 line-through my-2">
                            S/ 1,100 SOLES
                        </p>
                    </div>

                    {/* Precio de la Oferta */}
                    <div className="mt-6">
                        <p className="text-2xl text-slate-800 font-semibold">
                            Tu Inversión Única (Sólo Aquí y Ahora):
                        </p>
                        <p className="text-7xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-secondary-blue mt-2">
                            S/500 SOLES
                        </p>
                    </div>

                    {/* Caja de Ahorro */}
                    <div className="mt-8 inline-flex items-center gap-x-3 rounded-lg md:rounded-full bg-green-100 px-6 py-3">
                        <Tag className="h-12 w-12 md:h-6 md:w-6 text-green-800" />
                        <p className="text-xl font-bold leading-[1.3] text-green-800">
                            AHORRAS S/600 (MÁS DEL 50% DE DESCUENTO)
                        </p>
                    </div>

                </div>

                {/* Justificación del Descuento */}
                <div className="mt-12 mx-auto">
                    <p className="text-xl lg:text-2xl text-slate-700 italic">
                        &quot;Voy a ser claro contigo: no verás este precio en ningún otro lugar. Es mi forma de agradecerte por haber comprado <span className='font-semibold'>Cerrador Experto</span>.&quot;
                    </p>
                </div>

            </div>
        </section>
    );
};

export default OfferSection;