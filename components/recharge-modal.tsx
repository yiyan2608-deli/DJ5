"use client"

import { useEffect, useState } from "react"
import { X, Coins, CreditCard, Check, Crown } from "lucide-react"
import { vipPlans, coinPacks } from "@/lib/dramas"

type Props = {
  open: boolean
  onClose: () => void
  onComplete: (payload: { vip?: boolean; coins?: number }) => void
}

type Selection =
  | { type: "vip"; id: string }
  | { type: "coins"; id: string }

const paymentMethods = [
  { id: "quick", label: "Quick Pay", icon: "card" as const },
  { id: "gpay", label: "G Pay", icon: "text" as const },
  { id: "paypal", label: "PayPal", icon: "paypal" as const },
]

export function RechargeModal({ open, onClose, onComplete }: Props) {
  const [selection, setSelection] = useState<Selection>({ type: "coins", id: "c1" })
  const [payment, setPayment] = useState("quick")
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setDone(false)
      setProcessing(false)
    }
  }, [open])

  if (!open) return null

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setDone(true)
      setTimeout(() => {
        if (selection.type === "vip") {
          onComplete({ vip: true })
        } else {
          const pack = coinPacks.find((p) => p.id === selection.id)
          onComplete({ coins: pack?.coins ?? 0 })
        }
      }, 900)
    }, 1100)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
      <div className="absolute inset-0 animate-overlay-fade bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 my-4 w-full max-w-3xl animate-modal-pop overflow-hidden rounded-2xl border border-white/10 bg-popover shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-bold">Recharge</h2>
            <p className="text-xs text-muted-foreground">
              Upgrade to VIP for unlimited watching, or top up coins to unlock episodes instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>
            <h3 className="font-display text-2xl font-bold">Payment Successful</h3>
            <p className="text-sm text-muted-foreground">
              {selection.type === "vip"
                ? "Your VIP membership is now active. Enjoy unlimited dramas!"
                : "Coins added to your wallet. Happy watching!"}
            </p>
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
            {/* VIP plans */}
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-bold">
              <Crown className="h-4 w-4 text-gold" />
              VIP Membership
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {vipPlans.map((plan) => {
                const active = selection.type === "vip" && selection.id === plan.id
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelection({ type: "vip", id: plan.id })}
                    className={`relative overflow-hidden rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-gold bg-gold/10"
                        : "border-white/10 bg-gradient-to-b from-gold/10 to-transparent hover:border-gold/40"
                    }`}
                  >
                    {plan.discount && (
                      <span className="absolute right-0 top-0 rounded-bl-lg bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {plan.discount}
                      </span>
                    )}
                    <div className="text-sm font-semibold text-foreground/90">{plan.name}</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-display text-2xl font-extrabold text-gold">{plan.price}</span>
                      {plan.original && (
                        <span className="text-xs text-muted-foreground line-through">{plan.original}</span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{plan.note}</p>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                      {plan.perks.map((perk) => (
                        <span key={perk} className="flex items-center gap-1 text-[11px] text-foreground/80">
                          <Check className="h-3 w-3 text-gold" />
                          {perk}
                        </span>
                      ))}
                    </div>
                    {active && (
                      <span className="absolute bottom-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-black">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Coins */}
            <h3 className="mb-3 mt-6 flex items-center gap-2 font-display text-base font-bold">
              <Coins className="h-4 w-4 text-gold" />
              Buy Coins
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {coinPacks.map((pack) => {
                const active = selection.type === "coins" && selection.id === pack.id
                return (
                  <button
                    key={pack.id}
                    onClick={() => setSelection({ type: "coins", id: pack.id })}
                    className={`relative overflow-hidden rounded-xl border p-3.5 text-left transition ${
                      active ? "border-gold bg-gold/10" : "border-white/10 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    <span className="absolute right-0 top-0 rounded-bl-lg bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {pack.bonusLabel}
                    </span>
                    <div className="flex items-center gap-1.5 font-display text-lg font-bold text-gold">
                      <Coins className="h-4 w-4" />
                      {pack.coins.toLocaleString()}
                    </div>
                    <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      <div>Base: {pack.base.toLocaleString()}</div>
                      <div>Bonus: {pack.bonus.toLocaleString()}</div>
                    </div>
                    <div className="mt-2 text-sm font-bold text-foreground">{pack.price}</div>
                  </button>
                )
              })}
            </div>

            {/* Payment methods */}
            <h3 className="mb-3 mt-6 font-display text-base font-bold">Payment Method</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {paymentMethods.map((m) => {
                const active = payment === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-semibold transition ${
                      active ? "border-gold bg-gold/10 text-foreground" : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/25"
                    }`}
                  >
                    {m.icon === "card" && <CreditCard className="h-4 w-4" />}
                    {m.icon === "text" && <span className="font-bold text-blue-400">G</span>}
                    {m.icon === "paypal" && <span className="font-bold italic text-blue-400">PayPal</span>}
                    {m.icon !== "paypal" && m.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Footer / CTA */}
        {!done && (
          <div className="border-t border-white/10 px-6 py-4">
            <button
              onClick={handlePay}
              disabled={processing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-semibold text-black transition hover:brightness-110 disabled:opacity-70"
            >
              {processing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Processing...
                </>
              ) : (
                "Continue to Payment"
              )}
            </button>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-foreground">Subscription Details:</h4>
              <ol className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <span>1.</span>
                  <span>Within your active subscription period, you can watch all ReelGold series an unlimited number of times.</span>
                </li>
                <li className="flex gap-2">
                  <span>2.</span>
                  <span>Subscriptions auto-renew at the original price unless canceled. You will be charged within 24 hours before the current period ends.</span>
                </li>
                <li className="flex gap-2">
                  <span>3.</span>
                  <span>{'You can cancel your subscription anytime in the ReelGold app via "Settings" > "Subscription Management".'}</span>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
