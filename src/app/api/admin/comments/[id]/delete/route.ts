import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// POST /api/admin/comments/[id]/delete - Suppression douce
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Vérifier que le commentaire existe
    const comment = await prisma.comment.findUnique({
      where: { id }
    })

    if (!comment) {
      return NextResponse.json(
        { error: 'Commentaire non trouvé' },
        { status: 404 }
      )
    }

    // Marquer comme supprimé (suppression douce)
    const deletedComment = await prisma.comment.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: 'admin' // Ou récupérer l'ID de l'admin connecté
      }
    })

    return NextResponse.json({
      message: 'Commentaire supprimé avec succès',
      comment: deletedComment
    })
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}