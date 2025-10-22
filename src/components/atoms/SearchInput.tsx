// src/components/atoms/SearchInput.tsx

/**
 * @component SearchInput
 * @description
 * Composant de recherche avec input et bouton submit.
 * Utilise un controlled input avec état local et callbacks optionnels.
 * Optimisé pour la navigation et recherche sur le site.
 *
 * @example
 * ```tsx
 * // Recherche basique
 * <SearchInput 
 *   onSearch={(query) => console.log('Recherche:', query)}
 * />
 * 
 * // Avec focus callback (pour ouvrir overlay)
 * <SearchInput 
 *   onSearch={handleSearch}
 *   onFocus={() => setSearchMode(true)}
 *   placeholder="Rechercher une recette..."
 * />
 * ```
 *
 * @param {SearchInputProps} props - Component props
 * @param {(value: string) => void} [props.onSearch] - Callback lors de la soumission
 * @param {() => void} [props.onFocus] - Callback lors du focus sur l'input
 * @param {string} [props.placeholder] - Texte du placeholder (défaut: "RECHERCHE...")
 *
 * @returns {JSX.Element} Formulaire de recherche accessible
 */
'use client';

import { useState } from 'react';

/**
 * Props pour le composant SearchInput
 * @interface SearchInputProps
 */
interface SearchInputProps {
  /** Callback appelé lors de la soumission du formulaire avec la valeur */
  onSearch?: (value: string) => void;
  /** Callback appelé lors du changement de valeur du champs */
  onChangeValue?: (value: string) => void;
  /** Callback appelé lors du focus sur l'input */
  onFocus?: () => void;
  /** Texte du placeholder */
  placeholder?: string;
}

export default function SearchInput({ 
  onSearch,
  onChangeValue, 
  onFocus,
  placeholder = "Recherche..." 
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChangeValue?.(newValue); // Callback instantané
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };
  
  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <label htmlFor="search-input" className="sr-only">
        Rechercher sur le site
      </label>
      <input
        type="search"
        id="search-input"
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="search-input"
        autoComplete="off"
      />
      <button 
        type="submit" 
        className="search-submit"
        aria-label="Lancer la recherche"
        disabled={!value.trim()}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
      {value && (
  <button
    type="button"
    onClick={() => setValue('')}
    aria-label="Effacer la recherche"
  >
    ✕
  </button>
)}
    </form>
  );
}