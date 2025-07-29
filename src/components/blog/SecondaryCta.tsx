// src/components/blog/SecondaryCta.tsx

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/types';

interface SecondaryCtaProps {
    ctaData: Post['secondaryCta'];
}

export const SecondaryCta = ({ ctaData }: SecondaryCtaProps) => {
    if (!ctaData || !ctaData.text || !ctaData.link) {
        return <></>; // No renderizar nada si no hay datos
    }

    return (
        <div className="my-12 text-center">
            <Link
                href={ctaData.link}
                className="inline-flex items-center gap-3 text-xl font-semibold text-blue-600 hover:text-blue-400 transition-colors duration-200 group"
            >
                <span>{ctaData.text}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
        </div>
    );
};