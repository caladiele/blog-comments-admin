/**
 * Composant pour les liens internes/externes
 * Style: Soulignement fluide, couleur naturelle
 */

import Link from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export default function ContentLink({ href, children, external = false, ...props }: LinkProps)

{
  // Déterminer si le lien est externe
  const isInternal = href.startsWith('https://amandebasilic.com/');
  
  if (!isInternal) {
    return (
      <a 
        href={href}
        className="recipe-content-link recipe-content-link--external"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <svg 
          className="recipe-content-link__external-icon"
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21V9M10 14L21 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  }

  return (
    <Link 
      href={href}
      className="recipe-content-link recipe-content-link--internal"
      {...props}
    >
      {children}
    </Link>
  );
};
