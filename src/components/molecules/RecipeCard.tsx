// src/components/molecules/RecipeCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import ArticleTitle from '../atoms/ArticleTitle';
import ArticleCategory from '@/components/atoms/ArticleCategory';
import RecipeMetaBadge from '@/components/atoms/RecipeMetaBadge';
import '@/app/styles/recipe-card.css';

interface RecipeCardProps {
  titre: string;
  slug: string;
  categoriePrincipale: string;
  sousCategorie?: string;
  tagTemps: string;
  tagMisEnAvant?: string;
  imageIntro: {
    src: string;
    alt: string;
    couleurDominante?: string;
  };
}

export default function RecipeCard({
  titre,
  slug,
  categoriePrincipale,
  sousCategorie,
  tagTemps,
  tagMisEnAvant,
  imageIntro
}: RecipeCardProps) {
  // Formater la catégorie pour l'affichage
  const categoryDisplay = sousCategorie || categoriePrincipale;
  
  return (
    <article className="recipe-card">
        {/* Image */}
      <Link href={`/recettes/${slug}`} className="recipe-card-link">
        <div className="recipe-card-image">
          <Image
            src={imageIntro.src}
            alt={imageIntro.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="recipe-image"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      </Link>

        {/* Contenu */}
        <div className="recipe-card-content">
          {/* Catégorie */}
          <ArticleCategory category={categoriePrincipale} />
          
          {/* Titre */}
          <ArticleTitle title={titre} href={`/recettes/${slug}`} color="silentWhite" as="h2" />

          {/* Métadonnées */}
          <div className="recipe-meta">
            <RecipeMetaBadge icon="time" label={tagTemps} />
            {tagMisEnAvant && (
              <RecipeMetaBadge icon="tag" label={tagMisEnAvant} />
            )}
          </div>
        </div>
    </article>
  );
}