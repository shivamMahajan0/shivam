"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const EMOJI_LIST = [
  "❤️", "😊", "🌟", "✨", "🎉", "🌈", "🔥", "💫", "🌺", "🎵",
  "🌙", "☀️", "🌊", "🍃", "💕", "✌️", "🎨", "🎬", "📸", "🎭"
]

interface CaptionEmojiEditorProps {
  onUpdate: (caption: string, selectedEmojis: string[]) => void
}

export function CaptionEmojiEditor({ onUpdate }: CaptionEmojiEditorProps) {
  const [caption, setCaption] = useState("")
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])

  const handleEmojiToggle = (emoji: string) => {
    setSelectedEmojis(prev => {
      const newSelection = prev.includes(emoji)
        ? prev.filter(e => e !== emoji)
        : [...prev, emoji]
      onUpdate(caption, newSelection)
      return newSelection
    })
  }

  const handleCaptionChange = (value: string) => {
    setCaption(value)
    onUpdate(value, selectedEmojis)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="caption">Add Caption</Label>
        <Textarea
          id="caption"
          placeholder="Write something inspiring..."
          value={caption}
          onChange={(e) => handleCaptionChange(e.target.value)}
          className="bg-zinc-900/50 border-zinc-800 min-h-[100px]"
        />
        <p className="text-sm text-zinc-400">
          {caption.length}/280 characters
        </p>
      </div>

      <div className="space-y-4">
        <Label>Add Emojis</Label>
        <Card className="p-4 bg-zinc-900/50 border-zinc-800">
          <div className="grid grid-cols-10 gap-2">
            {EMOJI_LIST.map((emoji) => (
              <Button
                key={emoji}
                variant={selectedEmojis.includes(emoji) ? "default" : "outline"}
                className="h-10 w-10 p-0"
                onClick={() => handleEmojiToggle(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Label>Preview</Label>
        <Card className="p-4 bg-zinc-900/50 border-zinc-800">
          <p className="text-lg break-words">
            {caption} {selectedEmojis.join(" ")}
          </p>
        </Card>
      </div>
    </div>
  )
}

