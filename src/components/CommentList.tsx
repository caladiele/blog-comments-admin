'use client'

import { useState, useEffect, useCallback } from 'react'
import CommentItem from './CommentItem'
import CommentThread from './CommentThread'
import { BlogComment, Reply } from '@/types/comments'


interface CommentListProps {
  postSlug: string
  refreshTrigger?: number
}

export default function CommentList({ postSlug }: CommentListProps) {
  const [comments, setComments] = useState<BlogComment[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)


const loadComments = useCallback(async (pageNum: number, reset = false) => {
  if (pageNum === 1) setLoading(true)
  else setLoadingMore(true)

  try {
    const response = await fetch(`/api/comments/${postSlug}?page=${pageNum}`)
    
    if (response.ok) {
      const data = await response.json()
      
      if (reset || pageNum === 1) {
        setComments(data.comments)
      } else {
        setComments(prev => [...prev, ...data.comments])
      }
      
      setHasMore(data.hasMore)
      setPage(pageNum)
      setTotal(data.total)
    }
  } catch (error) {
    console.error('Erreur réseau:', error)
  } finally {
    setLoading(false)
    setLoadingMore(false)
  }
}, [postSlug])

  useEffect(() => {
    loadComments(1, true)
  }, [loadComments])

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadComments(page + 1)
    }
  }

  const handleReplySubmitted = () => {
    // Recharger les commentaires pour afficher les nouvelles réponses
      setTimeout(() => {
    loadComments(1, true)
  }, 500)
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 mt-4">Chargement des commentaires...</p>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="text-gray-500 text-lg">Aucun commentaire pour le moment.</p>
        <p className="text-gray-400 text-sm mt-2">Soyez le premier à commenter !</p>
      </div>
    )
  }

  // Calculer le total des commentaires et réponses
  const totalReplies = comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0)
  const totalItems = total + totalReplies

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <svg
          className="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {totalItems} {totalItems === 1 ? 'commentaire' : 'commentaires'}
        {totalReplies > 0 && (
          <span className="text-sm text-gray-500">
            ({total} {total === 1 ? 'commentaire' : 'commentaires'}, {totalReplies} {totalReplies === 1 ? 'réponse' : 'réponses'})
          </span>
        )}
      </h3>

<div className="space-y-6">
  {comments.map((comment) => (
    <CommentThread
      key={comment.id}
      comment={comment}
      postSlug={postSlug}
      depth={0}
      onReplySubmitted={handleReplySubmitted}
    />
  ))}
</div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2 mx-auto"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Chargement...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Charger plus ({total - comments.length} restants)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}