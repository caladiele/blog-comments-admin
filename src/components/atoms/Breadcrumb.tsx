// src/components/atoms/Breadcrumb.tsx
import Link from 'next/link';
import '@/app/styles/breadcrumb.css';

/**
 * Generates Schema.org BreadcrumbList structured data for SEO
 * @see https://schema.org/BreadcrumbList
 */
function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `${baseUrl}${item.href}` })
    }))
  };
}

/**
 * Représente un item unique du fil d'Ariane
 * @interface BreadcrumbItem
 * @property {string} label - Affiche le texte du noeud du fil
 * @property {string} [href] - URL optionelle pour la navigation (omise sur le dernier item)
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}


/**
 * @component Fil d'Ariane
 * @description
 * Composant Fil d'Ariane affichant la hiérarchie de la page courante.
 * Implémente les données structurées Schema.org pour optimisation du SEO.
 * 
 *
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { label: 'Accueil', href: '/' },
 *   { label: 'Recettes', href: '/recettes' },
 *   { label: 'Tarte aux fraises' }  // Current page (no href)
 * ]} />
 * ```
 *
 * @param {BreadcrumbProps} props - Component props
 * @param {BreadcrumbItem[]} props.items - Tableau de breadcrumb
 *
 * @returns {JSX.Element} Accessible breadcrumb navigation
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/}
 * @see {@link https://schema.org/BreadcrumbList}
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Fil d'ariane">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href || `breadcrumb-${item.label}-${index}`} className="breadcrumb-item">
              {item.href && !isLast ? (
                <Link href={item.href} className="breadcrumb-link">{item.label}</Link>
              ) : isLast ? (
                <span className="breadcrumb-current" aria-current="page">{item.label}</span>
              ) : (
                <span className="breadcrumb-link breadcrumb-link--disabled">{item.label}</span>
              )}

              {/* Séparateur uniquement entre items */}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  ·
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(items, 'https://amandebasilic.com'))
        }}
      />
    </nav>
  );
}