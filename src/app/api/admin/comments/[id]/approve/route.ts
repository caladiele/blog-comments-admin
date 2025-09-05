import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

// POST /api/admin/comments/[id]/approve
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    const comment = await prisma.comment.update({
      where: { id },
      data: { approved: true }
    })

    return NextResponse.json({
      message: 'Commentaire approuvé avec succès',
      comment
    })
  } catch (error) {
    console.error('Erreur lors de l\'approbation:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}