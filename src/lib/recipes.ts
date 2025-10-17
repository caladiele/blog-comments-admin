// src/lib/recipes.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface RecipeData {
  titre: string;
  slug: string;
  categoriePrincipale: string;
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

export interface RecipeFullData extends RecipeData {
  content: string;
  date: string;
  tagMisEnAvant?: string;
  // Autres métadonnées complètes
  auteur?: string;
  derniereModification?: string;
  imagesArticle?: Array<{
    src: string;
    alt: string;
    credit?: string;
    couleurDominante?: string;
  }>;
}

// Fonction récursive pour trouver tous les fichiers .md
function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Si c'est un dossier, on explore récursivement
      arrayOfFiles = getAllMarkdownFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.mdx')) {
      // Si c'est un fichier .md, on l'ajoute
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

export async function getAllRecipes(): Promise<RecipeData[]> {
  const recipesDirectory = path.join(process.cwd(), 'content/posts/recettes/');
  
  // Récupérer tous les fichiers .md récursivement
  const allFiles = getAllMarkdownFiles(recipesDirectory);
   
  const recipes = allFiles.map(filePath => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      titre: data.titre,
      date: data.date,
      slug: data.slug,
      categoriePrincipale: data.categoriePrincipale,
      sousCategorie: data.sousCategorie,
      tagTemps: data.tagTemps,
      tagMisEnAvant: data.tagMisEnAvant,
      tags: data.tags || [],
      imageIntro: data.imageIntro
    };
  })
  .sort((a, b) => {
      // Tri par date décroissante (plus récent d'abord)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  return recipes;
}

// NOUVELLE FONCTION : Récupérer une recette par slug
export async function getRecipeBySlug(slug: string): Promise<RecipeFullData | null> {
  const recipesDirectory = path.join(process.cwd(), 'content/posts/recettes');
  const allFiles = getAllMarkdownFiles(recipesDirectory);
  
  for (const filePath of allFiles) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      if (data.slug === slug) {
        return {
          titre: data.titre,
          slug: data.slug,
          date: data.date,
          categoriePrincipale: data.categoriePrincipale,
          sousCategorie: data.sousCategorie,
          tagTemps: data.tagTemps,
          tagMisEnAvant: data.tagMisEnAvant,
          tags: data.tags || [],
          imageIntro: data.imageIntro,
          auteur: data.auteur,
          derniereModification: data.derniereModification,
          imagesArticle: data.imagesArticle,
          content
        };
      }
    } catch (error) {
      console.warn(`⚠️ Erreur lecture fichier: ${filePath}`);
    }
  }
  
  return null;
}

// NOUVELLE FONCTION : Générer les slugs pour static generation
export async function getAllRecipeSlugs(): Promise<string[]> {
  const recipes = await getAllRecipes();
  return recipes.map(recipe => recipe.slug);
}


