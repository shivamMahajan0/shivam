"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const MOOD_FILTERS = [
  {
    id: "vintage",
    name: "Vintage",
    description: "Classic film-inspired look",
    preview: "https://images.pexels.com/photos/3023211/pexels-photo-3023211.jpeg"
  },
  {
    id: "dreamy",
    name: "Dreamy",
    description: "Soft, ethereal atmosphere",
    preview: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg"
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Hollywood-style color grading",
    preview: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg"
  },
  {
    id: "nightlife",
    name: "Nightlife",
    description: "Vibrant neon aesthetics",
    preview: "https://images.pexels.com/photos/1829189/pexels-photo-1829189.jpeg"
  },
  {
    id: "summer",
    name: "Summer",
    description: "Warm, sun-kissed tones",
    preview: "https://images.pexels.com/photos/1212600/pexels-photo-1212600.jpeg"
  },
  {
    id: "noir",
    name: "Noir",
    description: "Dramatic black & white",
    preview: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg"
  }
]

interface MoodFilterEditorProps {
  onFilterSelect: (filterId: string) => void
}

export function MoodFilterEditor({ onFilterSelect }: MoodFilterEditorProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId)
    onFilterSelect(filterId)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {MOOD_FILTERS.map((filter) => (
          <Card
            key={filter.id}
            className={`relative overflow-hidden cursor-pointer transition-all ${
              selectedFilter === filter.id
                ? "ring-2 ring-purple-500"
                : "hover:border-zinc-700"
            }`}
            onClick={() => handleFilterSelect(filter.id)}
          >
            <div className="aspect-video relative">
              <img
                src={filter.preview}
                alt={filter.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-semibold text-white mb-1">{filter.name}</h3>
                <p className="text-sm text-zinc-300">{filter.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedFilter && (
        <div className="text-center">
          <Badge variant="outline" className="text-purple-400 border-purple-400/20">
            {MOOD_FILTERS.find(f => f.id === selectedFilter)?.name} filter applied
          </Badge>
        </div>
      )}

      <div className="text-sm text-zinc-400 text-center">
        Click on a filter to preview and apply it to your vibe
      </div>
    </div>
  )
}
