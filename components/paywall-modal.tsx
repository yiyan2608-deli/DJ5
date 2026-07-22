"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Lock, Crown, Coins, Check, Sparkles } from "lucide-react"
import type { Drama } from "@/lib/dramas"

type Props = {
  drama: Drama | null
  isLoggedIn: boolean
  onClose: () => void
  onCheckout: () => void
  onNeedAuth: () => void
}

const tiers = [
  {
    id: "episode",
    icon: Coins,
    name: "Unlock This Episode",
    price: "30 Coins",
    desc: "Instantly watch this episode.",
  },
  {
    id: "season",
    icon: Sparkles,
    name: "Unlock Full Season",
    price: "480 Coins",
    desc: "All episodes of this drama.",
    highlight: true,
  },
  {
    id: "vip",
    icon: Crown,
    name: "Go VIP",
    price: "From $11.99",
    desc: "Unlimited access to every drama.",
  },
]

export function PaywallModal({ drama, isLoggedIn, onClose, onCheckout, onNeedAuth }: Props) {
  useEffect(() => {
    if (!drama) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [drama, onClose])

  if (!drama) return null

  const handleSelect = () => {
    if (!isLoggedIn) {
      onNeedAuth()
      return
    }
    onCheckout()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-overlay-fade bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg animate-modal-pop overflow-hidden rounded-2xl border border-gold/20 bg-popover shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 transition hover:bg-black/70 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Poster header */}
        <div className="relative flex items-end gap-4 overflow-hidden p-5">
          <div className="absolute inset-0 -z-0">
            <Image src={drama.poster || "/placeholder.svg"} alt="" fill className="object-cover blur-xl opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-popover via-popover/80 to-popover/40" />
          </div>
          <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10">
            <Image src={drama.poster || "/placeholder.svg"} alt={drama.title} fill className="object-cover" />
          </div>
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase text-black">
              <Lock className="h-3 w-3" />
              Premium Content
            </span>
            <h2 className="mt-2 font-display text-xl font-bold leading-tight text-balance">{drama.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">VIP or Coins required to continue watching.</p>
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-2.5 px-5 pb-2">
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <button
                key={tier.id}
                onClick={handleSelect}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition ${
                  tier.highlight
                    ? "border-gold bg-gold/10 hover:bg-gold/15"
                    : "border-white/10 bg-white/5 hover:border-white/25"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    tier.highlight ? "bg-gold text-black" : "bg-white/10 text-gold"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{tier.name}</span>
                    {tier.highlight && (
                      <span className="rounded bg-gold px-1.5 py-0.5 text-[9px] font-bold text-black">
                        BEST VALUE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{tier.desc}</p>
                </div>
                <span className={`text-sm font-bold ${tier.highlight ? "text-gold" : "text-foreground"}`}>
                  {tier.price}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-2 px-5 pb-5 pt-3 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-gold" />
          Cancel anytime. Secure payment.
        </div>
      </div>
    </div>
  )
}
