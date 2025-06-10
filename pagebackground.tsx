"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-zinc-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
            VibeGram
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:text-emerald-400">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg')"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          {/* Centered Title */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text mb-6">
              VibeGram
            </h1>
            <p className="text-2xl text-zinc-300">
              Stunning cinematic moments for your social media
            </p>
          </div>
          
          {/* Search Bar and Trending in one group */}
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-6">
              <Input 
                type="search"
                placeholder="Search for cinematic moments..."
                className="w-full h-14 pl-12 pr-4 rounded-full bg-white/10 backdrop-blur-md border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
            </div>

            <div className="flex items-center justify-center gap-3 text-base">
              <span className="text-zinc-400">Trending:</span>
              {["Cinematic", "Travel", "Urban", "Nature", "Lifestyle"].map((keyword) => (
                <Link
                  key={keyword}
                  href={`/category/${keyword.toLowerCase()}`}
                >
                  <Button
                    variant="link"
                    className="text-zinc-300 hover:text-emerald-400 px-1"
                  >
                    {keyword}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Travel Moments", slug: "travel", image: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg" },
              { name: "Urban Life", slug: "urban", image: "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg" },
              { name: "Nature Scenes", slug: "nature", image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg" },
              { name: "Lifestyle", slug: "lifestyle", image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg" }
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.slug}`}
                className="block"
              >
                <div className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-4">🎥</div>
              <h3 className="text-lg font-medium text-white mb-2">High-Quality Content</h3>
              <p className="text-zinc-400">Access premium cinematic moments for your social media</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="text-lg font-medium text-white mb-2">Easy Customization</h3>
              <p className="text-zinc-400">Personalize content with our built-in editing tools</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-medium text-white mb-2">Quick Sharing</h3>
              <p className="text-zinc-400">Share directly to your favorite social platforms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} VibeGram. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
