// src/components/atoms/RecipeTimeInfo.tsx

/**
 * @component RecipeTimeInfo
 * @description
 * Affiche les informations de temps pour une recette avec Schema.org structuré.
 * Utilise l'élément HTML5 <time> avec conversion automatique en ISO 8601.
 *
 * @example
 * ```tsx
 * <RecipeTimeInfo 
 *   total="1h30"
 *   preparation="30m"
 *   cuisson="1h"
 * />
 * ```
 *
 * @param {RecipeTimeInfoProps} props - Component props
 * @param {string} props.total - Temps total (format: "45m", "1h30", "2h15")
 * @param {string} props.preparation - Temps de préparation (même format)
 * @param {string} [props.cuisson] - Temps de cuisson optionnel (même format)
 *
 * @returns {JSX.Element} Information de temps avec Schema.org
 *
 * @see {@link https://schema.org/Recipe}
 * @see {@link https://schema.org/duration}
 */

import { convertTimeToISO8601 } from '@/lib/recipeHelpers';
import '@/app/styles/recipe-time-info.css';

/**
 * Props pour le composant RecipeTimeInfo
 * @interface RecipeTimeInfoProps
 */
interface RecipeTimeInfoProps {
  /** Temps total au format humain (ex: "1h30", "45m") */
  total: string;
  /** Temps de préparation au format humain */  
  preparation: string; 
  /** Temps de cuisson optionnel au format humain */
  cuisson?: string;     
}

export default function RecipeTimeInfo({ 
  total, 
  preparation, 
  cuisson 
}: RecipeTimeInfoProps) {
  return (
    <div className="recipe-time-info">
      <div className="time-item recipe-time-total">
        <span className="time-label">Total:</span>
        <time 
          className="time-value"
          itemProp="totalTime" 
          dateTime={convertTimeToISO8601(total)}
        >
          {total}
        </time>
      </div>
      
      {/* <span className="time-separator" aria-hidden="true">|</span> */}
      
      <div className="time-item">
        <span className="time-label">Préparation:</span>
        <time 
          className="time-value"
          itemProp="prepTime" 
          dateTime={convertTimeToISO8601(preparation)}
        >
          {preparation}
        </time>
      </div>
        {cuisson && (
        <>
            {/* <span className="time-separator" aria-hidden="true">|</span> */}
            <div className="time-item">
              <span className="time-label">Cuisson:</span>
              <time 
                className="time-value"
                itemProp="cookTime" 
                dateTime={convertTimeToISO8601(cuisson)}
              >
                {cuisson}
              </time>
            </div>
        </>
        )}
    </div>
  );
}