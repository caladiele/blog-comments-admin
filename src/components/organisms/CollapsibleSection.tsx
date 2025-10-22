// src/components/organisms/CollapsibleSection.tsx
'use client';

import { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react';
import CollapseChevron from '@/components/atoms/CollapseChevron';
import '@/app/styles/collapsible-section.css';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  id?: string; // Pour l'accessibilité
}

export default function CollapsibleSection({ 
  title, 
  defaultOpen = false,
  children,
  id
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  
  // Générer un ID unique pour l'accessibilité
  const sectionId = id || `collapsible-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const contentId = `${sectionId}-content`;

  // Calculer la hauteur du contenu
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  // Recalculer la hauteur si le contenu change (ex: ajustement des portions)
    // Recalculer la hauteur quand le contenu change (ajustement portions)
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Petit délai pour laisser le DOM se mettre à jour
      const timer = setTimeout(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [children, isOpen]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

    // Handler pour le chevron avec stopPropagation
  const handleChevronClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Empêche la propagation au header
    toggleSection();
  };

  return (
    <section className="collapsible-section" id={sectionId}>
      {/* Header cliquable */}
      <div 
        className="section-header"
        onClick={toggleSection}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSection();
          }
        }}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <h3 className="section-title">{title}</h3>
        <CollapseChevron 
          isOpen={isOpen} 
          onClick={handleChevronClick}
          ariaLabel={`${isOpen ? 'Fermer' : 'Ouvrir'} la section ${title}`}
        />
      </div>

      {/* Contenu collapsible */}
      <div
        ref={contentRef}
        id={contentId}
        className={`section-content ${isOpen ? 'content-open' : 'content-closed'}`}
        style={{
          maxHeight: isOpen && contentHeight ? `${contentHeight}px` : '0px'
        }}
        aria-hidden={!isOpen}
      >
        <div className="section-content-inner">
          {children}
        </div>
      </div>
    </section>
  );
}