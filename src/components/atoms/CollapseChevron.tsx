// src/components/atoms/CollapseChevron.tsx
import { MouseEvent } from 'react';
import '@/app/styles/collapse-chevron.css';
/**
 * @component CollapseChevron
 * @description
 * Bouton chevron animé pour sections collapsibles (accordéons, dropdowns).
 * Le chevron effectue une rotation de 180° selon l'état ouvert/fermé.
 * Conforme WCAG AA avec support aria-expanded.
 *
 * @example
 * ```tsx
 * <CollapseChevron 
 *   isOpen={isExpanded} 
 *   onClick={(e) => setIsExpanded(!isExpanded)}
 *   ariaLabel="Ouvrir/Fermer les ingrédients"
 * />
 * ```
 *
 * @param {CollapseChevronProps} props - Component props
 * @param {boolean} props.isOpen - État de la section (ouvert/fermé)
 * @param {(e: MouseEvent<HTMLButtonElement>) => void} props.onClick - Callback au clic
 * @param {string} [props.ariaLabel] - Label accessible (défaut: "Ouvrir/Fermer la section")
 *
 * @returns {JSX.Element} Bouton chevron accessible et animé
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/accordion/}
 */

/**
 * Props pour le composant CollapseChevron
 * @interface CollapseChevronProps
 */
interface CollapseChevronProps {
  /** État ouvert (true) ou fermé (false) de la section */
  isOpen: boolean;
  /** Gestionnaire d'événement de clic */
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Label accessible pour lecteurs d'écran */
  ariaLabel?: string;
}

export default function CollapseChevron({ 
  isOpen, 
  onClick,
  ariaLabel = "Ouvrir/Fermer la section"
}: CollapseChevronProps) {
  return (
    <button
      type="button"
      className={`collapse-chevron ${isOpen ? 'chevron-open' : 'chevron-closed'}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <svg 
        className="chevron-icon"
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none"
        aria-hidden="true"
      >
        <path 
          d="M5 7.5L10 12.5L15 7.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}