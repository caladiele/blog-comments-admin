import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CommentsSection from '@/components/CommentsSection'
import RelatedPosts from '@/components/RelatedPosts'

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

            {/* Contenu MDX avec classes Typography */}
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