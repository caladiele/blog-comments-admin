// src/components/atoms/ReadButton.tsx
'use client';

import Link from 'next/link';

import '@/app/styles/wabisabi-button.css'

interface ReadButtonProps {
  href: string;
  label?: string;
  className?: string;
  fillColor?: string;
}

export default function ReadButton({ 
  href, 
  label = 'lire',
  className = '',
  fillColor = '' 
}: ReadButtonProps) {
  return (
    <Link 
      href={href}
      className={`bouton-section ${className}`}
      aria-label={`Lire l'article`}
    >
      <svg 
        className="bouton-wabisabi-path" 
        xmlns="http://www.w3.org/2000/svg" 
        width="128" 
        height="104" 
        fill="none"
      > 
        <path 
          stroke="#4F4F4F" 
          strokeOpacity=".9" 
          strokeWidth=".61"
          d="M75.966.581c18.57 0 31.459 3.167 39.719 11.464 8.26 8.298 11.961 21.798 11.961 42.656 0 18.156-8.19 30.375-21 38.071-12.832 7.709-30.314 10.887-48.877 10.887-18.521 0-32.757-5.973-42.364-16.462C5.795 76.704.781 61.654.781 43.44c0-10.021 3.974-17.136 9.986-22.609 6.024-5.484 14.096-9.32 22.293-12.755C46.219 2.563 59.405.581 75.966.581Z" 
          />
      </svg>
      <svg 
        className="bouton-wabisabi-fill"  
        xmlns="http://www.w3.org/2000/svg" 
        width="128" 
        height="104" 
        fill={fillColor}
      >
        <path 
          stroke="none"
          d="M75.966.581c18.57 0 31.459 3.167 39.719 11.464 8.26 8.298 11.961 21.798 11.961 42.656 0 18.156-8.19 30.375-21 38.071-12.832 7.709-30.314 10.887-48.877 10.887-18.521 0-32.757-5.973-42.364-16.462C5.795 76.704.781 61.654.781 43.44c0-10.021 3.974-17.136 9.986-22.609 6.024-5.484 14.096-9.32 22.293-12.755C46.219 2.563 59.405.581 75.966.581Z" 
        />
      </svg>
      <span className="bouton-texte">{label}</span>
    </Link>
  );
}