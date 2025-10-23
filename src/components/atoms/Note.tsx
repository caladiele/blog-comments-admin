'use client'

import { ReactNode, useState, useRef, useEffect } from 'react'
import '@/app/styles/note.css'

interface NoteProps {
  /**
   * Le mot ou texte cliquable qui déclenchera l'affichage de la note
   */
  children: ReactNode
  /**
   * Le contenu de la note explicative qui s'affichera dans la popup
   */
  content: ReactNode
  /**
   * Classes CSS supplémentaires pour personnaliser le style
   */
  className?: string
}

/**
 * Composant Note pour afficher des explications ou définitions dans une popup
 *
 * @example
 * <Note content="Le levain est une culture de bactéries et levures sauvages utilisée pour faire lever le pain.">
 *   levain
 * </Note>
 */
export default function Note({ children, content, className = "" }: NoteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)

  // Fermer la popup lors d'un clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        triggerRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Fermer la popup avec la touche Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Texte cliquable */}
      <span
        ref={triggerRef}
        onClick={handleClick}
        className={`note-trigger ${className}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {children}
      </span>

      {/* Popup en bas à droite */}
      {isOpen && (
        <div
          ref={popupRef}
          className="note-popup"
          role="dialog"
          aria-live="polite"
        >
          {/* Bouton de fermeture */}
          <button
            onClick={() => setIsOpen(false)}
            className="note-close-button"
            aria-label="Fermer la note"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="note-close-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Contenu de la note */}
          <div className="note-content-wrapper">
            <div className="note-header">
            </div>
            <div className="note-content">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
