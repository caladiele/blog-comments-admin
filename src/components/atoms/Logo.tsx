// src/components/atoms/Logo.tsx
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`logo ${className}`}
      aria-label="Amande & Basilic - Retour à l'accueil"
    >
      <span className="logo-text">amande & basilic</span>
    </Link>
  );
}