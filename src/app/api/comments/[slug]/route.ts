import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

// Fonction récursive pour récupérer les commentaires avec toutes leurs réponses
async function getCommentsWithReplies(postSlug: string, parentId: string | null = null): Promise<any[]> {
  const comments = await prisma.comment.findMany({
    where: {
      postSlug,
      approved: true,
      parentId
    },
    orderBy: {
      createdAt: parentId ? 'asc' : 'desc'
    }
  })

  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      const replies = await getCommentsWithReplies(postSlug, comment.id)
      
      // Formatter le commentaire selon son statut
      const formattedComment = {
        id: comment.id,
        author: comment.isDeleted ? `@${comment.author}` : comment.author,
        content: comment.isDeleted 
          ? `Le commentaire de @${comment.author} est indisponible` 
          : comment.content,
        createdAt: comment.createdAt,
        isDeleted: comment.isDeleted,
        replies: replies.length > 0 ? replies : undefined
      }
      
      return formattedComment
    })
  )

  return commentsWithReplies
}

// GET /api/comments/[slug]?page=1
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const perPage = 20
    const skip = (page - 1) * perPage

    // Récupérer seulement les commentaires principaux pour la pagination
    const mainComments = await prisma.comment.findMany({
      where: {
        postSlug: slug,
        approved: true,
        parentId: null
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: perPage
    })

    // Pour chaque commentaire principal, récupérer toute sa hiérarchie
    const commentsWithFullHierarchy = await Promise.all(
      mainComments.map(async (comment) => {
        const replies = await getCommentsWithReplies(slug, comment.id)
        return {
          id: comment.id,
          author: comment.author,
          content: comment.content,
          createdAt: comment.createdAt,
          replies: replies.length > 0 ? replies : undefined
        }
      })
    )

    const total = await prisma.comment.count({
      where: {
        postSlug: slug,
        approved: true,
        parentId: null
      }
    })

    const hasMore = skip + perPage < total

    return NextResponse.json({
      comments: commentsWithFullHierarchy,
      hasMore,
      page,
      total
    })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST reste identique mais plus simple
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { author, email, content, parentId } = body

    // Validation basique
    if (!author || !email || !content) {
      return NextResponse.json(
        { error: 'Les champs auteur, email et contenu sont requis' },
        { status: 400 }
      )
    }

    // Si c'est une réponse, vérifier que le commentaire parent existe et est approuvé
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      })

      if (!parentComment || !parentComment.approved) {
        return NextResponse.json(
          { error: 'Commentaire parent non trouvé ou non approuvé' },
          { status: 404 }
        )
      }
    }

    const comment = await prisma.comment.create({
      data: {
        postSlug: slug,
        author: author.trim(),
        email: email.trim().toLowerCase(),
        content: content.trim(),
        approved: false,
        parentId: parentId || null
      }
    })

    return NextResponse.json(
      {
        message: 'Commentaire soumis avec succès. Il sera visible après modération.',
        id: comment.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}