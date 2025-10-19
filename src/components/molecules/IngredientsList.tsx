// src/components/molecules/IngredientsList.tsx
'use client';

import '@/app/styles/ingredients-list.css';

export interface IngredientSection {
  section: string;
  items: string[];
}

interface IngredientsListProps {
  ingredients: IngredientSection[];
  isAdjusted?: boolean; // Pour indiquer si les quantités ont été modifiées
}

export default function IngredientsList({ 
  ingredients,
  isAdjusted = false 
}: IngredientsListProps) {

    // Vérifie sur la liste des ingrédients est organisée en section
    const hasSections = ingredients.some(section => section.section !== "");

  return (
    <div className="ingredients-list-wrapper">
      <ul className="ingredients-list" role="list">
        {ingredients.map((ingredientSection, sectionIndex) => (
            <div 
                key={sectionIndex}
                className={`ingredient-section ${hasSections ? 'has-section-title' : ''}`}
            >
                {/* Sous-titre de section (si non vide) */}
                {ingredientSection.section && (
                    <h4 className="ingredient-section-title">
                    Ingrédients {ingredientSection.section.toLowerCase()}
                    </h4>
                )}
                {/* Liste des ingrédients */}
                <ul className="ingredients-list" role="list">
                    {ingredientSection.items.map((ingredient, itemIndex) => (
                    <li 
                        key={itemIndex} 
                        className={`ingredient-item ${isAdjusted ? 'adjusted' : ''}`}
                        itemProp="recipeIngredient"
                        style={{
                        animationDelay: `${(sectionIndex * ingredientSection.items.length + itemIndex) * 0.05}s`
                        }}
                    >
                        {/* Puce personnalisée */}
                        <span className="ingredient-bullet" aria-hidden="true"></span>
                        
                        {/* Texte de l'ingrédient */}
                        <span className="ingredient-text">{ingredient}</span>
                    </li>
                    ))}
                </ul>
            </div>
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