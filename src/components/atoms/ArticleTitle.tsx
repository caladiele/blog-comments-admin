// src/components/atoms/ArticleTitle.tsx
'use client';
import Link from 'next/link';


import '@/app/styles/article-titre.css'

interface ArticleTitleProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  href?: string;
  color: string;
  hasLink?: boolean
}

export default function ArticleTitle({ 
  href,
  title,
  color, 
  as: Tag = 'h1',
  className = '',
  hasLink 
}: ArticleTitleProps) {
  return (
      hasLink ? (
        <Link 
          href={href || "#"}
          className={`article-link`}
          aria-label={`Lire l'article`}
        >
          <Tag className={`article-title ${className}`}>
            {<span className={`titre-surlignage ${color}`}>{title}</span>}
          </Tag>
        </Link>
      ) : (
          <Tag className={`article-title`}>
            {<span className={`titre-surlignage ${color}`}>{title}</span>}
          </Tag>
      )
  );
}