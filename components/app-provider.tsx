"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Drama } from "@/lib/dramas"
import { AuthModal } from "@/components/auth-modal"
import { PaywallModal } from "@/components/paywall-modal"
import { RechargeModal } from "@/components/recharge-modal"

type User = { name: string; email: string } | null

type AppContextValue = {
  user: User
  login: (email: string) => void
  logout: () => void
  coins: number
  isVip: boolean
  openAuth: () => void
  openRecharge: () => void
  requirePlay: (drama: Drama) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [coins, setCoins] = useState(0)
  const [isVip, setIsVip] = useState(false)

  const [authOpen, setAuthOpen] = useState(false)
  const [rechargeOpen, setRechargeOpen] = useState(false)
  const [paywallDrama, setPaywallDrama] = useState<Drama | null>(null)

  const login = useCallback((email: string) => {
    setUser({ name: email.split("@")[0] || "Member", email })
    setCoins(20)
    setAuthOpen(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setCoins(0)
    setIsVip(false)
  }, [])

  const openAuth = useCallback(() => setAuthOpen(true), [])
  const openRecharge = useCallback(() => setRechargeOpen(true), [])

  const requirePlay = useCallback(
    (drama: Drama) => {
      if (drama.free || isVip) {
        // Simulate playing a free/unlocked title.
        return
      }
      setPaywallDrama(drama)
    },
    [isVip],
  )

  const completePurchase = useCallback(
    (payload: { vip?: boolean; coins?: number }) => {
      if (payload.vip) setIsVip(true)
      if (payload.coins) setCoins((c) => c + payload.coins!)
      setRechargeOpen(false)
      setPaywallDrama(null)
    },
    [],
  )

  return (
    <AppContext.Provider
      value={{ user, login, logout, coins, isVip, openAuth, openRecharge, requirePlay }}
    >
      {children}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={login} />

      <PaywallModal
        drama={paywallDrama}
        onClose={() => setPaywallDrama(null)}
        onNeedAuth={() => {
          setPaywallDrama(null)
          setAuthOpen(true)
        }}
        onCheckout={() => {
          if (!user) {
            setPaywallDrama(null)
            setAuthOpen(true)
            return
          }
          setPaywallDrama(null)
          setRechargeOpen(true)
        }}
        isLoggedIn={!!user}
      />

      <RechargeModal
        open={rechargeOpen}
        onClose={() => setRechargeOpen(false)}
        onComplete={completePurchase}
      />
    </AppContext.Provider>
  )
}
