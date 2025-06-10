"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface ProfileMenuProps {
  nickname: string
  rentedVideosCount: number
  rentedPhotosCount: number
  onLogout: () => void
  onSettings: () => void
}

export function ProfileMenu({ nickname, rentedVideosCount, rentedPhotosCount, onLogout, onSettings }: ProfileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="/default-avatar.png" alt="User Avatar" />
            <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-black border border-zinc-800 p-2">
        <div className="px-4 py-2 border-b border-zinc-700">
          <p className="text-sm font-semibold text-white">{nickname}</p>
          <p className="text-xs text-zinc-400 mt-1">Rented Videos: {rentedVideosCount}</p>
          <p className="text-xs text-zinc-400">Rented Photos: {rentedPhotosCount}</p>
        </div>
        <DropdownMenuItem onClick={onSettings}>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
