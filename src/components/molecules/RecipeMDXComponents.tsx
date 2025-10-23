// src/components/molecules/RecipeMDXComponents.tsx

/**
 * @component RecipeMDXComponents
 * @description
 * Collection de composants MDX personnalisés pour l'affichage du contenu des recettes.
 *
 * Design principles:
 * - Simplicité et épurement visuel
 * - Couleurs naturelles et douces  
 * - Espacement généreux (respiration)
 * - Typographie équilibrée
 * - Interactions subtiles et naturelles
 */

import Image from 'next/image';
import Link from 'next/link';

/**
 * Composant pour les titres de niveau 2
 * Style: Élégant avec sous-ligne subtile, espacement généreux
 */
const H2 = ({ children, ...props }: any) => (
  <h2 
    className="recipe-content-h2"
    {...props}
  >
    <span className="recipe-content-h2__text">{children}</span>
    <div className="recipe-content-h2__underline" />
  </h2>
);

/**
 * Composant pour les titres de niveau 3
 * Style: Plus discret, accent coloré subtil
 */
const H3 = ({ children, ...props }: any) => (
  <h3 
    className="recipe-content-h3"
    {...props}
  >
    {children}
  </h3>
);

/**
 * Composant pour les paragraphes
 * Style: Interlignage généreux, couleur douce
 */
const Paragraph = ({ children, ...props }: any) => (
  <p 
    className="recipe-content-p"
    {...props}
  >
    {children}
  </p>
);

/**
 * Composant pour les images avec lazy loading et responsive
 * Optimisé pour Core Web Vitals et accessibilité
 */
interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  caption, 
  credit, 
  width = 800, 
  height = 600,
  ...props 
}: ImageProps) => (
  <figure className="recipe-content-figure">
    <div className="recipe-content-figure__image-wrapper">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="recipe-content-figure__image"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
        {...props}
      />
    </div>
    
    {(caption || credit) && (
      <figcaption className="recipe-content-figure__caption">
        {caption && (
          <span className="recipe-content-figure__caption-text">
            {caption}
          </span>
        )}
        {credit && (
          <span className="recipe-content-figure__caption-credit">
            © {credit}
          </span>
        )}
      </figcaption>
    )}
  </figure>
);

/**
 * Composant pour les citations et mises en avant
 * Style: Carte douce avec accent coloré, ombre subtile
 */
const Blockquote = ({ children, ...props }: any) => (
  <blockquote 
    className="recipe-content-blockquote"
    {...props}
  >
    <div className="recipe-content-blockquote__icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path 
          d="M11 9H7.5C7.5 7.5 8.5 6.5 10 6.5V5C7.5 5 5.5 7 5.5 9.5V16.5H11V9Z"
          fill="currentColor"
        />
        <path 
          d="M18.5 9H15C15 7.5 16 6.5 17.5 6.5V5C15 5 13 7 13 9.5V16.5H18.5V9Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div className="recipe-content-blockquote__content">
      {children}
    </div>
  </blockquote>
);

/**
 * Composant pour les listes non ordonnées
 * Style: Puces personnalisées, espacement optimal
 */
const UnorderedList = ({ children, ...props }: any) => (
  <ul 
    className="recipe-content-ul"
    {...props}
  >
    {children}
  </ul>
);

/**
 * Composant pour les éléments de liste
 * Style: Puce Japandi (cercle doux), animation subtile
 */
const ListItem = ({ children, ...props }: any) => (
  <li 
    className="recipe-content-li"
    {...props}
  >
    <span className="recipe-content-li__bullet" />
    <span className="recipe-content-li__content">{children}</span>
  </li>
);

/**
 * Composant pour les liens internes/externes
 * Style: Soulignement fluide, couleur naturelle
 */
interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const ContentLink = ({ href, children, external = false, ...props }: LinkProps) => {
  // Déterminer si le lien est externe
  const isExternal = external || href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href}
        className="recipe-content-link recipe-content-link--external"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <svg 
          className="recipe-content-link__external-icon"
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21V9M10 14L21 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link 
      href={href}
      className="recipe-content-link recipe-content-link--internal"
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 * Composant pour le texte en gras
 * Style: Poids équilibré, couleur légèrement plus foncée
 */
const Strong = ({ children, ...props }: any) => (
  <strong 
    className="recipe-content-strong"
    {...props}
  >
    {children}
  </strong>
);

/**
 * Composant pour l'italique
 * Style: Inclinaison douce, couleur plus claire
 */
const Emphasis = ({ children, ...props }: any) => (
  <em 
    className="recipe-content-em"
    {...props}
  >
    {children}
  </em>
);

/**
 * Composant pour le code inline
 * Style: Fond doux, coins arrondis, police monospace lisible
 */
const InlineCode = ({ children, ...props }: any) => (
  <code 
    className="recipe-content-code"
    {...props}
  >
    {children}
  </code>
);

/**
 * Composant pour les séparateurs/dividers
 * Style: Ligne douce avec motif décoratif central
 */
const Divider = () => (
  <div className="recipe-content-divider">
    <div className="recipe-content-divider__line" />
    <div className="recipe-content-divider__ornament">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    </div>
    <div className="recipe-content-divider__line" />
  </div>
);

/**
 * Configuration complète des composants MDX
 * Mapping des éléments HTML/Markdown vers nos composants personnalisés
 */
const RecipeMDXComponents = {
  // Titres
  h2: H2,
  h3: H3,
  
  // Contenu textuel
  p: Paragraph,
  strong: Strong,
  em: Emphasis,
  
  // Listes
  ul: UnorderedList,
  li: ListItem,
  
  // Medias et citations
  img: OptimizedImage,
  blockquote: Blockquote,
  
  // Liens et interactions
  a: ContentLink,
  
  // Code
  code: InlineCode,
  
  // Éléments personnalisés
  Divider,
  
  // Composants personnalisés pour recettes (si nécessaire)
  RecipeQuote: Blockquote, // Alias pour les citations spécifiques aux recettes
  RecipeImage: OptimizedImage, // Alias pour les images spécifiques aux recettes
};

export default RecipeMDXComponents;