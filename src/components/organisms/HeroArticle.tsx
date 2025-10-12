// src/components/organisms/HeroArticle.tsx
'use client';

import HeroBackground from '@/components/molecules/HeroBackground';
import HeroContent from '@/components/molecules/HeroContent';
import type { Post } from '@/lib/mdx';

import '@/app/styles/hero-article.css'

interface HeroArticleProps {
  post: Post;
  className?: string;
}

export default function HeroArticle({ post, className = '' }: HeroArticleProps) {
  // Extraction des données avec fallbacks
  console.log(post)
  const imageSrc = post.imageIntro.src;
  const category = post.categoriePrincipale || 'Article';
  
  return (
    <section 
      className={`hero-article ${className}`}
      role="region"
      aria-label="Article mis en avant"
    >
      {/* Background image avec overlay */}
      <HeroBackground 
        imageSrc={imageSrc}
        imageAlt={post.titre}
      />
      
      {/* Contenu de l'article */}
      <HeroContent
        category={category}
        title={post.titre}
        date={post.date}
        slug={post.slug}
      />
    </section>
  );
}