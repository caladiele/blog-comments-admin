// src/components/atoms/ArticleTitle.tsx
'use client';

import '@/app/styles/article-titre.css'

interface ArticleTitleProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export default function ArticleTitle({ 
  title, 
  as: Tag = 'h1',
  className = '' 
}: ArticleTitleProps) {
  return (
    <Tag className={`article-title ${className}`}>
      {title}
    </Tag>
  );
}