import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// POST /api/admin/comments/[id]/reply - Réponse rapide admin
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: parentId } = await params
    const body = await request.json()
    const { content, author = 'Administrateur' } = body

    // Validation
    if (!content || content.trim().length < 5) {
      return NextResponse.json(
        { error: 'Le contenu de la réponse est requis (min 5 caractères)' },
        { status: 400 }
      )
    }

    // Vérifier que le commentaire parent existe
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId }
    })

    if (!parentComment) {
      return NextResponse.json(
        { error: 'Commentaire parent non trouvé' },
        { status: 404 }
      )
    }

    // Créer la réponse admin (directement approuvée)
    const reply = await prisma.comment.create({
      data: {
        postSlug: parentComment.postSlug,
        author: author.trim(),
        email: 'admin@blog.com', // Email fictif pour l'admin
        content: content.trim(),
        approved: true, // Les réponses admin sont directement approuvées
        parentId: parentId
      }
    })

    return NextResponse.json({
      message: 'Réponse admin créée avec succès',
      reply: {
        id: reply.id,
        author: reply.author,
        content: reply.content,
        createdAt: reply.createdAt
      }
    })
  } catch (error) {
    console.error('Erreur lors de la création de la réponse admin:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}