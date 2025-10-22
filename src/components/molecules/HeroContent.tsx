// src/components/molecules/HeroContent.tsx

/**
 * @component HeroContent
 * @description
 * Section de contenu pour le hero banner d'un article ou recette.
 * Compose la catégorie, le titre et un bouton CTA wabi-sabi.
 * Utilisé typiquement dans HeroArticle pour l'affichage des articles mis en avant.
 *
 * @example
 * ```tsx
 * <HeroContent 
 *   category="Recettes"
 *   title="Tarte aux fraises maison"
 *   slug="tarte-aux-fraises-maison"
 *   color="color-oyster"
 * />
 * ```
 *
 * @param {HeroContentProps} props - Component props
 * @param {string} props.category - Catégorie de l'article (ex: "Recettes", "Bien-être")
 * @param {string} props.title - Titre de l'article
 * @param {string} props.slug - Slug pour l'URL de l'article
 * @param {TitleColor} [props.color] - Couleur du surlignage du titre
 * @param {string} [props.className] - Classes CSS additionnelles
 *
 * @returns {JSX.Element} Contenu hero avec catégorie, titre et CTA
 */
'use client';

import ArticleCategory from '@/components/atoms/ArticleCategory';
import ArticleTitle from '@/components/atoms/ArticleTitle';
import WabisabiButton from '@/components/atoms/WabisabiButton';
import { TitleColor } from '@/components/atoms/ArticleTitle';
import '@/app/styles/hero-content.css'

/**
 * Props pour le composant HeroContent
 * @interface HeroContentProps
 */
interface HeroContentProps {
  /** Catégorie de l'article à afficher */
  category: string;
   /** Titre principal de l'article */
  title: string;
  /** Slug URL de l'article (utilisé pour construire chemin) */
  slug: string;
  /** Couleur du surlignage du titre (défaut: color-oyster) */
  color: TitleColor;
  /** Classes CSS additionnelles */
  className?: string;
}

export default function HeroContent({ 
  category, 
  title, 
  slug,
  color = 'color-oyster',
  className = ''
}: HeroContentProps) {
  return (
    <div className={`hero-content ${className}`}>
      <div className="hero-content-inner">
        {/* Catégorie */}
        <ArticleCategory category={category} />
        
        {/* Titre principal */}
        <ArticleTitle title={title} href={`/articles/${slug}`} hasLink={true} color={color} as="h1" />
        
        {/* Bouton CTA */}
        <WabisabiButton href={`/articles/${slug}`} variant='oyster' />
      </div>
    </div>
  );
}