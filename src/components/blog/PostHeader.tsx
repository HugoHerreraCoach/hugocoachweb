// src/components/blog/PostHeader.tsx

import Image from 'next/image';
import type { Post } from '@/lib/types';

interface PostHeaderProps {
  post: Post;
}

export const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <header className="relative w-full h-[60vh] max-h-[550px]">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="mx-auto text-center">
          <span className="text-base font-bold uppercase tracking-wider text-blue-400">{post.category}</span>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold text-white leading-[1.2] text-balance">{post.title}</h1>
          <div className="mt-6 flex items-center text-lg leading-[1.3] justify-center space-x-4 text-gray-300">
            <span>Por Hugo Herrera</span>
            <span className="text-blue-500">•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-blue-500">•</span>
            <span>{post.readingTime} min de lectura</span>
          </div>
        </div>
      </div>
    </header>
  );
};