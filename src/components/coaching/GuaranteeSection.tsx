import { ShieldCheck } from 'lucide-react';

export default function GuaranteeSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24">
            {/* Efecto de resplandor decorativo en el fondo */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 flex items-center justify-center"
            >
                <div className="h-[250px] w-full max-w-3xl rounded-full bg-blue-600/10 blur-3xl sm:h-[400px]" />
            </div>

            <div className="container mx-auto max-w-4xl px-4">
                {/* Se añaden clases de transición y hover para el efecto en desktop */}
                <div className="relative rounded-2xl border border-slate-200/80 bg-white/60 p-6 shadow-lg backdrop-blur-lg transition-all duration-300 sm:p-8 lg:p-12 lg:hover:scale-[1.02] lg:hover:shadow-2xl">
                    {/* El icono ahora se posiciona de forma absoluta en pantallas grandes */}
                    <div className="absolute -top-8 -left-8 hidden lg:block">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl">
                            <ShieldCheck className="h-12 w-12" />
                        </div>
                    </div>

                    {/* El layout cambia a Grid en pantallas grandes */}
                    <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                        {/* Columna Izquierda (Título): El icono se oculta aquí en 'lg' para evitar duplicados */}
                        <div className="flex flex-col items-start gap-6 sm:flex-row lg:col-span-1 lg:flex-col lg:items-start">
                            <div className="flex-shrink-0 lg:hidden">
                                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                                    <ShieldCheck className="h-8 w-8" />
                                </div>
                            </div>
                            <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                Garantía de Resultados: O es un plan ganador, o es gratis.
                            </h2>
                        </div>

                        {/* Columna Derecha (Cita): Se ajusta para el layout de grid */}
                        <div className="mt-8 lg:col-span-1 lg:mt-0">
                            <blockquote className="space-y-4 border-l-4 border-blue-500 pl-6">
                                <p className="text-xl lg:text-2xl leading-[1.4] text-slate-700">
                                    &quot;El riesgo es 100% mío. Si después de nuestra sesión no tienes{' '}
                                    <strong className="font-semibold text-blue-600">
                                        un plan de acción claro y un guion probado para duplicar tus cierres
                                    </strong>
                                    , la sesión es gratis y te quedas con el arsenal completo de bonos. Mi reputación se mide en tus resultados, no en mis horas facturadas.&quot;
                                </p>
                                <p className="text-right text-base lg:text-lg font-medium italic text-slate-500">
                                    — Hugo Herrera
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}