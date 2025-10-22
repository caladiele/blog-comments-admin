// src/components/atoms/WabisabiButton.tsx

/**
 * @component WabisabiButton
 * @description
 * Bouton décoratif au style wabi-sabi avec forme organique en SVG.
 * Utilise des SVG superposés pour créer un effet de profondeur.
 * Conçu pour des call-to-action artistiques (lire un article, découvrir, etc.).
 *
 * @example
 * ```tsx
 * // Bouton "Lire" basique
 * <WabisabiButton href="/articles/mon-article" />
 * 
 * // Bouton personnalisé avec couleur
 * <WabisabiButton 
 *   href="/recettes/tarte"
 *   label="découvrir"
 *   className="wabisabi-color-oyster"
 * />
 * ```
 *
 * @param {WabisabiButtonProps} props - Component props
 * @param {string} props.href - URL de destination (Next.js Link)
 * @param {string} [props.label] - Texte du bouton (défaut: "lire")
 * @param {string} [props.className] - Classes CSS additionnelles (ex: wabisabi-color-oyster)
 *
 * @returns {JSX.Element} Lien stylisé avec forme organique
 */
'use client';

import Link from 'next/link';
import '@/app/styles/wabisabi-button.css'

/**
 * Props pour le composant WabisabiButton
 * @interface WabisabiButtonProps
 */
interface WabisabiButtonProps {
  /** URL de destination pour la navigation */
  href: string;
  /** Texte affiché sur le bouton (défaut: "lire") */
  label?: string;
  /** Classes CSS additionnelles (wabisabi-color-oyster, wabisabi-color-silentWhite...) */
  className?: string;
  /** Variantes de couleurs utilisables pour le bouton */
  variant?: 'oyster' | 'silentWhite' | 'default';
}

export default function WabisabiButton({ 
  href, 
  label = 'lire',
  variant,
  className = ''
}: WabisabiButtonProps) {
  const ariaLabel = label.charAt(0).toUpperCase() + label.slice(1);
  return (
  <Link
        href={href}
        className={`bouton-section wabisabi-color-${variant} ${className}`}
        aria-label={ariaLabel}
      >
        {/* SVG contour */}
        <svg
          className="bouton-wabisabi-path"
          width="128"
          height="104"
          aria-hidden="true"
        >
          <use href="#wabisabi-shape" />
        </svg>

        {/* SVG fond */}
        <svg
          className="bouton-wabisabi-fill"
          width="128"
          height="104"
          aria-hidden="true"
        >
          <use href="#wabisabi-shape" />
        </svg>

        {/* Texte du bouton */}
        <span className="bouton-texte">{label}</span>
    </Link>
  );
}