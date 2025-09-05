'use client'

import { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

interface CommentsSectionProps {
  postSlug: string
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleNewComment = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Commentaires
      </h2>
      <CommentForm postSlug={postSlug} onSuccess={handleNewComment} />
    <CommentList postSlug={postSlug} />
    </div>
  )
}