// src/components/atoms/RecipeActionButton.tsx

/**
 * @component RecipeActionButton
 * @description
 * Bouton d'action multifonction pour recettes (Imprimer / Partager).
 * 
 * **Fonctionnalités Partage** :
 * - Mobile : Web Share API native (partage apps)
 * - Desktop : Copie du lien dans le presse-papier
 * - Fallback : execCommand pour navigateurs anciens
 * 
 * **Fonctionnalité Impression** :
 * - Déclenche window.print() pour impression navigateur
 *
 * @example
 * ```tsx
 * // Bouton Imprimer
 * <RecipeActionButton type="print" />
 * 
 * // Bouton Partager avec URL custom
 * <RecipeActionButton 
 *   type="share"
 *   recipeTitle="Tarte aux fraises"
 *   recipeUrl="https://amandebasilic.com/recettes/tarte-aux-fraises"
 * />
 * ```
 *
 * @param {RecipeActionButtonProps} props - Component props
 * @param {'print' | 'share'} props.type - Type d'action (impression ou partage)
 * @param {string} [props.recipeTitle] - Titre de la recette (pour partage)
 * @param {string} [props.recipeUrl] - URL à partager (défaut: URL actuelle)
 *
 * @returns {JSX.Element} Bouton d'action accessible avec fallbacks multiples
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard}
 */

'use client';

import { useState } from 'react';
import '@/app/styles/recipe-action-button.css';

/**
 * Props pour le composant RecipeActionButton
 * @interface RecipeActionButtonProps
 */
interface RecipeActionButtonProps {
  /** Type d'action : 'print' pour impression, 'share' pour partage */
  type: 'print' | 'share';
  /** Titre de la recette pour le partage (optionnel) */
  recipeTitle?: string; 
  /** URL à partager (défaut: window.location.href) */
  recipeUrl?: string;
}

export default function RecipeActionButton({ 
  type, 
  recipeTitle = '',
  recipeUrl = ''
}: RecipeActionButtonProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: recipeTitle,
      text: `Découvrez cette recette : ${recipeTitle}`,
      url: recipeUrl || window.location.href
    };

    // Vérifier si Web Share API est disponible (mobile)
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Utilisateur a annulé ou erreur
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Erreur de partage:', error);
          fallbackCopyLink();
        }
      }
    } else {
      // Fallback : copier le lien (desktop)
      fallbackCopyLink();
    }
  };

  const fallbackCopyLink = async () => {
    const url = recipeUrl || window.location.href;

    // Vérification HTTPS pour l'utilisation de l'API clipboard
    if (!navigator.clipboard && location.protocol !== 'https:') {
      console.warn('Clipboard API requiert HTTPS');
    }
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Erreur de copie:', error);
      // Fallback ultime : select + copy
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClick = () => {
    if (type === 'print') {
      handlePrint();
    } else {
      handleShare();
    }
  };

  const getLabel = () => {
    if (type === 'print') return 'Imprimer';
    if (copied) return 'Copié !';
    return 'Partager';
  };

  const getAriaLabel = () => {
    if (type === 'print') return 'Imprimer la recette';
    if (copied) return 'Lien copié dans le presse-papier';
    return 'Partager la recette';
  };

  return (
    <button
      type="button"
      className={`recipe-action-button recipe-action-${type} ${copied ? 'copied' : ''}`}
      onClick={handleClick}
      aria-label={getAriaLabel()}
      disabled={type === 'share' && copied}
    >
      {/* Icône Imprimer */}
      {type === 'print' && (
        <svg 
          className="action-icon" 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M4.5 6V2.25C4.5 1.836 4.836 1.5 5.25 1.5h7.5c.414 0 .75.336.75.75V6M4.5 13.5H3c-.828 0-1.5-.672-1.5-1.5V8.25c0-.828.672-1.5 1.5-1.5h12c.828 0 1.5.672 1.5 1.5V12c0 .828-.672 1.5-1.5 1.5h-1.5M5.25 10.5h7.5c.414 0 .75.336.75.75v4.5c0 .414-.336.75-.75.75h-7.5a.75.75 0 0 1-.75-.75v-4.5c0-.414.336-.75.75-.75Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <circle cx="13.5" cy="9.75" r="0.75" fill="currentColor"/>
        </svg>
      )}

      {/* Icône Partager */}
      {type === 'share' && !copied && (
        <svg 
          className="action-icon" 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M6.75 9.75 3 13.5m0 0 3.75 3.75M3 13.5h10.5a3 3 0 0 0 3-3V9m-6-7.5L15 1.5m0 0-4.5 3.75M15 1.5v7.5" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Icône Check (copié) */}
      {type === 'share' && copied && (
        <svg 
          className="action-icon action-icon-check" 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M3.75 9.75 7.5 13.5l7.5-12" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}

    </button>
  );
}