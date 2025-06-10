"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"

interface FaceSwapEditorProps {
  onFaceSwapComplete: (swappedImageUrl: string) => void
}

export function FaceSwapEditor({ onFaceSwapComplete }: FaceSwapEditorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file")
        return
      }
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError("")
    }
  }

  const handleFaceSwap = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Simulate face swap processing with progress updates
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setProgress(i)
      }

      // TODO: Replace with actual face swap API call
      // Temporary, replace with actual swapped image URL
      if (previewUrl) {
        onFaceSwapComplete(previewUrl)
      } else {
        throw new Error("No preview image available")
      }
    } catch (err) {
      setError("Face swap failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Label htmlFor="face-image">Upload Your Photo</Label>
        <Input
          id="face-image"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isProcessing}
          className="bg-zinc-900/50 border-zinc-800"
        />
        <p className="text-sm text-zinc-400">
          For best results, use a clear front-facing photo
        </p>
      </div>

      {previewUrl && (
        <Card className="p-4 bg-zinc-900/50 border-zinc-800">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          </div>
        </Card>
      )}

      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-1" />
          <p className="text-sm text-center text-zinc-400">
            Processing face swap... {progress}%
          </p>
        </div>
      )}

      <Button
        onClick={handleFaceSwap}
        disabled={!selectedFile || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? "Processing..." : "Apply Face Swap"}
      </Button>

      <div className="text-xs text-zinc-500 text-center">
        Your photo will be automatically deleted after processing
      </div>
    </div>
  )
}
