// src/components/atoms/CollapseChevron.tsx
import '@/app/styles/collapse-chevron.css';

interface CollapseChevronProps {
  isOpen: boolean;
  onClick: () => void;
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