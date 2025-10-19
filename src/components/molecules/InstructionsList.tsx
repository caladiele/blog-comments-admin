// src/components/molecules/InstructionsList.tsx
'use client';

import '@/app/styles/instructions-list.css';

export interface InstructionSection {
  section: string;
  steps: string[];
}

interface InstructionsListProps {
  instructions: InstructionSection[];
}

export default function InstructionsList({ 
  instructions 
}: InstructionsListProps) {
  // Vérifier si on a des sections nommées
  const hasSections = instructions.some(section => section.section !== "");
  
  // Calculer la numérotation continue
  let globalStepNumber = 0;

  return (
    <div className="instructions-list-wrapper">
      {instructions.map((instructionSection, sectionIndex) => {
        return (
          <div 
            key={sectionIndex} 
            className={`instruction-section ${hasSections ? 'has-section-title' : ''}`}
          >
            {/* Sous-titre de section (si non vide) */}
            {instructionSection.section && (
              <h4 className="instruction-section-title">
                {instructionSection.section}
              </h4>
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
                    key={stepIndex} 
                    className="instruction-step"
                    itemProp="step"
                    itemScope
                    itemType="https://schema.org/HowToStep"
                    style={{
                      animationDelay: `${(globalStepNumber - 1) * 0.08}s`
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