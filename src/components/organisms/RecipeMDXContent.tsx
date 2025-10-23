// src/components/organisms/RecipeMDXContent.tsx

/**
 * @component RecipeMDXContent
 * @description
 * Composant principal pour l'intégration du contenu MDX dans les pages de recettes.
 * Applique le design system Japandi avec une approche holistique du contenu.
 * Optimisé pour SEO et Schema.org avec support des métadonnées enrichies.
 *
 * Objectifs UX :
 * - Créer une expérience de lecture immersive et apaisante (Elodie)
 * - Faciliter la découverte de contenu connexe (Emma)
 * - Maintenir l'esthétique épurée et chaleureuse du site (Marie)
 *
 * @example
 * ```tsx
 * <RecipeMDXContent 
 *   content={recipe.content}
 *   metadata={recipe}
 *   relatedContent={relatedArticles}
 * />
 * ```
 */



import { MDXRemote } from 'next-mdx-remote/rsc';
import { RecipeFullData } from '@/lib/recipes';
import OptimizedImage from '../atoms/OptimizedImage';
import { useMDXComponents } from 'mdx-components';
import '@/app/styles/recipe-mdx-content.css';

/*
import ContentNavigation from '@/components/molecules/ContentNavigation';
import RelatedContent from '@/components/molecules/RelatedContent';
import ContentReadingProgress from '@/components/atoms/ContentReadingProgress';
*/
/**
 * Props pour le composant RecipeMDXContent
 * @interface RecipeMDXContentProps
 */
interface RecipeMDXContentProps {
  /** Contenu MDX à afficher */
  content: string;
  /** Métadonnées de la recette pour l'enrichissement sémantique */
  metadata: RecipeFullData;
  /** Contenu connexe suggéré (articles, recettes similaires) - Optionnel */
  relatedContent?: Array<{
    titre: string;
    slug: string;
    categorie: string;
    imageIntro: {
      src: string;
      alt: string;
    };
  }>;
  /** Classes CSS additionnelles */
  className?: string;
}


export default function RecipeMDXContent({ 
  content, 
  metadata, 
  relatedContent,
  className = '' 
}: RecipeMDXContentProps) {

  const mdxComponents = useMDXComponents({});
  
  /**
   * Génération du JSON-LD pour Schema.org
   * Enrichit les métadonnées avec le contenu textuel
   */
  const generateContentSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://amande-basilic.fr/recettes/${metadata.slug}`
      },
      "headline": metadata.titre,
      "description": metadata.description || extractContentPreview(content),
      "articleBody": extractTextContent(content),
      "author": {
        "@type": "Person",
        "name": metadata.auteur || "Amande & Basilic"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Amande & Basilic",
        "logo": {
          "@type": "ImageObject",
          "url": "https://amande-basilic.fr/logo.png"
        }
      },
      "datePublished": metadata.date,
      "dateModified": metadata.derniereModification || metadata.date,
      "image": metadata.imageIntro.src,
      "articleSection": metadata.categoriePrincipale,
      "keywords": metadata.tags?.join(', '),
      // Liaison avec la recette principale
      "isPartOf": {
        "@type": "Recipe",
        "@id": `https://amande-basilic.fr/recettes/${metadata.slug}#recipe`
      }
    };
  };
  
  /**
   * Extraction d'un aperçu textuel du contenu MDX
   * Utilisé pour les métadonnées et le SEO
   */
  const extractContentPreview = (mdxContent: string): string => {
    // Supprime le markdown et extrait les premiers mots
    const textOnly = mdxContent
      .replace(/#{1,6}\s+/g, '') // Titres
      .replace(/\*\*(.+?)\*\*/g, '$1') // Gras
      .replace(/\*(.+?)\*/g, '$1') // Italique
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Liens
      .replace(/`(.+?)`/g, '$1') // Code inline
      .trim();
    
    return textOnly.substring(0, 160) + (textOnly.length > 160 ? '...' : '');
  };

  /**
   * Extraction du contenu textuel complet pour Schema.org
   */
  const extractTextContent = (mdxContent: string): string => {
    return mdxContent
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .trim();
  };  

  return (
    <>
      {/* Schema.org JSON-LD pour le contenu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateContentSchema())
        }}
      />

      {/* Indicateur de progression de lecture */}
      {/* <ContentReadingProgress /> */}

      {/* Navigation dans le contenu (ancres automatiques) */}
      {/* <ContentNavigation content={content} /> */}

      {/* Contenu principal MDX */}
      <section 
        className={`recipe-mdx-content ${className}`}
        itemScope 
        itemType="https://schema.org/Article"
      >
        <div className="recipe-mdx-content__wrapper">
          {/* Métadonnées cachées pour Schema.org */}
          <meta itemProp="headline" content={metadata.titre} />
          <meta itemProp="datePublished" content={metadata.date} />
          <meta itemProp="author" content={metadata.auteur || "Amande & Basilic"} />
          
          {/* Contenu MDX avec composants personnalisés */}
          <article 
            className="recipe-mdx-content__article"
            itemProp="articleBody"
          >
            <MDXRemote 
              source={content}
              components={mdxComponents}
            />
          </article>
        </div>
      </section>

      {/* Contenu connexe et suggestions */}
      {/* {relatedContent && relatedContent.length > 0 && (
        <RelatedContent 
          items={relatedContent}
          title="Pour aller plus loin"
          variant="organic"
        />
      )} */}
    </>
  );
}