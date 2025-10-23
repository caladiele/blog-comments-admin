// src/app/recettes/[slug]/page.tsx

/**
 * @page RecipePage
 * @description
 * Page individuelle d'une recette avec intégration complète du contenu MDX.
 * 
 * Architecture:
 * - Hero avec métadonnées et image
 * - Détails de la recette (temps, ingrédients, instructions)
 * - Contenu MDX enrichi (contexte, conseils, variations)
 * - Composants interactifs (calculateur, shopping list, impact environnemental)
 * 
 * SEO & Schema.org:
 * - Métadonnées enrichies pour Google
 * - JSON-LD pour recettes et articles
 * - Breadcrumbs structurés
 * - Images optimisées
 */

import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipeSlugs } from '@/lib/recipes';
import Header from '@/components/organisms/Header'
import Breadcrumb from '@/components/atoms/Breadcrumb';
import RecipeHero from '@/components/molecules/RecipeHero';
import RecipeDetailsSection from '@/components/organisms/RecipeDetailSection';
import RecipeMDXContent from '@/components/organisms/RecipeMDXContent';
import ArticleSummary from '@/components/molecules/ResumeArticle';

import '@/app/styles/recipe-page.css';

// Génération statique des pages
export async function generateStaticParams() {
  const slugs = await getAllRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Métadonnées dynamiques
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug);
  
  if (!recipe) {
    return {
      title: 'Recette introuvable',
    };
  }
  
  return {
    title: `${recipe.titre} | Amande & Basilic`,
    openGraph: {
      images: [recipe.imageIntro.src],
    },
  };
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug);
  
  if (!recipe) {
    notFound();
  }
  
  // Construire le breadcrumb
  const breadcrumbItems = [
    { label: 'accueil', href: '/' },
    //{ label: recipe.sousCategorie || recipe.categoriePrincipale, href: '/recettes' },
    { label: recipe.titre }
  ];

  return (
    <>
    {/* Header principal de la page */}
    <Header />
    <div className="divider-container"><div className='divider'></div></div>
    {/* Contenu principal de la page */}
    <main className="main recipe-page">
      <Breadcrumb items={breadcrumbItems} />
    {/* Recette */}
    <article className="article-wrapper" itemScope itemType="https://schema.org/Recipe">
      <RecipeHero
        titre={recipe.titre}
        categorie={recipe.categoriePrincipale}
        sousCategorie={recipe.sousCategorie}
        tagTemps={recipe.tagTemps}
        tagMisEnAvant={recipe.tagMisEnAvant}
        tags={recipe.tags}
        imageIntro={recipe.imageIntro}
      />
      
      {/* Le contenu MDX sera ajouté ici dans la prochaine étape */}
      <div className="recipe-content-wrapper">
        <div className="recipe-content">
          {/* Placeholder pour le moment */}
          <RecipeDetailsSection 
            titre={recipe.titre}
            slug={recipe.slug}
            totalTime={recipe.totalTime}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime || '0'}
            date={recipe.date}
            description={recipe.description || ''}
            auteur={recipe.auteur || ''}
            portions={4}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            image={recipe.imageIntro.src}
            sousCategorie={recipe.sousCategorie || ''}
            faq={recipe.faq} 
          />
        </div>
      </div>
      {recipe.content && (
          <RecipeMDXContent
            content={recipe.content}
            metadata={recipe}
          />
       )}
      </article>
      {recipe.summaryQAs && recipe.summaryQAs.length > 0 && (
        <ArticleSummary items={recipe.summaryQAs} />
      )}
    </main>
    </>
  );
}