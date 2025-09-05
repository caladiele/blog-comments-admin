import Link from 'next/link'
import Image from 'next/image'
import { getRelatedPosts } from '@/lib/mdx'

interface RelatedPostsProps {
  relatedSlugs: string[]
}

export default function RelatedPosts({ relatedSlugs }: RelatedPostsProps) {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null
  }

  const relatedPosts = getRelatedPosts(relatedSlugs)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vous pourriez aussi aimer
        </h2>
        <div className="w-16 h-1 bg-blue-600 rounded"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedPosts.slice(0, 4).map((post) => (
          <Link
            key={post.slug}
            href={`/articles/${post.slug}`}
            className="group block"
          >
            <article className="h-full bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-colors duration-200"></div>
              </div>

              {/* Contenu */}
              <div className="p-4">
                {/* Catégorie */}
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Titre */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                {/* Métadonnées */}
                <div className="flex items-center text-xs text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Message si moins de 4 articles */}
      {relatedPosts.length < relatedSlugs.length && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          {relatedSlugs.length - relatedPosts.length} article(s) lié(s) non trouvé(s)
        </div>
      )}
    </section>
  )
}