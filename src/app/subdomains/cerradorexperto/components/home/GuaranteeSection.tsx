// src/components/landing/GuaranteeSection.tsx

import React from 'react';
import { ShieldCheck, RefreshCw, BadgePercent } from 'lucide-react';

export default function GuaranteeSection() {
    return (
        <section
            id="garantia"
            className="relative bg-slate-100 py-24 sm:py-32"
        >
            
            <div className="relative container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* ✅ Diseño de "Certificado" con Borde Gradiente */}
                    <div className="relative bg-gradient-to-br from-primary-blue to-accent-green p-1 rounded-3xl shadow-2xl shadow-primary-blue/20">
                        
                        {/* ✅ El "Sello de Garantía": El ícono se transforma en el elemento central */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-gradient-to-br from-primary-blue to-secondary-blue p-2 rounded-full shadow-lg">
                                <div className="bg-white p-4 rounded-full">
                                    <ShieldCheck className="h-16 w-16 text-primary-blue" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[22px] pt-20 pb-12 px-4 lg:px-12 text-center">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 text-balance">
                                Mi Garantía: <br/>O Cierras Más, o es Gratis.
                            </h2>
                            <p className="mt-2 text-lg text-primary-blue font-semibold">El riesgo es 100% mío. Así de simple.</p>

                            {/* ✅ Jerarquía visual que destaca "30 Días" y "100% Devolución" */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-blue/10 p-3 rounded-full">
                                        <RefreshCw className="h-6 w-6 lg:h-8 lg:w-8 text-primary-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">30 Días de Prueba</h3>
                                        <p className="mt-1 text-lg text-slate-600 leading-[1.4]">
                                            Tienes 30 días completos para revisar todo el material: el libro y cada uno de los bonos.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-blue/10 p-3 rounded-full">
                                        <BadgePercent className="h-6 w-6 lg:h-8 lg:w-8 text-primary-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800">100% Devolución</h3>
                                        <p className="mt-1 text-lg text-slate-600 leading-[1.4]">
                                            Si no cumple tus expectativas, envíame un correo y te devolveré el 100% de tu dinero. Sin preguntas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200/80">
                                <p className="text-xl font-semibold text-slate-900 italic text-balance">
                                    &quot;No tienes absolutamente nada que perder y todo un sistema de cierre por ganar.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}