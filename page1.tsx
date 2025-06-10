use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EditorToolbar } from "@/components/vibe/editor/EditorToolbar"
import { FaceSwapEditor } from "@/components/vibe/editor/FaceSwapEditor"
import { CaptionEmojiEditor } from "@/components/vibe/editor/CaptionEmojiEditor"
import { MoodFilterEditor } from "@/components/vibe/editor/MoodFilterEditor"

// Mock data - Replace with API call
const mockVibe = {
  id: "1",
  title: "Sunset Beach Walk",
  videoUrl: "https://example.com/video.mp4", // Replace with actual video URL
  thumbnailUrl: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg"
}

export default function VibeEditorPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("face-swap")
  const [editedVideo, setEditedVideo] = useState({
    faceSwapped: false,
    caption: "",
    emojis: [] as string[],
    filter: null as string | null
  })
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleFaceSwapComplete = (swappedImageUrl: string) => {
    setEditedVideo(prev => ({ ...prev, faceSwapped: true }))
  }

  const handleCaptionEmojiUpdate = (caption: string, emojis: string[]) => {
    setEditedVideo(prev => ({ ...prev, caption, emojis }))
  }

  const handleFilterSelect = (filterId: string) => {
    setEditedVideo(prev => ({ ...prev, filter: filterId }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")

    try {
      // TODO: Implement save logic
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      window.location.href = `/vibe/${params.id}/post`
    } catch (err) {
      setError("Failed to save changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Your Vibe</h1>
          <p className="text-zinc-400">
            Customize "{mockVibe.title}" with your personal touch
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                {/* Replace with actual video player */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mockVibe.thumbnailUrl})` }}
                />
              </div>
            </Card>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-32"
              >
                Back
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-32"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          {/* Editor Section */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <EditorToolbar
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="mt-6">
              {activeTab === "face-swap" && (
                <FaceSwapEditor onFaceSwapComplete={handleFaceSwapComplete} />
              )}
              {activeTab === "captions" && (
                <CaptionEmojiEditor onUpdate={handleCaptionEmojiUpdate} />
              )}
              {activeTab === "filters" && (
                <MoodFilterEditor onFilterSelect={handleFilterSelect} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
