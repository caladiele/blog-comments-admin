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
        <svg
          className="wabisabi-fill"
          width="128"
          height="104"
          aria-hidden="true"
        >
          <use href="#wabisabi-shape" />
        </svg>
        <p className='recipe-section-title--p'>la recette</p>
      </div>

      {/* Nom de la recette */}


      {/* Ligne 1 : Temps + Portions */}
      {/* <h2 className="recipe-name" itemProp="name">{titre}</h2>  */}
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

      {/**
       * Ligne 2 : Actions 
       <div className="recipe-meta-actions">
          <RecipeActionButton type="print" />
          <RecipeActionButton 
            type="share"
            recipeTitle={titre}
            recipeUrl={`https://amandebasilic.com/recettes/${slug}`}
          />
        </div>
       * */}
      
    </div>
  );
}