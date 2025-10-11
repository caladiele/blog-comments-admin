// src/app/articles/[slug]/page.tsx
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CommentsSection from '@/components/CommentsSection'
import RelatedPosts from '@/components/RelatedPosts'

// Importer tous les composants de recette
import PortionCalculator from '@/components/recipe/PortionCalculator'
import IngredientList from '@/components/recipe/IngredientList'
import Timer from '@/components/recipe/Timer'
import ShoppingList from '@/components/recipe/ShoppingList'
import EnvironmentalImpact from '@/components/recipe/EnvironmentalImpact'
import Alert from '@/components/recipe/Alert'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Créer les composants MDX avec les données du post
  const mdxComponents = {
    // Composants de recette avec données pré-remplies depuis le frontmatter
    PortionCalculator: (props: any) => (
      <PortionCalculator 
        defaultPortions={post.recipeData?.basePortions || 4}
        {...props} 
      />
    ),
    IngredientList: (props: any) => (
      <IngredientList 
        ingredients={post.recipeData?.ingredients || []}
        basePortions={post.recipeData?.basePortions || 4}
        {...props} 
      />
    ),
    ShoppingList: (props: any) => (
      <ShoppingList 
        ingredients={post.recipeData?.ingredients || []}
        basePortions={post.recipeData?.basePortions || 4}
        {...props} 
      />
    ),
    EnvironmentalImpact: (props: any) => (
      <EnvironmentalImpact 
        comparison={post.recipeData?.comparison || "vs équivalent traditionnel"}
        impactData={post.recipeData?.environmentalImpact}
        {...props} 
      />
    ),
    // Composants sans données spécifiques
    Timer,
    Alert,
    
    // Styles existants
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold mb-5 text-gray-800 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        {children}
      </h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-6 text-gray-700 leading-relaxed text-lg">
        {children}
      </p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-6 text-gray-700 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="mb-2 leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-6 italic text-gray-600 bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">
        {children}
      </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
      <pre className="bg-gray-900 text-white p-6 rounded-lg overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour aux articles
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Image principale */}
          <div className="relative h-64 md:h-80">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Métadonnées */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>Par {post.author}</span>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {post.title}
            </h1>

            {/* Contenu MDX avec composants */}
            <article className="prose prose-lg prose-slate max-w-none 
                               prose-headings:text-gray-900 
                               prose-p:text-gray-700 
                               prose-p:leading-relaxed
                               prose-strong:text-gray-900
                               prose-code:text-red-600
                               prose-code:bg-gray-100
                               prose-blockquote:border-blue-500
                               prose-blockquote:bg-gray-50">
              <MDXRemote 
                source={post.content}
                components={mdxComponents}
                options={{
                  parseFrontmatter: false,
                }}
              />
            </article>
          </div>
        </article>

        {/* Section articles liés */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <div className="mt-12">
            <RelatedPosts relatedSlugs={post.relatedPosts} />
          </div>
        )}

        {/* Section commentaires */}
        <div className="mt-12">
          <CommentsSection postSlug={slug} />
        </div>
      </main>
    </div>
  )
}