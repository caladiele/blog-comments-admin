// src/lib/mdx.ts - Version modifiée pour supporter les données de recette
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
  title: string
  slug: string
  date: string
  author: string
  category: string
  imageUrl: string
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

const postsDirectory = path.join(process.cwd(), 'content/posts')

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
      title: data.title || 'Titre non défini',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Auteur inconnu',
      category: data.category || 'Général',
      imageUrl: data.imageUrl || 'https://via.placeholder.com/800x400',
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