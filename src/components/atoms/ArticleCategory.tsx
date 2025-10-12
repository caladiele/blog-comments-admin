// src/components/atoms/ArticleCategory.tsx
'use client';

import '@/app/styles/article-categorie.css'


interface ArticleCategoryProps {
  category: string;
  className?: string;
}

export default function ArticleCategory({ 
  category, 
  className = '' 
}: ArticleCategoryProps) {
  return (
    <span 
      className={`article-category ${className}`}
      aria-label={`Catégorie : ${category}`}
    >
      {category}
    </span>
  );
}