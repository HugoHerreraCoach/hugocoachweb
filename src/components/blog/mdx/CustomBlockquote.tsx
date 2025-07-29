// src/components/mdx/CustomBlockquote.tsx

import { Quote } from 'lucide-react';
import type { ReactNode } from 'react';

interface CustomBlockquoteProps {
    children: ReactNode;
}

export const CustomBlockquote = ({ children }: CustomBlockquoteProps) => {
    return (
        <blockquote className="my-10 rounded-r-lg border-l-4 border-blue-500 bg-gray-800/50 p-6 relative">
            <Quote className="absolute -top-5 -left-5 size-12 text-gray-700" aria-hidden="true" />
            <div className="prose prose-invert prose-xl italic prose-p:text-gray-200">
                {children}
            </div>
        </blockquote>
    );
};