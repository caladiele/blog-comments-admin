// src/components/atoms/SearchInput.tsx
'use client';

import { useState } from 'react';

interface SearchInputProps {
  onSearch?: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export default function SearchInput({ 
  onSearch, 
  onFocus,
  placeholder = "RECHERCHE..." 
}: SearchInputProps) {
  const [value, setValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };
  
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="search-input"
        aria-label="Rechercher sur le site"
      />
      <button 
        type="submit" 
        className="search-submit"
        aria-label="Lancer la recherche"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle 
            cx="8.5" cy="8.5" r="7.5" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
          <path 
            d="M14 14l4 4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}