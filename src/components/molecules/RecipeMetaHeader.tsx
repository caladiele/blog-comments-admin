// src/components/molecules/RecipeMetaHeader.tsx
'use client';

import { useState } from 'react';
import RecipeTimeInfo from '@/components/atoms/RecipeTimeInfo';
import PortionCounter from '@/components/atoms/PortionCounter';
import RecipeActionButton from '@/components/atoms/RecipeActionButton';
import '@/app/styles/recipe-meta-header.css';

interface RecipeMetaHeaderProps {
  titre: string;
  slug: string;
  tempsTotal: string;
  tempsPreparation: string;
  tempsCuisson: string;
  portionsInitiales: number;
  onPortionChange?: (newPortions: number, ratio: number) => void;
}

export default function RecipeMetaHeader({
  titre,
  slug,
  tempsTotal,
  tempsPreparation,
  tempsCuisson,
  portionsInitiales,
  onPortionChange
}: RecipeMetaHeaderProps) {
  const [currentPortions, setCurrentPortions] = useState(portionsInitiales);

  const handlePortionChange = (newPortions: number) => {
    setCurrentPortions(newPortions);
    
    // Calculer le ratio et notifier le parent
    const ratio = newPortions / portionsInitiales;
    onPortionChange?.(newPortions, ratio);
  };

  return (
    <div className="recipe-meta-header">
      {/* Titre de la section */}
      <div className="recipe-section-title">
        <h2>la recette</h2>
      </div>

      {/* Nom de la recette */}
      <div className="recipe-name">
        <h3 itemProp="name">{titre}</h3>
      </div>

      {/* Ligne 1 : Temps + Portions */}
      <div className="recipe-meta-main">
        <RecipeTimeInfo
          total={tempsTotal}
          preparation={tempsPreparation}
          cuisson={tempsCuisson}
        />
        
        <PortionCounter
          initialValue={portionsInitiales}
          min={1}
          max={12}
          onChange={handlePortionChange}
        />
      </div>

      {/* Ligne 2 : Actions */}
      <div className="recipe-meta-actions">
        <RecipeActionButton type="print" />
        <RecipeActionButton 
          type="share"
          recipeTitle={titre}
          recipeUrl={`https://amandebasilic.com/recettes/${slug}`}
        />
      </div>
    </div>
  );
}