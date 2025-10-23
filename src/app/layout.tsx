import type { Metadata } from "next";
import { SvgDefsProvider } from "@/components/providers/SvgDefsProvider";
import { ThemeProvider } from '@/hooks/useTheme';

import '@/app/styles/reset.css';
import '@/app/styles/typographie.css'

/**
 * CONFIGURATION SEO & MÉTADONNÉES GLOBALES
 * =====================================
 * 
 * Définit l'identité numérique d'Amande & Basilic pour les moteurs de recherche
 * 
 * 
*/
export const metadata: Metadata = {
  /**
    * TITRES DYNAMIQUES
    * Structure template permettant la personnalisation par page
    * Format : "Titre de la page | Amande & Basilic"
  */
  title: {
       default: "Amande & Basilic | Recettes Véganes & Inspirations Sauvages",
       template: "%s | Amande & Basilic"
  },
  /**
    * DESCRIPTION   
  */
  description: "Découvrez des recettes véganes créatives, des inspirations de cuisine sauvage et des guides pratiques pour une alimentation saine et durable.",
  /**
   * OPTIMISATION RÉSEAUX SOCIAUX (Open Graph)
  */ 
  openGraph: {
       type: 'website',
       locale: 'fr_FR',
       url: 'https://amandebasilic.com',
       siteName: 'Amande & Basilic',
       images: [{
         url: '/images/og-default.jpg',
         width: 1200,
         height: 630,
       }]
     },
  /**
   * OPTIMISATION TWITTER/X
  */ 
     twitter: {
       card: 'summary_large_image',
       title: 'Amande & Basilic',
       description: 'Recettes véganes & Inspirations Sauvages',
       creator: '@amandebasilic',
     },
  /**
   * DIRECTIVES MOTEURS DE RECHERCHE
   * Indexation complète autorisée - site orienté découverte organique
  */
     robots: {
       index: true,
       follow: true,
     },
  /**
   * URL CANONIQUE
   * Évite la duplication de contenu et consolide l'autorité SEO
  */
     alternates: {
       canonical: 'https://amandebasilic.com'
     }
};

/**
 * LAYOUT RACINE - FONDATION DE L'EXPÉRIENCE UTILISATEUR
 * ===================================================
 * 
 * Structure HTML de base pour toutes les pages d'Amande & Basilic.
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
        <SvgDefsProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
