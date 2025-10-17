// src/components/atoms/Breadcrumb.tsx
import Link from 'next/link';
import '@/app/styles/breadcrumb.css';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Fil d'ariane">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="breadcrumb-item">
              {!isLast && item.href ? (
                <>
                  <Link href={item.href} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-separator" aria-hidden="true">
                    {'.'}
                  </span>
                </>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && (
              <span className="breadcrumb-separator" aria-hidden="true">·</span>
            )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}