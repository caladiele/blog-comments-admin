// src/components/atoms/ReadButton.tsx
'use client';

import Link from 'next/link';

interface ReadButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function ReadButton({ 
  href, 
  label = 'lire',
  className = '' 
}: ReadButtonProps) {
  return (
    <Link 
      href={href}
      className={`read-button ${className}`}
      aria-label={`Lire l'article`}
    >
      <span className="read-button-text">{label}</span>
      <svg 
        className="read-button-arrow" 
        width="32" 
        height="16" 
        viewBox="0 0 32 16" 
        fill="none"
        aria-hidden="true"
      >
        <path 
          d="M1 8h28m0 0l-7-7m7 7l-7 7" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}