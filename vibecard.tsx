"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface VibeCardProps {
  id: string
  title: string
  category: string
  emotion: string
  thumbnailUrl: string
  creator: {
    nickname: string
    avatarUrl: string
  }
  price: number
}

export function VibeCard({
  id,
  title,
  category,
  emotion,
  thumbnailUrl,
  creator,
  price,
}: VibeCardProps) {
  return (
    <Card className="group overflow-hidden bg-black/50 backdrop-blur-lg border-zinc-800 hover:border-zinc-700 transition-all">
      <div className="relative aspect-video overflow-hidden">
        {/* Thumbnail */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {category}
              </Badge>
              <h3 className="text-lg font-semibold text-white line-clamp-1">
                {title}
              </h3>
            </div>
            <Link href={`/vibe/${id}`}>
              <Button size="sm" className="shrink-0">
                Preview
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-6 h-6 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${creator.avatarUrl})` }}
            />
            <span className="text-sm text-zinc-400">{creator.nickname}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400/20">
              {emotion}
            </Badge>
            <span className="text-sm font-medium">₹{price}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
