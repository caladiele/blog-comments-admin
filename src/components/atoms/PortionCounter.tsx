// src/components/atoms/PortionCounter.tsx

/**
 * @component PortionCounter
 * @description
 * Compteur interactif pour ajuster le nombre de portions d'une recette.
 * Inclut Schema.org itemProp="recipeYield" pour optimisation SEO.
 * Permet aux utilisateurs d'incrémenter/décrémenter avec validation min/max.
 *
 * @example
 * ```tsx
 * // Basique (état interne)
 * <PortionCounter initialValue={4} />
 * 
 * // Avec callback pour ajuster ingrédients
 * <PortionCounter 
 *   initialValue={4}
 *   min={2}
 *   max={16}
 *   onChange={(newValue) => {
 *     const ratio = newValue / originalPortions;
 *     setAdjustedIngredients(adjustAllIngredients(ingredients, ratio));
 *   }}
 * />
 * ```
 *
 * @param {PortionCounterProps} props - Component props
 * @param {number} props.initialValue - Nombre initial de portions
 * @param {number} [props.min=1] - Nombre minimum de portions
 * @param {number} [props.max=12] - Nombre maximum de portions
 * @param {(value: number) => void} [props.onChange] - Callback appelé lors du changement
 *
 * @returns {JSX.Element} Compteur de portions accessible avec Schema.org
 *
 * @see {@link https://schema.org/recipeYield}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/}
 */

'use client';

import { useState } from 'react';
import { formatRecipeYield } from '@/lib/recipeHelpers';
import '@/app/styles/portion-counter.css';

/**
 * Props pour le composant PortionCounter
 * @interface PortionCounterProps
 */
interface PortionCounterProps {
  /** Nombre initial de portions à afficher */
  initialValue: number;
  /** Nombre minimum de portions autorisé (défaut: 1) */
  min?: number;
  /** Nombre maximum de portions autorisé (défaut: 12) */
  max?: number;
  /** Callback optionnel appelé avec la nouvelle valeur lors des changements */
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