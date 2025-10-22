// src/components/molecules/InstructionsList.tsx

/**
 * @component InstructionsList
 * @description
 * Liste d'instructions/étapes pour recettes avec numérotation continue cross-sections,
 * animations séquentielles, et Schema.org HowTo pour rich snippets Google.
 * 
 * Fonctionnalités :
 * - Numérotation continue même avec sections multiples (utilise <ol start>)
 * - Sections optionnelles pour organisation (ex: "Préparation de la pâte", "Cuisson")
 * - Animations d'apparition décalées
 * - Support impression optimisé
 * - Schema.org HowToSection + HowToStep complet
 *
 * @example
 * ```tsx
 * const instructions = [
 *   {
 *     section: "Préparation de la pâte",
 *     steps: [
 *       "Mélanger la farine et le sel",
 *       "Ajouter l'eau progressivement",
 *       "Pétrir pendant 10 minutes"
 *     ]
 *   },
 *   {
 *     section: "Cuisson",
 *     steps: [
 *       "Préchauffer le four à 180°C",
 *       "Enfourner pendant 30 minutes"
 *     ]
 *   }
 * ];
 * 
 * <InstructionsList instructions={instructions} />
 * ```
 *
 * @param {InstructionsListProps} props - Component props
 * @param {InstructionSection[]} props.instructions - Sections d'instructions organisées
 *
 * @returns {JSX.Element} Liste d'instructions accessible avec Schema.org HowTo
 *
 * @see {@link https://schema.org/HowTo}
 * @see {@link https://schema.org/HowToStep}
 */
'use client';
import { useEffect, useState } from 'react';
import '@/app/styles/instructions-list.css';

/**
 * Représente une section d'instructions avec son titre et ses étapes
 * @interface InstructionSection
 */
export interface InstructionSection {
  /** Titre de la section (ex: "Préparation", vide si pas de section) */
  section: string;
  /** Liste des étapes de cette section */
  steps: string[];
}

/**
 * Props pour le composant InstructionsList
 * @interface InstructionsListProps
 */
interface InstructionsListProps {
  /** Tableau de sections d'instructions avec leurs étapes */
  instructions: InstructionSection[];
}

export default function InstructionsList({ 
  instructions 
}: InstructionsListProps) {
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [activeStep, setActiveStep] = useState(false);
    // Marquer le premier rendu comme terminé après le montage
    useEffect(() => {
      setIsInitialRender(false);
    }, []);
  // Vérifier si on a des sections nommées
  const hasSections = instructions.some(section => section.section !== "");
  
  // Calculer la numérotation continue cross-section
  let globalStepNumber = 0;



  return (
    <div className="instructions-list-wrapper">
      {instructions.map((instructionSection, sectionIndex) => {
        return (
          <div 
            key={`section-${sectionIndex}`} 
            className={`instruction-section ${hasSections ? 'has-section-title' : ''}`}
          >
            {/* Sous-titre de section (si non vide) */}
            {instructionSection.section && (
              <>
                <h4 className="instruction-section-title">
                  {instructionSection.section}
                </h4>
                <meta itemProp="name" content={instructionSection.section} />
              </>
            )}
            
            {/* Liste des étapes */}
            <ol 
              className="instructions-list" 
              role="list"
              // Démarrer la numérotation à partir du nombre actuel
              start={globalStepNumber + 1}
              itemScope
              itemType="https://schema.org/HowToSection"
            >
              {instructionSection.steps.map((step, stepIndex) => {
                globalStepNumber++;
                return (
                  <li 
                    key={`step-${sectionIndex}-${stepIndex}`} 
                    className={`instruction-step`}
                    itemProp="step"
                    itemScope
                    itemType="https://schema.org/HowToStep"
                    style={{
                      animationDelay: isInitialRender ? `${(globalStepNumber - 1) * 0.08}s` : '0s'
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <span 
                      className="step-number" 
                      aria-hidden="true"
                    >
                      {globalStepNumber}.
                    </span>
                    
                    {/* Texte de l'étape */}
                    <div className="step-content">
                      <meta itemProp="position" content={globalStepNumber.toString()} />
                      <span itemProp="text">{step}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
}