// src/components/atoms/MenuButton.tsx
'use client';
/**
 * @component MenuButton
 * @description
 * Bouton hamburger (3 lignes) pour ouvrir/fermer le menu de navigation.
 * Utilise le pattern "controlled component" avec état géré par le parent.
 * L'animation hamburger → X est gérée via CSS avec la classe "active".
 *
 * @example
 * ```tsx
 * const [menuOpen, setMenuOpen] = useState(false);
 * 
 * <MenuButton 
 *   isOpen={menuOpen} 
 *   onToggle={setMenuOpen}
 * />
 * ```
 *
 * @param {MenuButtonProps} props - Component props
 * @param {boolean} props.isOpen - État du menu (ouvert/fermé)
 * @param {(isOpen: boolean) => void} props.onToggle - Callback pour changer l'état
 *
 * @returns {JSX.Element} Bouton hamburger accessible
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/button/}
 */

/**
 * Props pour le composant MenuButton
 * @interface MenuButtonProps
 */
interface MenuButtonProps {
   /** État actuel du menu (true = ouvert, false = fermé) */
  isOpen: boolean;
   /** Callback appelé avec le nouvel état lors du clic */
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
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      type="button"
      aria-expanded={isOpen}
    >
      <div className="menu-button-lines" aria-hidden="true">
        <span className="menu-line menu-line-1"></span>
        <span className="menu-line menu-line-2"></span>
        <span className="menu-line menu-line-3"></span>
      </div>
        <span className="menu-button-text">menu</span>
    </button>
  );
}