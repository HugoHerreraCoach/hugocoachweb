//src/app/blog/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Post } from '@/lib/types';
import { posts } from '@/lib/blog-posts';

// Componentes del layout de la página
import { PostHeader } from '@/components/blog/PostHeader';
import { LeadMagnetCta } from '@/components/blog/LeadMagnetCta';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { ArticleHighlights } from '@/components/blog/ArticleHighlights';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { SecondaryCta } from '@/components/blog/SecondaryCta';

// Componentes para MDX
import { CustomImage } from '@/components/blog/mdx/CustomImage';
import { CustomBlockquote } from '@/components/blog/mdx/CustomBlockquote';
import { InfoBox } from '@/components/blog/mdx/InfoBox';

async function getPostContent(slug: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);
    return content;
  } catch {
    console.error(`Error: No se pudo encontrar o leer el archivo MDX para el slug: ${slug}`);
    return null;
  }
}

export async function generateStaticParams() {
  return posts.map((post: Post) => ({ slug: post.slug }));
}

export default async function PostPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const { slug } = params;

  const post = posts.find(p => p.slug === slug);
  const mdxContentSource = await getPostContent(slug);

  if (!post || !mdxContentSource) {
    notFound();
  }

  const components = {
    // Sobrescritura de etiquetas HTML estándar
    img: CustomImage,
    blockquote: CustomBlockquote,
    // Mapeo de componentes personalizados para que MDXRemote sepa cómo renderizarlos
    CustomImage,
    CustomBlockquote,
    InfoBox,
  };

  return (
    <div className="bg-gray-950 text-white">
      <ReadingProgressBar />
      <PostHeader post={post} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <main className="lg:col-span-2">
            <article className="rounded-xl ">
              <ArticleHighlights highlights={post.highlights} />
              
              <div className="prose prose-invert prose-lg max-w-none py-8 md:py-12">
                <MDXRemote source={mdxContentSource} components={components} />
              </div>

              <SecondaryCta ctaData={post.secondaryCta} />
              <div className="mt-8 border-t border-gray-700 pt-6">
                <LeadMagnetCta 
                  title={post.leadMagnet.title}
                  cta={post.leadMagnet.cta}
                  link={post.leadMagnet.link}
                />
              </div>
            </article>
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <AuthorCard />
              <ShareButtons title={post.title} />
              <RelatedPosts currentPostSlug={post.slug} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
