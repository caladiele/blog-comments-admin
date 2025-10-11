import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/organisms/Header'
import { ThemeProvider } from '@/hooks/useTheme';

export default function HomePage() {

  return (
    <div className="">
      {/* Header */}
      <Header />
    </div>
  )
}