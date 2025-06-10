"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Signup() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isCreator = searchParams.get("type") === "creator"

  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    const type = searchParams.get("type")
    if (type) {
      router.push(`/auth/login?type=${type}`)
    } else {
      router.push("/auth/login")
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const emailOrPhone = (document.getElementById("email") as HTMLInputElement)?.value
      if (!emailOrPhone) {
        setError("Please enter your email or phone number")
        return
      }

      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsOtpSent(true)
      setSuccess("OTP sent successfully! Please check your email or phone.")
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const otp = (document.getElementById("otp") as HTMLInputElement)?.value
      if (!otp) {
        setError("Please enter the OTP")
        return
      }

      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsOtpVerified(true)
      setSuccess("OTP verified successfully!")
    } catch (err) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const nickname = (document.getElementById("nickname") as HTMLInputElement)?.value
      const fullName = (document.getElementById("fullName") as HTMLInputElement)?.value
      
      if (!nickname || !fullName) {
        setError("Please fill in all fields")
        return
      }

      // Simulate signup
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/")
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <Card className="w-full max-w-md bg-black/50 backdrop-blur-lg border-zinc-800 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
            {isCreator ? "Become a Creator" : "Create Account"}
          </h1>
          <p className="text-zinc-400 mt-2">
            {isCreator
              ? "Start sharing your cinematic moments"
              : "Join to discover amazing vibes"}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="mb-6 bg-emerald-600 text-white">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={
          isOtpVerified ? handleSignup : isOtpSent ? handleVerifyOtp : handleSendOtp
        } className="space-y-6">
          {/* Step 1: Email/Phone Input */}
          {!isOtpSent && (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">Email or Phone</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or phone number"
                required
                className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500"
              />
            </div>
          )}

          {/* Step 2: OTP Input */}
          {isOtpSent && !isOtpVerified && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-zinc-200">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter the 6-digit OTP"
                  required
                  maxLength={6}
                  className="bg-zinc-900/50 border-zinc-800 text-white text-center text-2xl tracking-widest placeholder:text-zinc-500 placeholder:text-base placeholder:tracking-normal"
                />
              </div>
              <Button
                type="button"
                variant="link"
                className="text-emerald-400 hover:text-emerald-300 w-full"
                onClick={handleSendOtp}
                disabled={loading}
              >
                Resend OTP
              </Button>
            </div>
          )}

          {/* Step 3: User Details */}
          {isOtpVerified && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-zinc-200">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-zinc-200">Choose Nickname</Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Enter your nickname"
                  required
                  className="bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500"
                />
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-700" 
            size="lg"
            disabled={loading}
          >
            {loading ? "Please wait..." : 
              isOtpVerified ? "Create Account" :
              isOtpSent ? "Verify OTP" : 
              "Send OTP"}
          </Button>
        </form>

        {!isOtpSent && (
          <>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full hover:bg-zinc-800/50 transition-colors border-zinc-700"
                  size="lg"
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:bg-zinc-800/50 transition-colors border-zinc-700"
                  size="lg"
                >
                  Instagram
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400 mb-2">Already have an account?</p>
              <Button
                variant="link"
                className="text-emerald-400 hover:text-emerald-300 font-medium text-lg"
                onClick={handleLogin}
              >
                Log In
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
