// src/app/blog/page.tsx

import { posts } from '@/lib/blog-posts';
import { PostCard } from '@/components/blog/PostCard';
import type { Post } from '@/lib/types';

export default function BlogPage() {
  const featuredPost: Post | undefined = posts.find(p => p.featured);
  const otherPosts: Post[] = posts.filter(p => !p.featured);

  return (
    <div className="bg-gray-950 text-white">
      <header className="text-center py-20 md:py-28">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-blue-500">El Arsenal del Vendedor</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
          Estrategias, tácticas y mentalidad directamente desde la trinchera para dominar el arte de las ventas.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {featuredPost && (
            <div className="md:col-span-2">
              <PostCard post={featuredPost} isFeatured />
            </div>
          )}
          {otherPosts.map((post: Post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}