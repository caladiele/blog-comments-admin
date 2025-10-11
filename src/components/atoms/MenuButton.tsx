// src/components/atoms/MenuButton.tsx
'use client';

import { useState } from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export default function MenuButton({ isOpen, onToggle }: MenuButtonProps) {
  
  const handleClick = () => {
    onToggle(!isOpen);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`menu-button ${isOpen ? 'active' : ''}`}
      aria-label="Menu de navigation"
      aria-expanded={isOpen}
    >
      <div className="menu-button-lines" aria-hidden="true">
        <span className="menu-line menu-line-1"></span>
        <span className="menu-line menu-line-2"></span>
        <span className="menu-line menu-line-3"></span>
        <span className="menu-button-text">menu</span>
      </div>
    </button>
  );
}