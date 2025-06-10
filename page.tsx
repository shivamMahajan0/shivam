"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/payment/PaymentModal"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data - Replace with API call
const mockVibe = {
  id: "1",
  title: "Sunset Beach Walk",
  description: "A peaceful evening stroll along the beach with golden hour lighting and calming waves.",
  category: "Travel",
  emotion: "Peaceful",
  videoUrl: "https://example.com/video.mp4", // Replace with actual video URL
  thumbnailUrl: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
  creator: {
    nickname: "WanderlustFilms",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=WanderlustFilms",
    bio: "Creating cinematic travel moments"
  },
  price: 299,
  duration: "0:30",
  resolution: "4K",
  tags: ["beach", "sunset", "nature", "relaxing"]
}

export default function VibePage({ params }: { params: { id: string } }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isRented, setIsRented] = useState(false)

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false)
    setIsRented(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Preview Section */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
              {/* Replace with actual video player */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${mockVibe.thumbnailUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {mockVibe.duration}
                  </Badge>
                  <Badge variant="outline" className="ml-2 mb-2">
                    {mockVibe.resolution}
                  </Badge>
                </div>
                {!isRented && (
                  <Button 
                    size="lg"
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    Rent for ₹{mockVibe.price}
                  </Button>
                )}
              </div>
            </div>

            {/* Vibe Details */}
            <div className="mt-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mockVibe.title}</h1>
                <p className="text-zinc-400">{mockVibe.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockVibe.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-zinc-400">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Creator Info & Related Vibes */}
          <div className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mockVibe.creator.avatarUrl} />
                  <AvatarFallback>CF</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{mockVibe.creator.nickname}</h3>
                  <p className="text-sm text-zinc-400">{mockVibe.creator.bio}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Follow Creator
              </Button>
            </Card>

            <div>
              <h3 className="text-lg font-semibold mb-4">More like this</h3>
              <div className="space-y-4">
                {/* Add related vibes here */}
                <p className="text-zinc-400 text-sm">
                  Related vibes will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        vibeTitle={mockVibe.title}
        price={mockVibe.price}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  )
}

