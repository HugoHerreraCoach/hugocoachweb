// src/components/blog/mdx/InfoBox.tsx

import { Info, AlertTriangle, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';

type InfoBoxVariant = 'info' | 'warning' | 'success';

interface InfoBoxProps {
    children: ReactNode;
    variant?: InfoBoxVariant;
}

const variantConfig = {
    info: {
        Icon: Info,
        bgColor: 'bg-blue-900/20',
        borderColor: 'border-blue-600/50',
        iconColor: 'text-blue-600',
    },
    warning: {
        Icon: AlertTriangle,
        bgColor: 'bg-yellow-900/20',
        borderColor: 'border-yellow-500/50',
        iconColor: 'text-yellow-400',
    },
    success: {
        Icon: CheckCircle,
        bgColor: 'bg-green-900/20',
        borderColor: 'border-green-500/50',
        iconColor: 'text-green-400',
    },
};

export const InfoBox = ({ children, variant = 'info' }: InfoBoxProps) => {
    const { Icon, bgColor, borderColor, iconColor } = variantConfig[variant];

    return (
        <div className={`my-8 flex items-start gap-4 rounded-lg border p-4 ${bgColor} ${borderColor}`}>
            <div className="flex-shrink-0">
                <Icon className={`mt-[24px] size-6 ${iconColor}`} aria-hidden="true" />
            </div>
            <div className="prose prose-invert prose-p:text-gray-300 prose-p:my-0">
                {children}
            </div>
        </div>
    );
};