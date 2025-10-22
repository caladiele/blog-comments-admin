// src/components/molecules/RecipeHero.tsx
import Image from 'next/image';
import ArticleTitle from '../atoms/ArticleTitle';
import ArticleCategory from '../atoms/ArticleCategory';
import RecipeMetaBadge from '@/components/atoms/RecipeMetaBadge';
import '@/app/styles/recipe-hero.css';

interface RecipeHeroProps {
  titre: string;
  categorie: string;
  sousCategorie?: string;
  tagTemps: string;
  tagMisEnAvant?: string;
  tags: string[];
  imageIntro: {
    src: string;
    alt: string;
    couleurDominante?: string;
  };
}

export default function RecipeHero({
  titre,
  categorie,
  sousCategorie,
  tagTemps,
  tagMisEnAvant,
  tags,
  imageIntro
}: RecipeHeroProps) {

  return (
    <header className="recipe-hero">
      {/* Image */}
      <figure className="recipe-hero-image">
        <Image
          src={imageIntro.src}
          alt={imageIntro.alt}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
          className="hero-image"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </figure>

      {/* Contenu */}
      <div className="recipe-hero-content">
        <div className="recipe-hero-inner">
          {/* Catégorie */}
          <ArticleCategory category={sousCategorie || ''} />
          {/* Titre */}
          <ArticleTitle title={titre} color="color-oyster" as="h1" hasLink={false} />
          {/* Métadonnées */}
          <div className="recipe-hero-meta">
            <RecipeMetaBadge icon="time" label={tagTemps} />
            {tagMisEnAvant && (
              <RecipeMetaBadge icon="tag" label={tagMisEnAvant} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}