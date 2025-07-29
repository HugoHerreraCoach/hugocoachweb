// src/components/blog/PostCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/types';
import { AnimatedOpacity } from '@/components/ui/AnimatedOpacity';
import { MoveRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isFeatured?: boolean;
}

export const PostCard = ({ post, isFeatured = false }: PostCardProps) => {
  return (
    <AnimatedOpacity>
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <div 
          className={`
            relative overflow-hidden rounded-xl h-full flex flex-col
            bg-gray-900 ring-1 ring-gray-700/50 
            transition-all duration-300 ease-in-out group-hover:ring-blue-500/50 group-hover:scale-[1.02]
            ${isFeatured ? 'col-span-1 md:col-span-2' : ''}
          `}
        >
          {/* Contenedor de la Imagen */}
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "50vw"}
            />
          </div>

          {/* Contenido de Texto */}
          <div className="flex flex-col flex-grow p-4 md:p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{post.category}</span>
            <h3 className={`mt-2 text-lg font-bold text-white leading-tight flex-grow ${isFeatured ? 'md:text-4xl' : 'md:text-2xl'}`}>
              {post.title}
            </h3>
            {isFeatured && (
              <p className="mt-2 text-base text-gray-300 hidden md:block max-w-2xl">
                {post.description}
              </p>
            )}
            <div className="mt-4 text-blue-400 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Leer Dossier <MoveRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </AnimatedOpacity>
  );
};