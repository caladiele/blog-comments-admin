'use client'

import { ReactNode } from 'react'
import '@/app/styles/sources.css'

interface SourcesProps {
  /**
   * Le titre de la section des sources
   * @default "Pour aller plus loin"
   */
  title?: string
  /**
   * Le contenu markdown (listes, liens) qui sera affiche dans la section
   */
  children: ReactNode
  /**
   * Classes CSS supplementaires pour personnaliser le style
   */
  className?: string
}

/**
 * Composant Sources pour afficher une section de references et liens complementaires
 *
 * Ce composant permet d'integrer des sources et references a la fin d'un article
 * en conservant la fonctionnalite des liens markdown.
 *
 * @example
 * <Sources title="Pour aller plus loin">
 *   - Article sur [les plantes sauvages](https://example.com/plantes)
 *   - Guide de [reconnaissance](https://example.com/guide)
 * </Sources>
 *
 * @example
 * <Sources>
 *   - Reference 1
 *   - Reference 2
 * </Sources>
 */
export default function Sources({
  title = "Pour aller plus loin",
  children,
  className = ""
}: SourcesProps) {
  return (
    <aside
      className={`sources-container ${className}`}
      role="complementary"
      aria-label="References et sources complementaires"
    >
      {/* En-tete de la section avec icone */}
      <header className="sources-header">
        <span className="sources-icon" aria-hidden="true">📚</span>
        <h2 className="sources-title">{title}</h2>
      </header>

      {/* Contenu markdown avec les liens fonctionnels */}
      <div className="sources-content">
        {children}
      </div>
    </aside>
  )
}
