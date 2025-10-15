// src/components/organisms/RecipesSection.tsx
import RecipeCard from '@/components/molecules/RecipeCard';
import WabisabiButton from '@/components/atoms/WabisabiButton';
import '@/app/styles/recipes-section.css';

// Type pour une recette (à adapter selon ton système de données)
interface Recipe {
  titre: string;
  slug: string;
  categoriePrincipale: string;
  sousCategorie?: string;
  tagTemps: string;
  tags: string[];
  tagMisEnAvant?: string;
  imageIntro: {
    src: string;
    alt: string;
    couleurDominante?: string;
  };
}

interface RecipesSectionProps {
  recipes: Recipe[];
  maxRecipes?: number; // Limite d'affichage (ex: 6 pour la home)
}

export default function RecipesSection({ 
  recipes, 
  maxRecipes = 6 
}: RecipesSectionProps) {
  // Limiter le nombre de recettes affichées
  const displayedRecipes = recipes.slice(0, maxRecipes);
  
  // Extraire le tag secondaire pertinent (ici le 2e tag par défaut)
  const getSecondaryTag = (tags: string[]) => {
    // Filtrer les tags génériques
    const filtered = tags.filter(tag => 
      !tag.includes('max') && 
      !tag.match(/^\d/) &&
      tag !== 'Automne' // Adapter selon tes besoins
    );
    return filtered[0] || undefined;
  };

  return (
    <section className="recipes-section" aria-labelledby="recipes-heading">
      {/* Titre de section */}
      <h2 id="recipes-heading" className="recipes-heading">
        recettes
      </h2>

      {/* Grid de recettes */}
      <div className="recipes-grid">
        {displayedRecipes.map((recipe) => {
          return (
          <>
            <RecipeCard
              key={recipe.slug}
              titre={recipe.titre}
              slug={recipe.slug}
              categoriePrincipale={recipe.categoriePrincipale}
              sousCategorie={recipe.sousCategorie}
              tagTemps={recipe.tagTemps}
              tagMisEnAvant={recipe.tagMisEnAvant}
              imageIntro={recipe.imageIntro}
            />
          </>
        )
        })}
      </div>

      {/* Bouton "voir toutes les recettes" */}
    <div className="wabisabi-bouton-container">
     <WabisabiButton href={`/articles/`} className='wabisabi-button wabisabi-silentWhite' label="nos recettes" />
    </div>
    </section>
  );
}