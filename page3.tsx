"use client"

import { useState } from "react"
import { VibeCard } from "@/components/vibe/VibeCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileMenu } from "@/components/ui/ProfileMenu"

// Mock data - Replace with API call
const mockVibes = [
  {
    id: "1",
    title: "Sunset Beach Walk",
    category: "Travel",
    emotion: "Peaceful",
    thumbnailUrl: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
    creator: {
      nickname: "WanderlustFilms",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=WanderlustFilms"
    },
    price: 299
  },
  {
    id: "2",
    title: "City Lights Drive",
    category: "Urban",
    emotion: "Energetic",
    thumbnailUrl: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
    creator: {
      nickname: "UrbanVibes",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=UrbanVibes"
    },
    price: 399
  },
  {
    id: "3",
    title: "Cozy Coffee Morning",
    category: "Lifestyle",
    emotion: "Calm",
    thumbnailUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    creator: {
      nickname: "LifestyleLens",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=LifestyleLens"
    },
    price: 199
  }
]

const categories = ["All", "Travel", "Urban", "Lifestyle", "Romance", "Adventure", "Food"]
const emotions = ["All", "Peaceful", "Energetic", "Calm", "Excited", "Romantic", "Nostalgic"]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedEmotion, setSelectedEmotion] = useState("All")

  // Filter vibes based on search, category, and emotion
  const filteredVibes = mockVibes.filter(vibe => {
    const matchesSearch = vibe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vibe.creator.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || vibe.category === selectedCategory
    const matchesEmotion = selectedEmotion === "All" || vibe.emotion === selectedEmotion
    return matchesSearch && matchesCategory && matchesEmotion
  })

  // Mock user data for profile menu
  const user = {
    nickname: "Creator123",
    rentedVideosCount: 5,
    rentedPhotosCount: 3
  }

  const handleLogout = () => {
    // Implement logout logic here
    alert("Logged out")
  }

  const handleSettings = () => {
    // Implement settings navigation here
    alert("Navigate to settings")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Profile Menu */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Vibes</h1>
            <p className="text-zinc-400">
              Discover and rent cinematic moments for your social media
            </p>
          </div>
          <ProfileMenu
            nickname={user.nickname}
            rentedVideosCount={user.rentedVideosCount}
            rentedPhotosCount={user.rentedPhotosCount}
            onLogout={handleLogout}
            onSettings={handleSettings}
          />
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder="Search vibes or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-900/50 border-zinc-800"
          />
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
              <SelectValue placeholder="Emotion" />
            </SelectTrigger>
            <SelectContent>
              {emotions.map((emotion) => (
                <SelectItem key={emotion} value={emotion}>
                  {emotion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="trending" className="mb-8">
          <TabsList className="bg-zinc-900/50 border-zinc-800">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVibes.map((vibe) => (
                <VibeCard key={vibe.id} {...vibe} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add new vibes here */}
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add followed creator vibes here */}
            </div>
          </TabsContent>
        </Tabs>

        {filteredVibes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No vibes found</h3>
            <p className="text-zinc-400">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

