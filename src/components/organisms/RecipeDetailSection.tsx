// src/components/organisms/RecipeDetailsSection.tsx (preview)
'use client';


import { useState } from 'react';
import { convertTimeToISO8601, formatRecipeYield } from '@/lib/recipeHelpers';
import RecipeMetaHeader from '@/components/molecules/RecipeMetaHeader';
import IngredientsList from '@/components/molecules/IngredientsList';
import CollapsibleSection from './CollapsibleSection';
import { adjustAllIngredients } from '@/lib/recipeHelpers';
import { adjustIngredientQuantity } from '@/lib/recipeHelpers';
import { IngredientSection, InstructionSection  } from '@/lib/recipes';
import InstructionsList from '@/components/molecules/InstructionsList';


interface RecipeDetailsSectionProps {
  // Métadonnées principales
  titre: string;
  slug: string;
  auteur: string;
  date: string;
  description: string;
  image: string;
  
  // Temps
  totalTime: string;
  prepTime: string;
  cookTime: string;
  
  // Portions et ingrédients
  portions: number;
  ingredients: IngredientSection[]; // ← Structure avec sous-sections
  
  // Instructions et FAQ
  instructions?: InstructionSection[];
  faq?: Array<{ question: string; answer: string }>;
  
  // Catégorisation (pour Schema.org)
  categoriePrincipale?: string;
  sousCategorie?: string;
  tags?: string[];
}


export default function RecipeDetailsSection(props: RecipeDetailsSectionProps) {
  const [adjustedIngredients, setAdjustedIngredients] = useState<IngredientSection[]>(
    props.ingredients
  );
  const [isAdjusted, setIsAdjusted] = useState(false);
  const [portionRatio, setPortionRatio] = useState(1);

  const handlePortionChange = (newPortions: number, ratio: number) => {
    const adjusted = adjustAllIngredients(props.ingredients, ratio);
    
    setAdjustedIngredients(adjusted);
    setIsAdjusted(ratio !== 1);
  };
    // Générer le JSON-LD Schema.org
  const generateRecipeSchema = () => {
    // Aplatir tous les ingrédients pour Schema.org
    const allIngredients = props.ingredients.flatMap(section => section.items);
    const allInstructions = props.instructions.flatMap(section => section.steps);
    return {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": props.titre,
      "image": [props.image],
      "author": {
        "@type": "Person",
        "name": props.auteur
      },
      "datePublished": props.date,
      "description": props.description,
      "totalTime": convertTimeToISO8601(props.totalTime),
      "prepTime": convertTimeToISO8601(props.prepTime),
      "cookTime": convertTimeToISO8601(props.cookTime),
      "recipeYield": `${props.portions} ${props.portions > 1 ? 'portions' : 'portion'}`,
      "recipeIngredient": allIngredients,
      "recipeInstructions": allInstructions.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": step
      })),
      "keywords": props.tags?.join(', '),
      "recipeCategory": props.sousCategorie || props.categoriePrincipale,
      "recipeCuisine": "Française",
      "suitableForDiet": "https://schema.org/VeganDiet"
    };
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateRecipeSchema) }}
      />
      
      {/* Container avec microdata */}
      <article 
        className="recipe-details-section"
        itemScope 
        itemType="https://schema.org/Recipe"
      >
        {/* Meta cachée pour SEO */}
        <meta itemProp="name" content={props.titre} />
        <meta itemProp="description" content={props.description} />
        <meta itemProp="datePublished" content={props.date} />
        <link itemProp="image" href={props.image} />
        
        <RecipeMetaHeader
        titre={props.titre}
        slug={props.slug}
        tempsTotal={props.totalTime}
        tempsPreparation={props.prepTime}
        tempsCuisson={props.cookTime}
        portionsInitiales={props.portions}
        onPortionChange={handlePortionChange}
      />
      <CollapsibleSection title="Ingrédients" defaultOpen={true}>
        <IngredientsList 
          ingredients={adjustedIngredients}
          isAdjusted={isAdjusted}
        />
      </CollapsibleSection>
      {/* Section Instructions */}
      <CollapsibleSection 
          title="Instructions" 
          defaultOpen={true}
          id="section-instructions"
      >
          <InstructionsList instructions={props.instructions} />
        </CollapsibleSection>
      </article>
    </>
  );
}