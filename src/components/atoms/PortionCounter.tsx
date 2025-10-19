// src/components/atoms/PortionCounter.tsx
'use client';

import { useState } from 'react';
import { formatRecipeYield } from '@/lib/recipeHelpers';
import '@/app/styles/portion-counter.css';

interface PortionCounterProps {
  initialValue: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function PortionCounter({ 
  initialValue, 
  min = 1, 
  max = 12,
  onChange 
}: PortionCounterProps) {
  const [portions, setPortions] = useState(initialValue);

  const handleDecrement = () => {
    if (portions > min) {
      const newValue = portions - 1;
      setPortions(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrement = () => {
    if (portions < max) {
      const newValue = portions + 1;
      setPortions(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="portion-counter">
      <span className="portion-label">Pour:</span>
      
      <div className="portion-controls" role="group" aria-label="Ajuster le nombre de portions">
        {/* Bouton Décrementer */}
        <button
          type="button"
          className="portion-button portion-button-minus"
          onClick={handleDecrement}
          disabled={portions <= min}
          aria-label="Diminuer le nombre de portions"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            aria-hidden="true"
          >
            <path 
              d="M3 8h10" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Valeur avec Schema.org */}
        <span 
          className="portion-value"
          itemProp="recipeYield"
          aria-live="polite"
          aria-atomic="true"
        >
          {portions}
        </span>

        {/* Meta cachée pour Schema.org (format texte) */}
        <meta itemProp="recipeYield" content={formatRecipeYield(portions)} />

        <span className="portion-unit">personnes</span>

        {/* Bouton Incrémenter */}
        <button
          type="button"
          className="portion-button portion-button-plus"
          onClick={handleIncrement}
          disabled={portions >= max}
          aria-label="Augmenter le nombre de portions"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
            aria-hidden="true"
          >
            <path 
              d="M8 3v10M3 8h10" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}