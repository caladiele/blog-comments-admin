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
  tags: string[];
  imageIntro: {
    src: string;
    alt: string;
    couleurDominante?: string;
  };
}

// Fonction récursive pour trouver tous les fichiers .md
function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    console.log(filePath)
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


