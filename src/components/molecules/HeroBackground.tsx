// src/components/molecules/HeroBackground.tsx

/**
 * @component HeroBackground
 * @description
 * Composant hero/bannière avec image de fond optimisée via next/image.
 * Gère le chargement progressif avec animation fade-in et optimisations LCP.
 * Support du dark mode avec filtre artistique automatique.
 *
 * @example
 * ```tsx
 * <HeroBackground 
 *   imageSrc="/images/hero-recette.jpg"
 *   imageAlt="Tarte aux fraises fraîchement sortie du four"
 * />
 * 
 * // Avec classe custom
 * <HeroBackground 
 *   imageSrc="/hero.jpg"
 *   imageAlt="Vue d'ensemble de la cuisine"
 *   className="hero-recette"
 * />
 * ```
 *
 * @param {HeroBackgroundProps} props - Component props
 * @param {string} props.imageSrc - URL de l'image (locale ou CDN)
 * @param {string} props.imageAlt - Description alternative de l'image (required pour a11y)
 * @param {string} [props.className] - Classes CSS additionnelles
 *
 * @returns {JSX.Element} Hero background avec image optimisée
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/image}
 */
'use client';

import Image from 'next/image';
import { useState } from 'react';
import '@/app/styles/hero-background.css'


interface HeroBackgroundProps {
  /** URL de l'image source (relative ou absolue) */
  imageSrc: string;
  /** Texte alternatif pour accessibilité (ne doit pas être vide) */
  imageAlt: string;
  /** Classes CSS additionnelles pour personnalisation */
  className?: string;
}

/**
 * Props pour le composant HeroBackground
 * @interface HeroBackgroundProps
 */
export default function HeroBackground({ 
  imageSrc, 
  imageAlt,
  className = '' 
}: HeroBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!imageAlt || imageAlt.trim() === '') {
    console.warn('HeroBackground: imageAlt ne devrait pas être vide pour l\'accessibilité');
  }
  
  return (
    <div className={`hero-background ${className}`}>
      {/* Image */}
      <div className={`hero-background-image ${isLoaded ? 'loaded' : ''}`}>
        <Image
        /* TODO: Ajouter Placeholder Blur */
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 960px) 100vw"
          style={{ objectFit: 'cover' }}
          priority
          quality={90}
          className="hero-image"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}