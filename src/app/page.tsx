import { getLatestPost } from '@/lib/mdx'

import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/organisms/Header'
import { ThemeProvider } from '@/hooks/useTheme';
import HeroArticle from '@/components/organisms/HeroArticle'
import RecipesSection from '@/components/organisms/RecipesSection';
import { getAllRecipes } from '@/lib/recipes'; // Fonction à créer

import '@/app/styles/main.css'

export default async function HomePage() {
  
  const latestPost = getLatestPost()
  const recipes = await getAllRecipes();

  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Hero Article */}
      <main className="main">
        {latestPost && (
          <HeroArticle post={latestPost} />
        )}
        <RecipesSection recipes={recipes} maxRecipes={6} />
      </main>
    </div>
  )
}