"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - Replace with API call
const mockVibe = {
  id: "1",
  title: "Sunset Beach Walk",
  videoUrl: "https://example.com/video.mp4", // Replace with actual video URL
  thumbnailUrl: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
  duration: "0:30",
  resolution: "4K"
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("download")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [shareSuccess, setShareSuccess] = useState("")

  const handleDownload = async () => {
    setIsProcessing(true)
    setError("")

    try {
      // TODO: Implement download logic
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate download
      // Trigger download using actual video URL
      window.location.href = mockVibe.videoUrl
    } catch (err) {
      setError("Failed to download. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleShare = async (platform: string) => {
    setIsProcessing(true)
    setError("")
    setShareSuccess("")

    try {
      // TODO: Implement share logic
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate sharing
      setShareSuccess(`Successfully shared to ${platform}!`)
    } catch (err) {
      setError(`Failed to share to ${platform}. Please try again.`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Share Your Vibe</h1>
            <p className="text-zinc-400">
              Download or share your edited vibe directly to social media
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {shareSuccess && (
            <Alert className="mb-6 border-green-500/20 text-green-500">
              <AlertDescription>{shareSuccess}</AlertDescription>
            </Alert>
          )}

          <Card className="bg-zinc-900/50 border-zinc-800 p-6 mb-8">
            <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
              {/* Replace with actual video player */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${mockVibe.thumbnailUrl})` }}
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Badge variant="secondary">{mockVibe.duration}</Badge>
                <Badge variant="outline">{mockVibe.resolution}</Badge>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full bg-zinc-900/50 border-zinc-800">
                <TabsTrigger value="download">Download</TabsTrigger>
                <TabsTrigger value="share">Share</TabsTrigger>
              </TabsList>

              <TabsContent value="download" className="mt-6">
                <div className="text-center space-y-4">
                  <p className="text-zinc-400">
                    Download your edited vibe to share it manually
                  </p>
                  <Button
                    size="lg"
                    onClick={handleDownload}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Download Vibe"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="share" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleShare("Instagram")}
                    disabled={isProcessing}
                  >
                    Share to Instagram
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleShare("Snapchat")}
                    disabled={isProcessing}
                  >
                    Share to Snapchat
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => window.location.href = "/dashboard"}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
