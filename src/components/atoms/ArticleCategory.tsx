// src/components/atoms/ArticleCategory.tsx
'use client';

import '@/app/styles/article-categorie.css'


/**
 * @component ArticleCategory
 * @description Affiche la catégorie d'un article ou d'une recette sous forme de badge.
 * Composant de navigation et d'organisation du contenu qui aide les utilisateurs
 * à identifier rapidement le type de contenu (recette, guide, inspiration, etc.) dans l'univers 
 * d'Amande & Basilic.
 *
 * @param {Object} props - Propriétés du composant
 * @param {string} props.category - Le nom de la catégorie à afficher (ex: "Recettes", "Bien-être", "DIY")
 * @param {string} [props.className=''] - Classes CSS additionnelles pour personnalisation du style
 *
 * @example
 * // Badge de catégorie recette
 * <ArticleCategory category="Recettes" />
 * 
 * // Badge avec style personnalisé
 * <ArticleCategory 
 *   category="Bien-être" 
 *   className="category--featured" 
 * />
 *
 * @accessibility
 * - Utilise aria-label pour expliciter le contexte aux lecteurs d'écran
 * - Texte sémantiquement structuré pour navigation assistée
 * - Compatible avec la navigation par catégories pour utilisatrices malvoyantes
 *
 * @performance
 * - Composant léger sans état ni effet de bord
 * - Rendu optimal pour affichage en liste (pages recettes, archives)
 * - Styling CSS externe pour cache optimal
 *
 */

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
      aria-label={`Catégorie: ${category}`}
    >
      {category}
    </span>
  );
}