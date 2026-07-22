"use client"

import { useState } from "react"
import { Flame, Search, ChevronDown, Coins, Menu, X, Zap } from "lucide-react"
import { useApp } from "@/components/app-provider"

const NAV = ["Home", "Categories", "Fan Groups", "Ranking"]

export function SiteHeader() {
  const { user, logout, coins, isVip, openAuth, openRecharge } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-black">
            <Flame className="h-5 w-5" fill="currentColor" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Gold<span className="text-gold">Reel</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === 0 ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search dramas"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Language */}
          <button className="hidden items-center gap-1 rounded-full px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">
            English
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Recharge */}
          <button
            onClick={openRecharge}
            className="flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
          >
            <Zap className="h-4 w-4" fill="currentColor" />
            Recharge
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1.5 text-xs font-semibold text-gold sm:flex">
                <Coins className="h-3.5 w-3.5" />
                {coins}
              </span>
              <button
                onClick={logout}
                title={user.email}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold uppercase text-foreground transition hover:bg-white/20"
              >
                {user.name.charAt(0)}
              </button>
              {isVip && (
                <span className="hidden rounded-full bg-gold px-2 py-1 text-[10px] font-bold text-black sm:inline">
                  VIP
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
            >
              Login
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
