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

  const imageSrc = post.imageIntro.src;
  const imageAlt = post.imageIntro.alt;
  const category = post.categoriePrincipale || 'Article';
  
  return (
    <section 
      className={`hero-article ${className}`}
      role="region"
      aria-label="Dernier article paru sur le site"
    >
      {/* Image d'introduction */}
      <HeroBackground 
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
      
      {/* Metadonnées, Titre et liens vers le post */}
      <HeroContent
        category={category}
        title={post.titre}
        color='color-oyster'
        slug={post.slug}
      />
    </section>
  );
}