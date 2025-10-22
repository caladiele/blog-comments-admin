// src/components/atoms/CloseButton.tsx

/**
 * @component CloseButton
 * @description
 * Bouton de fermeture avec icône SVG en forme de croix (X).
 * Utilisé principalement pour fermer des overlays, menus ou modales.
 *
 * @example
 * ```tsx
 * <CloseButton 
 *   onClick={() => setIsOpen(false)} 
 *   ariaLabel="Fermer la navigation"
 * />
 * ```
 *
 * @param {CloseButtonProps} props - Component props
 * @param {() => void} props.onClick - Callback déclenché au clic
 * @param {string} [props.className] - Classes CSS additionnelles
 * @param {string} [props.ariaLabel] - Label accessible (défaut: "Fermer")
 *
 * @returns {JSX.Element} Bouton de fermeture accessible
 */

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function CloseButton({ onClick, className = '', ariaLabel = 'Fermer' }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`close-button ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        aria-hidden="true"
      >
        <path 
          d="M18 6L6 18M6 6l12 12" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </svg>
      <span className="close-button-text">fermer</span>
    </button>
  );
}