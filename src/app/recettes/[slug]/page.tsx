// src/app/recettes/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipeSlugs } from '@/lib/recipes';
import Header from '@/components/organisms/Header'
import Breadcrumb from '@/components/atoms/Breadcrumb';
import RecipeHero from '@/components/molecules/RecipeHero';
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
    <Header />
    <div className="divider-container"><div className='divider'></div></div>
    <main className="main recipe-page">
      <Breadcrumb items={breadcrumbItems} />
      
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
          <p>Contenu de la recette à venir...</p>
        </div>
      </div>
    </main>
    </>
  );
}