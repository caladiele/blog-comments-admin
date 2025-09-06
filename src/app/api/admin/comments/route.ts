import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Fonction récursive pour récupérer les commentaires avec hiérarchie complète
async function getCommentsWithReplies(status: string, parentId: string | null = null): Promise<any[]> {
  let whereClause: any = { parentId }

  if (status === 'pending') {
    whereClause.approved = false
  } else if (status === 'approved') {
    whereClause.approved = true
  }

  whereClause.isDeleted = false

  const comments = await prisma.comment.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Pour chaque commentaire, récupérer récursivement ses réponses
  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      const replies = await getCommentsWithReplies(status, comment.id)
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

// GET /api/admin/comments?status=pending|approved
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'

    if (status === 'pending') {
      // ✅ SOLUTION SIMPLE : Pour les pending, récupérer TOUS les commentaires pending
      // puis les organiser en incluant leurs parents si nécessaire
      
      const allPendingComments = await prisma.comment.findMany({
        where: {
          approved: false,
          isDeleted: false
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      // Séparer les commentaires principaux des réponses
      const mainComments = allPendingComments.filter(c => !c.parentId)
      const replies = allPendingComments.filter(c => c.parentId)

      // Si il y a des réponses pending, récupérer leurs parents (même s'ils sont approuvés)
      const parentIds = [...new Set(replies.map(r => r.parentId))] as string[]
      
      // Créer une map pour construire la hiérarchie
      const commentMap = new Map()
      
      // Ajouter tous les commentaires pending à la map
      allPendingComments.forEach(comment => {
        commentMap.set(comment.id, {
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
          replies: []
        })
      })

      // Ajouter les commentaires parents si nécessaire
      if (parentIds.length > 0) {
        const parentComments = await prisma.comment.findMany({
          where: {
            id: { in: parentIds },
            isDeleted: false
          }
        })

        parentComments.forEach(comment => {
          if (!commentMap.has(comment.id)) {
            commentMap.set(comment.id, {
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
              replies: []
            })
          }
        })
      }

      // Construire la hiérarchie
      const rootComments: any[] = []
      
      commentMap.forEach(comment => {
        if (comment.parentId) {
          // C'est une réponse - l'ajouter à son parent
          const parent = commentMap.get(comment.parentId)
          if (parent) {
            parent.replies.push(comment)
          }
        } else {
          // C'est un commentaire principal
          rootComments.push(comment)
        }
      })

      // Nettoyer les replies vides et les trier
      const cleanComments = rootComments.map(comment => {
        if (comment.replies.length === 0) {
          delete comment.replies
        } else {
          comment.replies.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        }
        return comment
      })

      return NextResponse.json({ comments: cleanComments })

    } else {
      // Pour les approuvés, utiliser la logique hiérarchique normale
      const comments = await getCommentsWithReplies(status, null)
      return NextResponse.json({ comments })
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires admin:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}