// src/components/molecules/HeroContent.tsx
'use client';

import ArticleCategory from '@/components/atoms/ArticleCategory';
import ArticleTitle from '@/components/atoms/ArticleTitle';
import WabisabiButton from '@/components/atoms/WabisabiButton';

import '@/app/styles/hero-content.css'


interface HeroContentProps {
  category: string;
  title: string;
  date: string;
  slug: string;
  className?: string;
}

export default function HeroContent({ 
  category, 
  title, 
  date, 
  slug,
  className = ''
}: HeroContentProps) {
  return (
    <div className={`hero-content ${className}`}>
      <div className="hero-content-inner">
        {/* Catégorie */}
        <ArticleCategory category={category} />
        
        {/* Titre principal */}
        <ArticleTitle title={title} href={`/articles/${slug}`} as="h1" />
        
        {/* Bouton CTA */}
        <WabisabiButton href={`/articles/${slug}`} className='wabisabi-button wabisabi-oyster' />
      </div>
    </div>
  );
}