// src/lib/mdx.ts - Version modifiée pour supporter les données de recette
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleImage {
  src: string
  alt: string
  caption?: string
  credit?: string
  couleurDominante?: string
}

export interface PostMetadata {
  // === METADONNES PRINCIPALES ===
  titre: string
  slug: string
  date: string
  auteur: string
  // === CATEGORISATION ===
  categoriePrincipale: string
  sousCategorie?: string
  tags: string[]
  // === PRODUCTION & LECTURE ===
  extrait?: string
  tempsDeLecture?: number
  typeDePost?: string
  // === VISUELS ===
  imageIntro: {
    src: string
    alt: string
    caption?: string
    credit?: string
    couleurDominante?: string
  }
  imagesArticles?: ArticleImage[]
  // === RECOMMENDATIONS ===
  relatedPosts?: string[]
  // Nouveaux champs pour les recettes
  recipeData?: {
    ingredients?: Array<{
      name: string
      amount: number | string
      unit: string
      essential?: boolean
      seasonal?: boolean
      tip?: string
      category?: string
    }>
    basePortions?: number
    environmentalImpact?: {
      co2Reduction: number
      waterSaving: number
      landSaving: number
      animalsSaved?: number
    }
    comparison?: string
  }
}

export interface Post extends PostMetadata {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts/inspirations/decouvertes')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, '')
      return getPostBySlug(slug)
    })
    .filter(post => post !== null) as Post[]

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

  
    return {
      slug,
      titre: data.titre || 'Titre non défini',
      date: data.date || new Date().toISOString().split('T')[0],
      auteur: data.auteur || 'Auteur inconnu',
      categoriePrincipale: data.categoriePrincipale || 'Général',
      tags: data.tags,
      imageIntro: data.imageIntro,
      relatedPosts: data.relatedPosts || [],
      recipeData: data.recipeData || null, // Nouvelles données de recette
      content,
    }
  } catch (error) {
    console.error(`Erreur lors de la lecture du post ${slug}:`, error)
    return null
  }
}

export function getRelatedPosts(relatedSlugs: string[]): Post[] {
  if (!relatedSlugs || relatedSlugs.length === 0) return []
  
  return relatedSlugs
    .map(slug => getPostBySlug(slug))
    .filter(post => post !== null) as Post[]
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/\.mdx$/, ''))
}

export function getLatestPost(): Post | null {
  const allPosts = getAllPosts()
  
  if (allPosts.length === 0) {
    return null
  }
  
  // Les posts sont déjà triés par date (plus récent en premier)
  console.log(allPosts[0])
  return allPosts[0]
}