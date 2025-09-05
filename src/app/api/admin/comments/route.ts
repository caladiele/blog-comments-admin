import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Fonction récursive pour récupérer les commentaires avec hiérarchie complète
async function getCommentsWithReplies(status: string, parentId: string | null = null, includeDeleted: boolean = false): Promise<any[]> {
  let whereClause: any = { parentId }

  whereClause.isDeleted = false

  // Filtrer les commentaires supprimés selon le paramètre
  if (!includeDeleted) {
    whereClause.isDeleted = false
  }

  const comments = await prisma.comment.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Pour chaque commentaire, récupérer récursivement ses réponses
  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      const replies = await getCommentsWithReplies(status, comment.id, includeDeleted)
      return {
        id: comment.id,
        postSlug: comment.postSlug,
        author: comment.author,
        email: comment.email,
        content: comment.content,
        approved: comment.approved,
        createdAt: comment.createdAt,
        parentId: comment.parentId,
        isDeleted: comment.isDeleted,
        deletedAt: comment.deletedAt,
        deletedBy: comment.deletedBy,
        replies: replies.length > 0 ? replies : undefined
      }
    })
  )

  return commentsWithReplies
}

// GET /api/admin/comments?status=pending|approved&includeDeleted=true|false
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'
    const includeDeleted = searchParams.get('includeDeleted') === 'true'

    // Récupérer seulement les commentaires principaux avec leur hiérarchie
    const comments = await getCommentsWithReplies(status, null, includeDeleted)

    return NextResponse.json({ 
      comments,
      meta: {
        status,
        includeDeleted,
        total: comments.length
      }
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires admin:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}