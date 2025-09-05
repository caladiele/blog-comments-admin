import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/mdx'

// GET /api/admin/articles
export async function GET() {
  try {
    const posts = getAllPosts()
    
    // Ajouter des stats sur les commentaires pour chaque article
    const articlesWithStats = posts.map(post => ({
      ...post,
      // Ces stats pourraient être calculées plus tard si besoin
      commentCount: 0,
      pendingComments: 0
    }))

    return NextResponse.json({ articles: articlesWithStats })
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}