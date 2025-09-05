import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// GET /api/admin/articles/[slug] - Récupérer un article pour édition
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    
    console.log('🔍 API GET article:', slug) // DEBUG
    
    if (slug === 'new') {
      // Retourner un template pour nouvel article
      const newArticle = {
        slug: '',
        title: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        imageUrl: '',
        content: '# Nouveau Article\n\nContenu de votre article ici...',
        relatedPosts: [],
        isNew: true
      }
      console.log('✅ Nouvel article template:', newArticle) // DEBUG
      return NextResponse.json(newArticle)
    }

    const post = getPostBySlug(slug)
    if (!post) {
      console.log('❌ Article non trouvé:', slug) // DEBUG
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
    }

    console.log('✅ Article trouvé:', { title: post.title, slug: post.slug }) // DEBUG
    return NextResponse.json(post)
  } catch (error) {
    console.error('❌ Erreur lors de la récupération:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/articles/[slug] - Sauvegarder un article
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug: originalSlug } = await params
    const body = await request.json()
    const { slug, title, author, date, category, imageUrl, content, relatedPosts } = body

    console.log('💾 API PUT article:', originalSlug, '→', slug) // DEBUG

    // Validation
    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, titre et contenu sont requis' },
        { status: 400 }
      )
    }

    // Créer le contenu MDX complet avec front-matter
    const frontMatter = {
      title,
      slug,
      date,
      author,
      category,
      imageUrl,
      relatedPosts: relatedPosts || [] // Inclure les articles liés
    }

    const fileContent = matter.stringify(content, frontMatter)

    // Chemin du fichier
    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    // Si c'est un nouveau slug et pas "new", vérifier qu'il n'existe pas déjà
    if (originalSlug === 'new' && fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà' },
        { status: 409 }
      )
    }

    // Si le slug a changé, supprimer l'ancien fichier
    if (originalSlug !== 'new' && originalSlug !== slug) {
      const oldFilePath = path.join(postsDirectory, `${originalSlug}.mdx`)
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath)
      }
    }

    // Écrire le nouveau fichier
    fs.writeFileSync(filePath, fileContent, 'utf8')

    console.log('✅ Article sauvegardé:', slug) // DEBUG

    return NextResponse.json({
      message: 'Article sauvegardé avec succès',
      slug
    })
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/articles/[slug] - Supprimer un article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    const filePath = path.join(postsDirectory, `${slug}.mdx`)

    console.log('🗑️ API DELETE article:', slug) // DEBUG

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
    }

    fs.unlinkSync(filePath)

    console.log('✅ Article supprimé:', slug) // DEBUG

    return NextResponse.json({ message: 'Article supprimé avec succès' })
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}