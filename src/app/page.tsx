import { getLatestPost } from '@/lib/mdx'

import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/organisms/Header'
import { ThemeProvider } from '@/hooks/useTheme';
import HeroArticle from '@/components/organisms/HeroArticle'

import '@/app/styles/main.css'

export default function HomePage() {

  const latestPost = getLatestPost()


  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Hero Article */}
      <main className="main">
        {latestPost && (
          <HeroArticle post={latestPost} />
        )}

      </main>
    </div>
  )
}