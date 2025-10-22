// src/components/atoms/FAQItem.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import '@/app/styles/faq-item.css';

/**
 * Props pour le composant FAQItem
 * @interface FAQItemProps
 */
interface FAQItemProps {
  /** Texte de la question */
  question: string;
  /** Texte de la réponse */
  answer: string;
  /** Indique si l'item doit être ouvert par défaut */
  defaultOpen?: boolean;
  /** Index de la question (pour animations décalées) */
  index?: number;
}

/**
 * Composant FAQItem - Question/Réponse collapsible individuelle
 * 
 * Affiche une question cliquable avec une réponse collapsible.
 * Intègre les microdatas Schema.org pour le SEO (Question/Answer).
 * 
 * @component
 * @example
 * ```tsx
 * <FAQItem
 *   question="Puis-je réduire le sucre ?"
 *   answer="Oui, mais ajoutez du citron..."
 *   defaultOpen={false}
 *   index={0}
 * />
 * ```
 */
export default function FAQItem({ 
  question, 
  answer, 
  defaultOpen = false,
  index = 0
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const answerRef = useRef<HTMLDivElement>(null);
  const [answerHeight, setAnswerHeight] = useState<number | null>(null);

  /**
   * Calcule la hauteur du contenu pour l'animation
   */
  useEffect(() => {
    if (answerRef.current) {
      setAnswerHeight(answerRef.current.scrollHeight);
    }
  }, [answer]);

  /**
   * Recalcule la hauteur si le contenu change
   */
  useEffect(() => {
    if (isOpen && answerRef.current) {
      const timer = setTimeout(() => {
        if (answerRef.current) {
          setAnswerHeight(answerRef.current.scrollHeight);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [answer, isOpen]);

  /**
   * Toggle l'état ouvert/fermé
   */
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`faq-item ${isOpen ? 'faq-open' : 'faq-closed'}`}
      itemScope 
      itemProp="mainEntity" 
      itemType="https://schema.org/Question"
      style={{
        animationDelay: `${index * 0.08}s`
      }}
    >
      {/* Question (cliquable) */}
      <button
        type="button"
        className="faq-question"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="question-text" itemProp="name">
          {question}
        </span>
        
        {/* Chevron */}
        <svg 
          className="faq-chevron"
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M4.5 6.75L9 11.25L13.5 6.75" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Réponse (collapsible) */}
      <div
        id={`faq-answer-${index}`}
        ref={answerRef}
        className={`faq-answer ${isOpen ? 'answer-open' : 'answer-closed'}`}
        itemScope 
        itemProp="acceptedAnswer" 
        itemType="https://schema.org/Answer"
        style={{
          maxHeight: isOpen && answerHeight ? `${answerHeight}px` : '0px'
        }}
        aria-hidden={!isOpen}
      >
        <div className="answer-content">
          <p itemProp="text">{answer}</p>
        </div>
      </div>
    </div>
  );
}