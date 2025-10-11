// src/components/molecules/MenuItem.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MenuItemProps {
  title: string;
  href?: string;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
  index?: number;
  visibility?: 'visible' | 'active' | 'above' | 'below';
  shouldReset: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function MenuItem({ 
  title, 
  href, 
  hasSubmenu = false,
  children,
  visibility = 'visible',
  onToggle,
  shouldReset
}: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Fermer si un autre menu s'ouvre
    if (visibility !== 'active' && visibility !== 'visible') {
      setIsOpen(false);
    }
  }, [visibility]);
  
  
  const handleToggle = () => {
    if (hasSubmenu) {
      const newState = !isOpen;
      setIsOpen(newState);
      onToggle?.(newState);
    }
  };

  useEffect(() => {
    if (shouldReset) {
      setIsOpen(false);
    }
  }, [shouldReset]);
  
  const content = (
    <>
      <span className="menu-item-text">{title}</span>
      {hasSubmenu && (
        <svg 
          className={`menu-item-chevron ${isOpen ? 'chevron-open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M4 6l4 4 4-4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
  
  return (
    <li className={`menu-item menu-item--${visibility}`}>
      {hasSubmenu ? (
        <>
          <button
            className="menu-item-button"
            onClick={handleToggle}
            aria-expanded={isOpen}
          >
            {content}
          </button>
          {isOpen && (
            <ul className="submenu" role="group">
              {children}
            </ul>
          )}
        </>
      ) : (
        <Link href={href || '#'} className="menu-item-link">
          {content}
        </Link>
      )}
    </li>
  );
}