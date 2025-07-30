import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { FC } from 'react';
import { LeadCaptureForm } from '@/components/ui/LeadCaptureForm';

// La estructura de datos que alimentará cada página
interface ResourceLayoutProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    benefits: string[];
    ctaText: string;
}

export const ResourceLayout: FC<ResourceLayoutProps> = ({ title, subtitle, imageSrc, imageAlt, benefits, ctaText }) => {
    return (
        <main className="bg-slate-50">
            <div className="container mx-auto max-w-4xl px-4 py-16 lg:py-24">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Columna 1: La Zona de Conversión (Mobile First) */}
                    <div className="lg:order-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-5xl text-balance">
                            {title}
                        </h1>
                        <p className="mt-4 text-xl leading-relaxed text-slate-600">
                            {subtitle}
                        </p>
                        <LeadCaptureForm ctaText={ctaText} />
                    </div>

                    {/* Columna 2: La Zona de Refuerzo */}
                    <div className="lg:order-2">
                        <div className="mb-8">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={500}
                                height={700}
                                className="rounded-lg shadow-2xl"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Con esta herramienta vas a:</h2>
                            <ul className="mt-4 space-y-3">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-blue-600 mt-1" />
                                        <span className="text-lg text-slate-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};