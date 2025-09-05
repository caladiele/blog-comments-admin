'use client'

import { useState } from 'react'

interface AdminComment {
  id: string
  postSlug: string
  author: string
  email: string
  content: string
  approved: boolean
  createdAt: string
  parentId?: string | null
  replies?: AdminComment[]
  isDeleted?: boolean      // Ajouter
  deletedAt?: string       // Ajouter
  deletedBy?: string       // Ajouter
}

interface AdminCommentThreadProps {
  comment: AdminComment
  depth?: number
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onQuickReply: (commentId: string, content: string) => void
  onDataReload: () => void  // Ajouter cette ligne
  commentFilter: 'pending' | 'approved'
}

export default function AdminCommentThread({ 
  comment, 
  depth = 0, 
  onApprove, 
  onReject, 
  onQuickReply,
  onDataReload,
  commentFilter 
}: AdminCommentThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)

  const marginLeft = Math.min(depth, 4) * 20 // 20px par niveau, max 4 niveaux visuels

  const handleQuickReply = async () => {
    if (!replyContent.trim()) return

    setIsSubmittingReply(true)
    try {
      await onQuickReply(comment.id, replyContent.trim())
      setReplyContent('')
      setShowReplyForm(false)
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error)
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const cancelReply = () => {
    setShowReplyForm(false)
    setReplyContent('')
  }

  const handleDelete = async () => {
      if (!confirm(`Êtes-vous sûr de vouloir supprimer le commentaire de ${comment.author} ? Il sera remplacé par un message générique mais les réponses seront préservées.`)) {
      return
  }

  try {
    const response = await fetch(`/api/admin/comments/${comment.id}/delete`, {
      method: 'POST'
    })

    if (response.ok) {
       onDataReload() // Recharger via la fonction existante
    } else {
      console.error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
  }
}

  // Couleurs selon le statut et la profondeur
  const bgColor = comment.approved 
    ? depth === 0 ? 'bg-green-50' : 'bg-green-25'
    : depth === 0 ? 'bg-yellow-50' : 'bg-yellow-25'

  const borderColor = comment.approved ? 'border-l-green-500' : 'border-l-yellow-500'

  return (
    <div style={{ marginLeft: `${marginLeft}px` }} className="space-y-4">
      {/* Commentaire actuel */}
      <div className={`${bgColor} rounded-lg p-4 border-l-4 ${borderColor}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <span className="font-medium text-gray-900">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.email}</span>
              <span className="text-sm text-gray-500">
                Article: {comment.postSlug}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
              </span>
              {comment.parentId && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Réponse niveau {depth + 1}
                </span>
              )}
              {comment.approved && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Approuvé
                </span>
              )}
            </div>
            <p className="text-gray-700 mb-4">{comment.content}</p>
          </div>
          
<div className="flex flex-col gap-2 ml-4">
  {commentFilter === 'pending' && (
    <div className="flex gap-2">
      <button
        onClick={() => onApprove(comment.id)}
        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
      >
        Approuver
      </button>
      <button
        onClick={() => onReject(comment.id)}
        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
      >
        Rejeter
      </button>
    </div>
  )}
  
  {comment.approved && !comment.isDeleted && (
    <div className="flex gap-2">
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
      >
        {showReplyForm ? 'Annuler' : 'Répondre'}
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
      >
        Supprimer
      </button>
    </div>
  )}
  
  {comment.isDeleted && (
    <span className="text-sm text-red-600 italic">
      Commentaire supprimé
    </span>
  )}
</div>
        </div>

        {/* Formulaire de réponse rapide */}
        {showReplyForm && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Réponse admin à {comment.author}
            </h4>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Votre réponse en tant qu'administrateur..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleQuickReply}
                disabled={isSubmittingReply || !replyContent.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmittingReply ? 'Envoi...' : 'Envoyer la réponse'}
              </button>
              <button
                onClick={cancelReply}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Les réponses admin sont automatiquement approuvées et affichées immédiatement.
            </p>
          </div>
        )}
      </div>

      {/* Réponses récursives */}
      {comment.replies && comment.replies.map((reply) => (
        <AdminCommentThread
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          onApprove={onApprove}
          onReject={onReject}
          onQuickReply={onQuickReply}
          onDataReload={onDataReload}
          commentFilter={commentFilter}
        />
      ))}
    </div>
  )
}