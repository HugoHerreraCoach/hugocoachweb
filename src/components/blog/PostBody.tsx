'use client';

import { MDXProvider } from '@mdx-js/react';
import type { ReactNode } from 'react';

// Importa TODOS los componentes que se usarán dentro de los archivos .mdx
import { CustomImage } from '@/components/blog/mdx/CustomImage';
import { CustomBlockquote } from '@/components/blog/mdx/CustomBlockquote';
import { InfoBox } from '@/components/blog/mdx/InfoBox';

interface PostBodyProps {
  children: ReactNode;
}


const mdxComponents = {
  img: CustomImage,
  blockquote: CustomBlockquote,

  InfoBox,
  CustomImage,
  CustomBlockquote,
};

export const PostBody = ({ children }: PostBodyProps)=> {
  return (
    <MDXProvider components={mdxComponents}>
      <div className="prose prose-invert prose-lg max-w-none py-8 md:py-12">
        {children}
      </div>
    </MDXProvider>
  );
};