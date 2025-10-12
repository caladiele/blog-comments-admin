// src/components/molecules/HeroBackground.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

import '@/app/styles/hero-background.css'


interface HeroBackgroundProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export default function HeroBackground({ 
  imageSrc, 
  imageAlt,
  className = '' 
}: HeroBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`hero-background ${className}`}>
      {/* Image */}
      <div className={`hero-background-image ${isLoaded ? 'loaded' : ''}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 960px) 100vw"
          objectFit={"cover"}
          priority
          quality={90}
          className="hero-image"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}