// src/components/organisms/NavigationMenu.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import CloseButton from '@/components/atoms/CloseButton';
import SearchInput from '@/components/atoms/SearchInput';
import MenuItem from '@/components/molecules/MenuItem';
import SubMenuItem from '@/components/molecules/SubMenuItem';
import ThemeToggle from '@/components/atoms/ThemeToggle';

import '@/app/styles/navigation.css'


interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const navContentRef = useRef<HTMLDivElement>(null);
  const [shouldReset, setShouldReset] = useState(false);

  const handleClose = () => {
    setActiveMenuIndex(null);
    setIsSearchMode(false);
    onClose(); // appelle le parent pour fermer le menu
  };


  // Reset quand le menu se ferme
  useEffect(() => {
    if (!isOpen) {
      setActiveMenuIndex(null);
      setIsSearchMode(false);

    }
  }, [isOpen]);

  // Bloquer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearchFocus = () => {
    setIsSearchMode(true);
  };

  const handleBackToMenu = () => {
    setIsSearchMode(false);
  };

  // Gérer ESC avec logique conditionnelle
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isSearchMode) {
          setIsSearchMode(false); // Retour au menu
        } else {
          handleClose(); // Fermer tout
        }
      }
    };


    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isSearchMode, onClose]);

  // Quand le menu se ferme
  useEffect(() => {
    if (!isOpen) {
      setShouldReset(true); // 🔄 déclenche le reset
      const timer = setTimeout(() => setShouldReset(false), 0); // remet à false juste après
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fermer en cliquant dans le vide
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Si on clique sur l'overlay lui-même (pas ses enfants)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Vérifier si on clique dans une zone vide du content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSearch = (value: string) => {
    console.log('Recherche:', value);
  };

  const handleMenuToggle = (index: number, isOpen: boolean) => {
    setActiveMenuIndex(isOpen ? index : null);
  };

  const menuItems = [
    { title: "TOUTES LES RECETTES", href: "/recettes" },
    {
      title: "RECETTES PAR CATÉGORIES",
      hasSubmenu: true,
      children: [
        { title: "BASES & ESSENTIELS", href: "/recettes/bases-essentiels" },
        { title: "ENTRÉES & APÉRITIFS", href: "/recettes/entrees-aperitifs" },
        { title: "SALADES & BOWLS", href: "/recettes/salades-bowls" },
        { title: "PLATS PRINCIPAUX", href: "/recettes/plats-principaux" },
        { title: "SOUPES & VELOUTÉS", href: "/recettes/soupes-veloutes" },
        { title: "DESSERTS & DOUCEURS", href: "/recettes/desserts-douceurs" },
        { title: "BOULANGERIE & PETITS DÉJEUNERS", href: "/recettes/boulangerie" },
        { title: "BOISSONS & INFUSIONS", href: "/recettes/boissons-infusions" },
        { title: "LA CUISINE DES PLANTES SAUVAGES", href: "/recettes/plantes-sauvages" }
      ]
    },
    {
      title: "UNE VIE VÉGANE",
      hasSubmenu: true,
      children: [
        { title: "DÉBUTER SEREINEMENT", href: "/vegan/debuter" },
        { title: "LA NUTRITION SIMPLIFIÉE", href: "/vegan/nutrition" },
        { title: "VIE PRATIQUE", href: "/vegan/vie-pratique" },
        { title: "QUESTIONS FRÉQUENTES", href: "/vegan/faq" }
      ]
    },
    {
      title: "BIEN-ÊTRE",
      hasSubmenu: true,
      children: [
        { title: "BEAUTÉ HOMEMADE", href: "/bien-etre/beaute" },
        { title: "SÉRÉNITÉ & ÉQUILIBRE", href: "/bien-etre/serenite" }
      ]
    },
    {
      title: "HOMEMADE & CRÉATIVITÉ",
      hasSubmenu: true,
      children: [
        { title: "DIY", href: "/homemade/diy" },
        { title: "MAISON", href: "/homemade/maison" }
      ]
    },
    {
      title: "INSPIRATIONS",
      hasSubmenu: true,
      children: [
        { title: "ESCAPADES & RENCONTRES", href: "/inspirations/escapades" },
        { title: "DÉCOUVERTES", href: "/inspirations/decouvertes" }
      ]
    },
    {
      title: "PERSPECTIVES",
      hasSubmenu: true,
      children: [
        { title: "NOTRE PLANÈTE", href: "/perspectives/planete" },
        { title: "NOTRE SOCIÉTÉ", href: "/perspectives/societe" },
        { title: "BONNES NOUVELLES", href: "/perspectives/bonnes-nouvelles" }
      ]
    }
  ];

  const getItemVisibility = (index: number) => {
    if (activeMenuIndex === null) return 'visible';
    if (index === activeMenuIndex) return 'active';
    if (index < activeMenuIndex) return 'above';
    return 'below';
  };

  return (
    <nav
      className={`navigation-overlay ${isOpen ? 'nav-open' : ''} ${isSearchMode ? 'search-mode' : ''}`}
      role="navigation"
      aria-label="Navigation principale"
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}

    >
      <div className="nav-container" onClick={handleContentClick}>
        <div className="nav-header" onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}>
          {isSearchMode ? (
            <button
              className="back-button"
              onClick={handleBackToMenu}
              aria-label="Retourner au menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="15" fill="none" viewBox="0 0 46 15">
                <path d="M46 7.5H1M9 14 1.122 8.31a1 1 0 0 1 0-1.62L9 1" opacity=".7" />
              </svg>
              <span>retourner au menu</span>
            </button>
          ) : (
            <ThemeToggle />
          )}
          <CloseButton onClick={handleClose} />
        </div>

        <div ref={navContentRef} className={`nav-content ${isSearchMode ? 'content-search' : ''}`}>
          {!isSearchMode && (
            <ul className="nav-menu" role="list">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  {...item}
                  index={index}
                  visibility={getItemVisibility(index)}
                  onToggle={(isOpen) => handleMenuToggle(index, isOpen)}
                  shouldReset={shouldReset}
                >
                  {item.children?.map((child, childIndex) => (
                    <SubMenuItem
                      key={childIndex}
                      title={child.title}
                      href={child.href}
                    />
                  ))}
                </MenuItem>
              ))}
            </ul>
          )}

          <div className={`nav-search ${activeMenuIndex !== null && !isSearchMode ? 'search-hidden' : ''}`}>
            <SearchInput
              onSearch={handleSearch}
              onFocus={handleSearchFocus}
            />
          </div>

          {isSearchMode && (
            <div className="search-results">
              {/* Zone pour les résultats de recherche */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}