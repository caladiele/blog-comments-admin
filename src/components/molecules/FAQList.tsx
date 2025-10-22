// src/components/molecules/FAQList.tsx
'use client';

import FAQItem from '@/components/atoms/FAQItem';
import { FAQItem as FAQItemData } from '@/lib/recipes'; // ← Import du type
import '@/app/styles/faq-list.css';

/**
 * Props pour le composant FAQList
 * @interface FAQListProps
 */
interface FAQListProps {
  /** Liste des questions/réponses */
  faq: FAQItemData[];
  /** Indique si toutes les questions doivent être ouvertes par défaut */
  defaultOpenAll?: boolean;
}

/**
 * Composant FAQList - Liste de questions fréquentes
 * 
 * Affiche une liste de questions/réponses collapsibles avec support
 * Schema.org FAQPage pour optimisation SEO.
 * 
 * Intégration SEO :
 * - itemType="https://schema.org/FAQPage" sur le container
 * - Chaque FAQItem contient Question/Answer microdatas
 * - Compatible avec Google Rich Results
 * 
 * @component
 * @example
 * ```tsx
 * <FAQList
 *   faq={[
 *     {
 *       question: "Puis-je réduire le sucre ?",
 *       answer: "Oui, mais ajoutez du citron..."
 *     },
 *     {
 *       question: "Temps de conservation ?",
 *       answer: "Plusieurs mois à température ambiante..."
 *     }
 *   ]}
 *   defaultOpenAll={false}
 * />
 * ```
 */
export default function FAQList({ 
  faq,
  defaultOpenAll = false
}: FAQListProps) {
  // Vérifier si on a des FAQ
  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <div 
      className="faq-list-wrapper"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="faq-list">
        {faq.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            defaultOpen={defaultOpenAll}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}