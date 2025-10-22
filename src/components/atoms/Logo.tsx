// src/components/atoms/Logo.tsx
import Link from 'next/link';
import "@/app/styles/logo.css"
/**
 * @component Logo
 * @description
 * Logo du site "Amande & Basilic" avec lien vers la page d'accueil.
 * Utilise du texte stylisé avec la police "Voyage".
 *
 * @example
 * ```tsx
 * // Usage basique
 * <Logo />
 * 
 * // Avec classe custom
 * <Logo className="header-logo" />
 * ```
 *
 * @param {LogoProps} props - Component props
 * @param {string} [props.className] - Classes CSS additionnelles
 *
 * @returns {JSX.Element} Lien logo vers l'accueil
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/link}
 */

/**
 * Props pour le composant Logo
 * @interface LogoProps
 */
interface LogoProps {
  /** Classes CSS additionnelles pour personnalisation */
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link 
      href="/" 
      rel="home"
      title="Amande & Basilic"
      className={`logo ${className}`}
      aria-label="Amande & Basilic - Retour à l'accueil"
    >
      amande & basilic
    </Link>
  );
}