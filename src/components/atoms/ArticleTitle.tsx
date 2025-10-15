// src/components/atoms/ArticleTitle.tsx
'use client';
import Link from 'next/link';


import '@/app/styles/article-titre.css'

interface ArticleTitleProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  href: string;
  color: string;
}

export default function ArticleTitle({ 
  href,
  title,
  color, 
  as: Tag = 'h1',
  className = '' 
}: ArticleTitleProps) {
  return (
    <Link 
      href={href}
      className={`article-link ${className}`}
      aria-label={`Lire l'article`}
    >
      <Tag className={`article-title ${className}`}>
        {<span className={`titre-surlignage ${color}`}>{title}</span>}
      </Tag>
    </Link>
  );
}