import Link from 'next/link';
import { posts } from '@/lib/blog-posts';
import { SidebarCard } from './SidebarCard';
import type { Post } from '@/lib/types';

interface RelatedPostsProps {
  currentPostSlug: string;
}

export const RelatedPosts = ({ currentPostSlug }: RelatedPostsProps) => {
  const related = posts
    .filter((p: Post) => p.slug !== currentPostSlug)
    .slice(0, 3); // Obtener 3 otros posts

  if (related.length === 0) {
    return null;
  }

  return (
    <SidebarCard title="Otros Dossiers">
      <div className="space-y-4">
        {related.map((post: Post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`} 
            className="block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 ring-1 ring-transparent hover:ring-blue-500/50 transition-all duration-200"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{post.category}</span>
            <h5 className="font-semibold text-white mt-1">{post.title}</h5>
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
};