// src/components/atoms/CloseButton.tsx
interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export default function CloseButton({ onClick, className = '' }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`close-button ${className}`}
      aria-label="Fermer le menu"
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