// src/lib/types.ts

export interface Post {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  readingTime: number;
  publishedAt: string;
  featured?: boolean;
  highlights: string[];
  leadMagnet: {
    title: string;
    cta: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
}