// src/components/atoms/ThemeToggle.tsx

/**
 * @component ThemeToggle
 * @description
 * Bouton toggle pour basculer entre mode clair et sombre.
 * Utilise le hook useTheme qui gère la persistance localStorage et la préférence système.
 * L'icône change dynamiquement : lune (mode clair) → soleil (mode sombre).
 *
 * @example
 * ```tsx
 * // Dans le layout, wrapper avec ThemeProvider
 * <ThemeProvider>
 *   <Header>
 *     <ThemeToggle />
 *   </Header>
 * </ThemeProvider>
 * ```
 *
 * @returns {JSX.Element} Bouton toggle de thème accessible
 *
 * @see {@link useTheme} Hook custom pour gestion du thème
 */
'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className="theme-toggle"
            aria-label={`Basculer vers le mode ${theme === 'light' ? 'sombre' : 'clair'}`}
            aria-pressed={theme === 'dark'}
        >
            {theme === 'light' ? <svg
                viewBox="0 0 24 24"
                fill="none"
                className="theme-icon"
                aria-hidden="true"
            >
                {/* Icône lune/croissant */}
                <path
                    fill="currentColor"
                    fillOpacity=".9"
                    d="M13.315 0C17.233 1.573 20 5.406 20 9.886c0 5.882-4.769 10.651-10.651 10.651A10.648 10.648 0 0 1-.002 14.99c1.227.493 2.565.768 3.968.768 5.882 0 10.651-4.769 10.651-10.652 0-1.85-.472-3.589-1.302-5.105Z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24" aria-hidden="true">
                <rect width="36" height="1.059" y="15.529" fill="currentColor" rx=".529" />
                <rect width="23.647" height="1.059" x="6.176" y="17.882" fill="currentColor" rx=".529" />
                <rect width="17.412" height="1.059" x="9.707" y="20.234" fill="currentColor" rx=".529" />
                <rect width="6.317" height="1.059" fill="currentColor" rx=".529" transform="rotate(9.21 -74.947 23.133)" />
                <rect width="6.317" height="1.059" fill="currentColor" rx=".529" transform="matrix(-.9871 .16005 .16006 .9871 33.297 12.264)" />
                <rect width="6.317" height="1.059" fill="currentColor" rx=".529" transform="rotate(35.602 -6.262 11.965) skewX(-.001)" />
                <rect width="6.317" height="1.059" fill="currentColor" rx=".529" transform="matrix(-.81308 .58216 .58217 .81307 30.24 5.854)" />
                <rect width="6.317" height="1.059" fill="currentColor" rx=".529" transform="rotate(62.91 4.643 10.02) skewX(-.001)" />
                <rect width="6.317" height="1.059" fill="currentColor" rx=".529" transform="matrix(-.4554 .89029 .8903 .45538 24.58 1.294)" />
                <rect width="6.317" height="1.059" x="18.293" fill="currentColor" rx=".529" transform="rotate(90 18.293 0)" />
                <path fill="currentColor" d="M26.234 15.53a8.15 8.15 0 0 0-.643-3.174 8.286 8.286 0 0 0-1.83-2.691 8.453 8.453 0 0 0-2.738-1.798 8.571 8.571 0 0 0-6.46 0 8.454 8.454 0 0 0-2.74 1.798 8.286 8.286 0 0 0-1.829 2.69 8.169 8.169 0 0 0-.642 3.175h16.882Z" />
            </svg>

            }
        </button>
    );
}