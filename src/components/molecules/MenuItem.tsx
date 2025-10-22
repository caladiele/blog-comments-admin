// src/components/molecules/MenuItem.tsx

/**
 * @component MenuItem
 * @description
 * Composant de menu avec support optionnel de sous-menus déroulants.
 * Gère l'ouverture/fermeture et la visibilité selon l'état parent.
 *
 * @category Components/Molecules
 * @subcategory Navigation
 *
 * @example
 * // Menu simple avec lien
 * <MenuItem title="Accueil" href="/" />
 *
 * @example
 * // Menu avec sous-menu
 * <MenuItem
 *   title="Catégories"
 *   hasSubmenu
 *   onToggle={(isOpen) => console.log(isOpen)}
 * >
 *   <MenuItem title="Entrées" href="/entrees" />
 *   <MenuItem title="Plats" href="/plats" />
 * </MenuItem>
 *
 * @param {MenuItemProps} props - Les propriétés du composant
 * @param {string} props.title - Texte affiché dans le menu
 * @param {string} [props.href] - URL de destination (requis si !hasSubmenu)
 * @param {boolean} [props.hasSubmenu=false] - Active le mode sous-menu avec bouton déroulant
 * @param {React.ReactNode} [props.children] - Éléments du sous-menu
 * @param {number} [props.index] - Index du menu (actuellement non utilisé)
 * @param {'visible'|'active'|'above'|'below'} [props.visibility='visible'] - État de visibilité géré par le parent
 * @param {boolean} props.shouldReset - Force la fermeture du sous-menu quand true
 * @param {(isOpen: boolean) => void} [props.onToggle] - Callback appelé lors de l'ouverture/fermeture
 *
 * @returns {JSX.Element} Élément de liste <li> contenant soit un bouton (avec sous-menu) soit un lien
 *
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * @interface MenuItemProps
 * @description Propriétés du composant MenuItem
 */
interface MenuItemProps {
  /** Texte affiché dans le menu */
  title: string;
  /** URL de destination. Requis si hasSubmenu est false */
  href?: string;
  /** Active le mode sous-menu avec bouton déroulant */
  hasSubmenu?: boolean;
  /** Éléments du sous-menu (autres MenuItem) */
  children?: React.ReactNode;
  /** Index du menu dans la liste parent (non utilisé actuellement) */
  index?: number;
  /**
   * État de visibilité géré par le composant parent
   * - 'visible': Menu visible et interactif
   * - 'active': Menu actif/sélectionné
   * - 'above': Menu au-dessus de l'élément actif
   * - 'below': Menu en-dessous de l'élément actif
  */
  visibility?: 'visible' | 'active' | 'above' | 'below';
  /** Force la fermeture du sous-menu quand true */
  shouldReset: boolean;
  /** Callback appelé lors de l'ouverture/fermeture du sous-menu */
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
     if (shouldReset || (visibility !== 'active' && visibility !== 'visible')) {
       setIsOpen(false);
     }
   }, [visibility, shouldReset]);

  
  /**
 * Gère l'ouverture/fermeture du sous-menu
 * @private
 * @function handleToggle
 * @description
 * Inverse l'état d'ouverture du sous-menu et notifie le parent via onToggle.
 * Ne fait rien si hasSubmenu est false.
 */
  const handleToggle = () => {
    if (hasSubmenu) {
      const newState = !isOpen;
      setIsOpen(newState);
      onToggle?.(newState);
    }
  };


  
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
            aria-label={`${title}, ${hasSubmenu ? 'menu déroulant' : ''}`}
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