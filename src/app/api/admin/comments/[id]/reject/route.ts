import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// POST /api/admin/comments/[id]/reject  
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Pour le moment, on supprime le commentaire rejeté
    // Plus tard on pourrait ajouter un champ 'status' pour garder l'historique
    await prisma.comment.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Commentaire rejeté et supprimé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors du rejet:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}