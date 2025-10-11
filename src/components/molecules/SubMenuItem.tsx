// src/components/molecules/SubMenuItem.tsx
import Link from 'next/link';

interface SubMenuItemProps {
  title: string;
  href: string;
}

export default function SubMenuItem({ title, href }: SubMenuItemProps) {
  return (
    <li className="submenu-item">
      <Link href={href} className="submenu-item-link">
        {title}
      </Link>
    </li>
  );
}