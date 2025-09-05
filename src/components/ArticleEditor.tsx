'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Article {
  slug: string
  title: string
  author: string
  date: string
  category: string
  imageUrl: string
  content: string
  relatedPosts?: string[]
  isNew?: boolean
}

interface ArticleEditorProps {
  initialSlug?: string
  onSaved?: () => void
  onCancel?: () => void
}

export default function ArticleEditor({ initialSlug = 'new', onSaved, onCancel }: ArticleEditorProps) {
  const [article, setArticle] = useState<Article>({
    slug: '',
    title: '',
    author: '',
    date: '',
    category: '',
    imageUrl: '',
    content: '',
    relatedPosts: [],
    isNew: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [message, setMessage] = useState('')
  const [availableArticles, setAvailableArticles] = useState<Article[]>([])
  const [newRelatedSlug, setNewRelatedSlug] = useState('')

  useEffect(() => {
    loadArticle()
    loadAvailableArticles()
  }, [initialSlug])

  const loadArticle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/articles/${initialSlug}`)
      if (response.ok) {
        const data = await response.json()
        setArticle({
          ...data,
          relatedPosts: data.relatedPosts || []
        })
      }
    } catch (error) {
      console.error('Erreur de chargement:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles')
      if (response.ok) {
        const data = await response.json()
        setAvailableArticles(data.articles)
      }
    } catch (error) {
      console.error('Erreur de chargement des articles:', error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch(`/api/admin/articles/${initialSlug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('✅ Article sauvegardé avec succès!')
        if (onSaved) onSaved()
      } else {
        const error = await response.json()
        setMessage(`❌ Erreur: ${error.error}`)
      }
    } catch (error) {
      setMessage('❌ Erreur de sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const response = await fetch(`/api/admin/articles/${initialSlug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMessage('✅ Article supprimé avec succès!')
        if (onSaved) onSaved()
      } else {
        setMessage('❌ Erreur lors de la suppression')
      }
    } catch (error) {
      setMessage('❌ Erreur de suppression')
    }
  }

  const handleAddRelatedPost = () => {
    if (newRelatedSlug && !article.relatedPosts?.includes(newRelatedSlug) && newRelatedSlug !== article.slug) {
      setArticle(prev => ({
        ...prev,
        relatedPosts: [...(prev.relatedPosts || []), newRelatedSlug]
      }))
      setNewRelatedSlug('')
    }
  }

  const handleRemoveRelatedPost = (slugToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      relatedPosts: prev.relatedPosts?.filter(slug => slug !== slugToRemove) || []
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const availableForRelated = availableArticles.filter(a => 
    a.slug !== article.slug && !(article.relatedPosts || []).includes(a.slug)
  )

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {article.isNew ? 'Nouvel Article' : `Éditer: ${article.title}`}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            {previewMode ? 'Éditeur' : 'Préview'}
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
          )}
        </div>
      </div>

      {/* Métadonnées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL) *
          </label>
          <input
            type="text"
            value={article.slug}
            onChange={(e) => setArticle(prev => ({ ...prev, slug: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="mon-article-slug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            value={article.title}
            onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Titre de l'article"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Auteur
          </label>
          <input
            type="text"
            value={article.author}
            onChange={(e) => setArticle(prev => ({ ...prev, author: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nom de l'auteur"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={article.date}
            onChange={(e) => setArticle(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <input
            type="text"
            value={article.category}
            onChange={(e) => setArticle(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Développement, Design, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Image
          </label>
          <input
            type="url"
            value={article.imageUrl}
            onChange={(e) => setArticle(prev => ({ ...prev, imageUrl: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>

      {/* Articles liés */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          📚 Articles liés (section "Vous pourriez aussi aimer")
        </h3>
        
        {/* Articles actuellement liés */}
        {article.relatedPosts && article.relatedPosts.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Articles sélectionnés:</h4>
            <div className="space-y-2">
              {article.relatedPosts.map((relatedSlug) => {
                const relatedArticle = availableArticles.find(a => a.slug === relatedSlug)
                return (
                  <div key={relatedSlug} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div>
                      <span className="font-medium text-gray-900">
                        {relatedArticle?.title || `Article: ${relatedSlug}`}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({relatedSlug})
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveRelatedPost(relatedSlug)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded"
                      title="Supprimer"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Ajouter un article lié */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Ajouter un article lié:</h4>
          <div className="flex gap-2">
            <select
              value={newRelatedSlug}
              onChange={(e) => setNewRelatedSlug(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Sélectionner un article --</option>
              {availableForRelated.map((availableArticle) => (
                <option key={availableArticle.slug} value={availableArticle.slug}>
                  {availableArticle.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddRelatedPost}
              disabled={!newRelatedSlug}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Ajouter
            </button>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600">
          💡 Les articles liés apparaîtront dans la section "Vous pourriez aussi aimer" en bas de l'article. 
          Maximum recommandé: 4 articles.
        </div>
      </div>

      {/* Éditeur/Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contenu Markdown *
        </label>
        
        {previewMode ? (
          <div className="border border-gray-300 rounded p-4 min-h-96 bg-white">
            <article className="prose prose-lg prose-slate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </article>
          </div>
        ) : (
          <textarea
            value={article.content}
            onChange={(e) => setArticle(prev => ({ ...prev, content: e.target.value }))}
            className="w-full h-96 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="# Titre de votre article

Contenu en markdown..."
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          
          {!article.isNew && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Supprimer
            </button>
          )}
        </div>

        {message && (
          <div className={`px-4 py-2 rounded text-sm ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}