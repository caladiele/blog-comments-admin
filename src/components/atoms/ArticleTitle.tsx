// src/components/atoms/ArticleTitle.tsx
'use client';
import Link from 'next/link';


import '@/app/styles/article-titre.css'

interface ArticleTitleProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  href: string
}

export default function ArticleTitle({ 
  href,
  title, 
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
        {<span className="titre-surlignage oyster">{title}</span>}
      </Tag>
    </Link>
  );
}