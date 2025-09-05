'use client'

import { useState, useEffect } from 'react'
import ArticleEditor from '@/components/ArticleEditor'
import AdminCommentThread from '@/components/AdminCommentThread'

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
  isDeleted?: boolean      // Ajouter cette ligne
  deletedAt?: string       // Ajouter cette ligne
  deletedBy?: string 
}

interface Article {
  slug: string
  title: string
  author: string
  date: string
  category: string
}

export default function AdminPage() {
  const [comments, setComments] = useState<AdminComment[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [activeTab, setActiveTab] = useState<'comments' | 'articles' | 'editor'>('comments')
  const [commentFilter, setCommentFilter] = useState<'pending' | 'approved'>('pending')
  const [loading, setLoading] = useState(true)
  const [showDeleted, setShowDeleted] = useState(false)
    // États pour les réponses rapides
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)
  // États pour l'éditeur
  const [editorMode, setEditorMode] = useState<'list' | 'edit'>('list')
  const [editingSlug, setEditingSlug] = useState<string>('new')

  useEffect(() => {
    loadData()
  }, [activeTab, commentFilter])

const loadData = async () => {
  setLoading(true)
  try {
    if (activeTab === 'comments') {
      const params = new URLSearchParams({
        status: commentFilter,
        includeDeleted: showDeleted.toString()
      })
      const response = await fetch(`/api/admin/comments?${params}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      }
    } else if (activeTab === 'articles' || activeTab === 'editor') {
      const response = await fetch('/api/admin/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles)
      }
    }
  } catch (error) {
    console.error('Erreur de chargement:', error)
  } finally {
    setLoading(false)
  }
}

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/comments/${id}/approve`, {
        method: 'POST'
      })
      if (response.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error)
    }
  }

  const handleReject = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir rejeter ce commentaire ?')) {
      try {
        const response = await fetch(`/api/admin/comments/${id}/reject`, {
          method: 'POST'
        })
        if (response.ok) {
          loadData()
        }
      } catch (error) {
        console.error('Erreur lors du rejet:', error)
      }
    }
  }

  const handleEditArticle = (slug: string) => {
    setEditingSlug(slug)
    setEditorMode('edit')
    setActiveTab('editor')
  }

  const handleNewArticle = () => {
    setEditingSlug('new')
    setEditorMode('edit')
    setActiveTab('editor')
  }

  const handleEditorSaved = () => {
    setEditorMode('list')
    loadData() // Recharger la liste des articles
  }

  const handleEditorCancel = () => {
    setEditorMode('list')
  }

const handleQuickReply = async (commentId: string, content: string) => {
  try {
    const response = await fetch(`/api/admin/comments/${commentId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content
      }),
    })

    if (response.ok) {
      loadData() // Recharger pour voir la nouvelle réponse
    } else {
      console.error('Erreur lors de l\'envoi de la réponse')
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la réponse:', error)
    throw error
  }
}

const cancelReply = () => {
  setReplyingTo(null)
  setReplyContent('')
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">Gestion des articles et commentaires</p>
            </div>
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour au site
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab('comments')
                  setEditorMode('list')
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Commentaires
              </button>
              <button
                onClick={() => {
                  setActiveTab('articles')
                  setEditorMode('list')
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'articles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => {
                  setActiveTab('editor')
                  if (editorMode === 'edit') {
                    // Garder le mode edit si on était en train d'éditer
                  } else {
                    setEditorMode('list')
                  }
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'editor'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ✍️ Éditeur
              </button>
            </nav>
          </div>
        </div>

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div>
            {/* Filter */}
{activeTab === 'comments' && (
  <div className="mb-6">
    <div className="flex gap-4 items-center flex-wrap">
      <div className="flex gap-4">
        <button
          onClick={() => setCommentFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            commentFilter === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          En attente
        </button>
        <button
          onClick={() => setCommentFilter('approved')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            commentFilter === 'approved'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Approuvés
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            className="mr-2 rounded"
          />
          <span className="text-sm text-gray-700">
            Afficher les commentaires supprimés
          </span>
        </label>
      </div>
    </div>
  </div>
)}

            {/* Comments List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {comments.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    Aucun commentaire {commentFilter === 'pending' ? 'en attente' : 'approuvé'}.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {comments.map((comment) => (
                      <div key={comment.id} className="p-6">
                        <AdminCommentThread
                          comment={comment}
                          depth={0}
                          onApprove={handleApprove}
                          onReject={handleReject}
                          onQuickReply={handleQuickReply}
                          onDataReload={loadData}
                          commentFilter={commentFilter}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Articles publiés</h2>
              <button
                onClick={handleNewArticle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouvel Article
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {articles.map((article) => (
                    <div key={article.slug} className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Par {article.author}</span>
                            <span>{article.date}</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditArticle(article.slug)}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                          >
                            ✏️ Éditer
                          </button>
                          <a
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-800 text-sm px-4 py-2 border border-blue-600 rounded hover:bg-blue-50"
                          >
                            👁️ Voir
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Editor Tab */}
        {activeTab === 'editor' && (
          <div>
            {editorMode === 'list' ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Éditeur d'articles</h2>
                  <button
                    onClick={handleNewArticle}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    ✍️ Nouvel Article
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <p className="text-gray-600">
                      Sélectionnez un article existant à modifier ou créez un nouveau.
                    </p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {articles.map((article) => (
                      <div key={article.slug} className="p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Slug: {article.slug}</span>
                              <span>Par {article.author}</span>
                              <span>{article.date}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleEditArticle(article.slug)}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                          >
                            ✏️ Éditer cet article
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ArticleEditor
                initialSlug={editingSlug}
                onSaved={handleEditorSaved}
                onCancel={handleEditorCancel}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}