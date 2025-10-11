// src/components/organisms/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/atoms/Logo';
import ThemeToggle from '@/components/atoms/ThemeToggle';
import MenuButton from '@/components/atoms/MenuButton';
import NavigationMenu from '@/components/organisms/NavigationMenu';

import '@/app/styles/header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <header 
        className={`site-header`}
        role="banner"
      >
        <div className="header-container">
          {/* Zone gauche - Theme Toggle */}
          <div className="header-left">
            <ThemeToggle />
          </div>
          
          {/* Zone centrale - Logo */}
          <div className="header-center">
            <Logo />
          </div>
          
          {/* Zone droite - Menu */}
          <div className="header-right">
            <MenuButton 
              isOpen={isMenuOpen}
              onToggle={setIsMenuOpen} 
            />
          </div>
        </div>
      </header>

      <NavigationMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
      
    </>
  );
}