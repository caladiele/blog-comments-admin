// === src/components/atoms/ArticleTitle.tsx ===

import Link from 'next/link';
import '@/app/styles/article-titre.css'

/**
 * @typedef {TitleColor}
 * @description Couleurs disponibles pour le surlignage du titre
 *
 * Ces couleurs correspondent aux classes CSS définies dans titre-surlignage.css
 */
export type TitleColor =
  | 'color-oyster'
  | 'color-silentWhite'
  | 'color-solitude'
  | 'color-frostyMorning'
  | 'color-frostyMorningAlt';

/**
 * @typedef {ArticleTitlePropsBase}
 * @description Props de base pour le composant ArticleTitle
 */
type ArticleTitlePropsBase = {
  /** Texte du titre à afficher */
  title: string;
  /** Niveau sémantique du titre (h1, h2 ou h3) */
  as?: 'h1' | 'h2' | 'h3';
  /** Classes CSS additionnelles */
  className?: string;
  /** Variante de couleur pour le surlignage */
  color: TitleColor;
};

/**
 * @typedef {ArticleTitleWithLink}
 * @description Props quand le titre est un lien
*/
type ArticleTitleWithLink = ArticleTitlePropsBase & {
  /** Le titre doit être un lien cliquable */
  hasLink: true;
  /** Destination du lien (requis quand hasLink est true) */
  href: string; 
};

/**
 * @typedef {ArticleTitleWithoutLink}
 * @description Props quand le titre n'est pas un lien
 */
type ArticleTitleWithoutLink = ArticleTitlePropsBase & {
  /** Le titre ne doit pas être un lien */
  hasLink?: false;
  /** Destination du lien (interdit quand hasLink est false) */
  href?: never; 
};

/**
 * @typedef {ArticleTitleProps}
 * @description Union discriminée garantissant la cohérence des props
 */
export type ArticleTitleProps = ArticleTitleWithLink | ArticleTitleWithoutLink;

/**
 * @component ArticleTitle
 * @description Affiche un titre d'article ou de recette stylisé avec possibilité de lien.
 * Supporte les niveaux de titres sémantiques (h1-h3) et les couleurs de surlignage personnalisables.
 *
 * @param {ArticleTitleProps} props - Props du composant
 *
 * @example
 * // Titre simple (h1 par défaut)
 * <ArticleTitle
 *   title="Mon Article"
 *   color="color-oyster"
 * />
 *
 * @example
 * // Titre avec lien et niveau personnalisé
 * <ArticleTitle
 *   title="Recette du jour"
 *   color="color-silentWhite"
 *   as="h2"
 *   hasLink={true}
 *   href="/recettes/cookies"
 * />
 *
 * @example
 * // Avec classes CSS additionnelles
 * <ArticleTitle
 *   title="Guide Complet"
 *   color="color-oyster"
 *   className="hero-title"
 * />
 *
 * @accessibility
 * - Utilise des balises sémantiques (h1, h2, h3)
 * - Fournit un aria-label descriptif pour les titres cliquables
 * - Respecte prefers-reduced-motion pour les animations
 * - Maintient la hiérarchie des titres via la prop 'as'
 *
 * @performance
 * - Composant serveur (aucun JavaScript côté client)
 * - Animations CSS utilisant transform et opacity (GPU)
 * - Rendu optimisé avec font-smoothing
 *
 * @see {@link https://www.w3.org/WAI/tutorials/page-structure/headings/ | Structure des titres W3C}
*/
export default function ArticleTitle(props: ArticleTitleProps){ 
  const { hasLink, href, title, color, as: Tag = 'h1', className = '' } = props;
  
  // Élément titre
  const titleElement = (
    <Tag className={`article-title ${hasLink && 'article-title--clickable'} ${className}`}>
        {<span className={`titre-surlignage ${color}`}>{title}</span>}
    </Tag>
  )
  // Rendu conditionnel avec lien
  if (hasLink && href) {
    return (
      <Link
        href={href}
        className='article-link'
        aria-label={`Lire l'article : ${title}`}
      >
        {titleElement}
      </Link>
    )
  }
  // Rendu simple sans lien
  return titleElement;
}