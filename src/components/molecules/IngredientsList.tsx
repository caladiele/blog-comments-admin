// src/components/molecules/IngredientsList.tsx

/**
 * @component IngredientsList
 * @description
 * Liste d'ingrédients pour recettes avec support des sections, animations séquentielles,
 * et ajustement dynamique des quantités. Inclut Schema.org pour SEO optimisé.
 * 
 * Fonctionnalités :
 * - Sections multiples pour organisation (ex: "pour la pâte", "pour la garniture")
 * - Animations d'apparition décalées au premier rendu seulement
 * - Indicateur visuel quand quantités ajustées (PortionCounter)
 * - Support impression optimisé
 *
 * @example
 * ```tsx
 * const ingredients = [
 *   {
 *     section: "pour la pâte",
 *     items: ["250 g de farine", "1 œuf", "100 ml d'eau"]
 *   },
 *   {
 *     section: "pour la garniture",
 *     items: ["200 g de fraises", "100 g de sucre"]
 *   }
 * ];
 * 
 * <IngredientsList 
 *   ingredients={ingredients}
 *   isAdjusted={portionsChanged}
 * />
 * ```
 *
 * @param {IngredientsListProps} props - Component props
 * @param {IngredientSection[]} props.ingredients - Sections d'ingrédients organisées
 * @param {boolean} [props.isAdjusted=false] - Indique si les quantités ont été ajustées
 *
 * @returns {JSX.Element} Liste d'ingrédients accessible avec Schema.org
 *
 * @see {@link https://schema.org/recipeIngredient}
 */
'use client';

import { useEffect, useState } from 'react';

import '@/app/styles/ingredients-list.css';

/**
 * Représente une section d'ingrédients avec son titre et ses items
 * @interface IngredientSection
 */
export interface IngredientSection {
  /** Titre de la section (ex: "pour la pâte", vide si pas de section) */
  section: string;
  /** Liste des ingrédients de cette section */
  items: string[];
}

/**
 * Props pour le composant IngredientsList
 * @interface IngredientsListProps
 */
interface IngredientsListProps {
  /** Tableau de sections d'ingrédients */
  ingredients: IngredientSection[];
  /** Indique si les quantités ont été modifiées (via PortionCounter) */
  isAdjusted?: boolean; 
}

export default function IngredientsList({ 
  ingredients,
  isAdjusted = false 
}: IngredientsListProps) {
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Marquer le premier rendu comme terminé après le montage
  useEffect(() => {
    setIsInitialRender(false);
  }, []);
    // Vérifie si la liste des ingrédients est organisée en section
    const hasSections = ingredients.some(section => section.section !== "");

  return (
    <div className="ingredients-list-wrapper">
      <ul className="ingredients-list" role="list">
        {ingredients.map((ingredientSection, sectionIndex) => (
            <li key={sectionIndex}>
              <section className={`ingredient-section ${hasSections ? 'has-section-title' : ''} ${!isInitialRender ? 'no-initial-animation' : ''}`}>

                {/* Sous-titre de section (si non vide) */}
                {ingredientSection.section && (
                    <h4 className="ingredient-section-title">
                      {ingredientSection.section.toLowerCase()}
                    </h4>
                )}
                {/* Liste des ingrédients */}
                <ul className="ingredients-sublist" role="list">
                    {ingredientSection.items.map((ingredient, itemIndex) => (
                    <li 
                        key={`${sectionIndex}-${itemIndex}`} 
                        className={`ingredient-item ${isAdjusted ? 'adjusted' : ''}`}
                        itemProp="recipeIngredient"
                        style={{
                        // Animations uniquement au premier rendu
                        animationDelay: isInitialRender 
                          ? `${(sectionIndex * ingredientSection.items.length + itemIndex) * 0.05}s`
                          : '0s' 
                              }}
                    >
                        {/* Puce personnalisée */}
                        <span className="ingredient-bullet" aria-hidden="true"></span>
                        
                        {/* Texte de l'ingrédient */}
                        <span className="ingredient-text">{ingredient}</span>
                    </li>
                    ))}
                </ul>
                </section>
            </li>
        ))}
      </ul>
      
      {/* Message si quantités ajustées */}
      {isAdjusted && (
        <p className="ingredients-note" role="status" aria-live="polite">
          <svg 
            className="note-icon" 
            width="14" 
            height="14" 
            viewBox="0 0 14 14" 
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M7 4.5v3M7 10v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Les quantités ont été ajustées selon le nombre de portions
        </p>
      )}
    </div>
  );
}