"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  vibeTitle: string
  price: number
  onPaymentComplete: () => void
}

export function PaymentModal({
  isOpen,
  onClose,
  vibeTitle,
  price,
  onPaymentComplete,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError("")

    try {
      // TODO: Implement actual payment processing
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      onPaymentComplete()
    } catch (err) {
      setError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Rent this Vibe</DialogTitle>
          <DialogDescription className="text-zinc-400">
            You're about to rent "{vibeTitle}"
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="card">Card Number</Label>
            <Input
              id="card"
              placeholder="4242 4242 4242 4242"
              className="bg-zinc-900/50 border-zinc-800"
              disabled={isProcessing}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                className="bg-zinc-900/50 border-zinc-800"
                disabled={isProcessing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                className="bg-zinc-900/50 border-zinc-800"
                disabled={isProcessing}
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-400">Amount</span>
              <span className="text-lg font-semibold">₹{price}</span>
            </div>

            {isProcessing ? (
              <div className="space-y-2">
                <Progress value={66} className="h-1" />
                <p className="text-sm text-center text-zinc-400">
                  Processing your payment...
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full" size="lg">
                Pay ₹{price}
              </Button>
            )}
          </div>
        </form>

        <div className="text-center text-xs text-zinc-500 mt-4">
          Secured by Stripe. Your payment information is encrypted.
        </div>
      </DialogContent>
    </Dialog>
  )
}
