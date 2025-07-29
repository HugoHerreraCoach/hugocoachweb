// src/components/blog/mdx/CustomImage.tsx

import Image from 'next/image';

interface CustomImageProps {
    src: string;
    alt: string;
    caption?: string;
}

export const CustomImage = ({ src, alt, caption }: CustomImageProps) => {
    return (
        <figure className="my-10">
            <Image
                src={src}
                alt={alt}
                width={1408}
                height={768}
                className="rounded-lg border border-gray-700"
            />
            {caption && (
                <figcaption className="mt-2 text-center text-sm text-gray-400">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};