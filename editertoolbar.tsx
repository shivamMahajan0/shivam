"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EditorToolbarProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function EditorToolbar({ activeTab, onTabChange }: EditorToolbarProps) {
  return (
    <div className="border-b border-zinc-800 pb-4">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="bg-zinc-900/50 border-zinc-800">
          <TabsTrigger value="face-swap">Face Swap</TabsTrigger>
          <TabsTrigger value="captions">Captions & Emojis</TabsTrigger>
          <TabsTrigger value="filters">Mood Filters</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
