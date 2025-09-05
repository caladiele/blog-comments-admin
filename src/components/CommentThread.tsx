'use client'

import { useState } from 'react'
import { BlogComment } from '@/types/comments'

interface CommentThreadProps {
  comment: BlogComment
  postSlug: string
  depth?: number
  onReplySubmitted: () => void
}

export default function CommentThread({ 
  comment, 
  postSlug, 
  depth = 0, 
  onReplySubmitted 
}: CommentThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyFormData, setReplyFormData] = useState({
    author: '',
    email: '',
    content: ''
  })
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)
  const [replyMessage, setReplyMessage] = useState('')

  // Limiter l'indentation visuelle après 4 niveaux
  const maxVisualDepth = Math.min(depth, 4)
  const marginLeft = maxVisualDepth * 32 // 32px par niveau

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingReply(true)
    setReplyMessage('')

    try {
      const response = await fetch(`/api/comments/${postSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...replyFormData,
          parentId: comment.id // Réponse directe à ce commentaire
        }),
      })

      if (response.ok) {
        setReplyMessage('✅ Réponse soumise ! Elle sera visible après modération.')
        setReplyFormData({ author: '', email: '', content: '' })
        setShowReplyForm(false)
        onReplySubmitted()
      } else {
        const error = await response.json()
        setReplyMessage(`❌ Erreur: ${error.error}`)
      }
    } catch (error) {
      setReplyMessage('❌ Erreur réseau. Veuillez réessayer.')
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const cancelReply = () => {
    setShowReplyForm(false)
    setReplyFormData({ author: '', email: '', content: '' })
    setReplyMessage('')
  }

  // Couleurs différentes selon la profondeur et le statut de suppression
  const bgColor = comment.isDeleted ? 'bg-gray-100' : 
                  depth === 0 ? 'bg-gray-50' : 
                  depth === 1 ? 'bg-blue-50' : 
                  depth === 2 ? 'bg-green-50' : 
                  depth === 3 ? 'bg-yellow-50' : 'bg-purple-50'

  const borderColor = comment.isDeleted ? 'border-l-gray-400' :
                      depth === 0 ? 'border-l-gray-300' : 
                      depth === 1 ? 'border-l-blue-500' : 
                      depth === 2 ? 'border-l-green-500' : 
                      depth === 3 ? 'border-l-yellow-500' : 'border-l-purple-500'

  return (
    <div 
      className="space-y-4"
      style={{ marginLeft: `${marginLeft}px` }}
    >
      {/* Commentaire actuel */}
      <div className={`${bgColor} rounded-lg p-4 border-l-4 ${borderColor}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 ${comment.isDeleted ? 'bg-gray-400' : 'bg-blue-600'} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className={`font-medium ${comment.isDeleted ? 'text-gray-500' : 'text-gray-900'}`}>
                  {comment.author}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                {depth > 0 && (
                  <span className="text-blue-600 text-xs ml-2 bg-white px-2 py-1 rounded">
                    Niveau {depth + 1}
                  </span>
                )}
                {comment.isDeleted && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded ml-2">
                    Supprimé
                  </span>
                )}
              </div>
            </div>
            <p className={`leading-relaxed whitespace-pre-wrap mb-3 ${comment.isDeleted ? 'text-gray-500 italic' : 'text-gray-700'}`}>
              {comment.content}
            </p>
          </div>
        </div>

        {/* Bouton Répondre - désactivé pour les commentaires supprimés */}
        {!comment.isDeleted && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              {showReplyForm ? 'Annuler' : 'Répondre'}
            </button>
            
            {comment.replies && comment.replies.length > 0 && (
              <span className="text-gray-500 text-sm">
                {comment.replies.length} réponse{comment.replies.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Message pour les commentaires supprimés */}
        {comment.isDeleted && comment.replies && comment.replies.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm italic">
              Ce commentaire a été supprimé, mais {comment.replies.length} réponse{comment.replies.length > 1 ? 's restent' : ' reste'} visible{comment.replies.length > 1 ? 's' : ''}.
            </span>
          </div>
        )}

        {/* Formulaire de réponse - seulement si pas supprimé */}
        {showReplyForm && !comment.isDeleted && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Répondre à {comment.author}
            </h4>
            
            <form onSubmit={handleReplySubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Votre nom *"
                  required
                  value={replyFormData.author}
                  onChange={(e) => setReplyFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Votre email *"
                  required
                  value={replyFormData.email}
                  onChange={(e) => setReplyFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <textarea
                placeholder="Votre réponse *"
                required
                rows={3}
                value={replyFormData.content}
                onChange={(e) => setReplyFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmittingReply}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isSubmittingReply ? 'Envoi...' : 'Répondre'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelReply}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
                  >
                    Annuler
                  </button>
                </div>
                
                {replyMessage && (
                  <div className={`text-sm px-3 py-1 rounded ${
                    replyMessage.includes('✅') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {replyMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Réponses récursives */}
      {comment.replies && comment.replies.map((reply) => (
        <CommentThread
          key={reply.id}
          comment={reply}
          postSlug={postSlug}
          depth={depth + 1}
          onReplySubmitted={onReplySubmitted}
        />
      ))}
    </div>
  )
}