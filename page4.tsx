"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// Mock data for different categories
const categoryData = {
  cinematic: {
    title: "Cinematic Moments",
    description: "Professional cinematic footage for your projects",
    items: [
      {
        id: 1,
        type: "video",
        title: "Aerial City Sunset",
        thumbnail: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
        videoUrl: "https://example.com/video1.mp4",
        duration: "0:30"
      },
      // Add more items...
    ]
  },
  travel: {
    title: "Travel Adventures",
    description: "Captivating travel moments from around the world",
    items: [
      {
        id: 1,
        type: "video",
        title: "Beach Sunset Walk",
        thumbnail: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
        videoUrl: "https://example.com/video2.mp4",
        duration: "0:45"
      },
      // Add more items...
    ]
  },
  // Add other categories...
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [sortBy, setSortBy] = useState("popular")
  const [view, setView] = useState("grid")
  
  const category = categoryData[params.slug as keyof typeof categoryData] || categoryData.cinematic

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="w-full border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
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

      {/* Search and Filters Bar */}
      <div className="border-b border-zinc-800 bg-black/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Input 
                type="search"
                placeholder="Search in this category..."
                className="w-full pl-10 bg-zinc-900/50 border-zinc-800"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
            </div>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-zinc-900/50 border-zinc-800">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="border-emerald-600 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{category.title}</h1>
          <p className="text-zinc-400">{category.description}</p>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="group relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900">
                <img
                  src={`https://images.pexels.com/photos/${3052361 + index}/pexels-photo-${3052361 + index}.jpeg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">0:30</div>
              </div>
              <div className="mt-2">
                <h3 className="text-white font-medium truncate">Amazing Cinematic Moment {index + 1}</h3>
                <p className="text-zinc-400 text-sm">By Creator Studio</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Preview
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-zinc-800 text-white hover:bg-zinc-800">
            Load More
          </Button>
        </div>
      </main>
    </div>
  )
}
