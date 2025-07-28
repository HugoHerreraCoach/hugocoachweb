// src/components/coaching/GuaranteeSection.tsx

import { ShieldCheck } from 'lucide-react';

export default function GuaranteeSection() {
    return (
        <section className="bg-slate-50 py-20 lg:py-28">
            <div className="container mx-auto max-w-4xl px-4">
                <div className="group relative rounded-2xl border-2 border-slate-300 bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl md:p-12">

                    {/* Sello visual de la garantía */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 ring-8 ring-slate-50">
                            <ShieldCheck className="h-10 w-10 text-white" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-4xl text-balance">
                            Garantía de Resultados: O te llevas un plan para ganar más, o es gratis.
                        </h2>
                        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-100/80 p-6">
                            <p className="relative text-xl leading-relaxed font-medium text-slate-800">
                                &quot;Soy directo: si al final de nuestra sesión no tienes un{' '}
                                <strong className="text-[#0a4afc]">
                                    plan de acción claro con un guion a medida que te dé la confianza para duplicar tus cierres
                                </strong>
                                , no solo no me pagas, sino que te quedas con todos los bonos. Confío en mi sistema, y por eso, el riesgo lo asumo yo.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
