"use client"

import { useEffect, useState } from "react"
import { X, Mail, Lock, Flame, Eye, EyeOff } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  onLogin: (email: string) => void
}

export function AuthModal({ open, onClose, onLogin }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)

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

  if (!open) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    onLogin(email)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-overlay-fade bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md animate-modal-pop overflow-hidden rounded-2xl border border-white/10 bg-popover shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-7 pb-7 pt-9">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-black">
              <Flame className="h-6 w-6" fill="currentColor" />
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold">
              {mode === "login" ? "Welcome back" : "Join GoldReel"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to keep binge-watching."
                : "Create an account and get 20 bonus coins."}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 focus-within:border-gold/60">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 focus-within:border-gold/60">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="text-muted-foreground transition hover:text-foreground"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </label>

            {mode === "login" && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-muted-foreground hover:text-gold">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gold py-3 font-semibold text-black transition hover:brightness-110"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-white/10" />
            or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Google", "Apple", "TikTok"].map((provider) => (
              <button
                key={provider}
                onClick={() => onLogin(`${provider.toLowerCase()}@user.com`)}
                className="rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium transition hover:border-white/25 hover:bg-white/10"
              >
                {provider}
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to GoldReel?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold text-gold hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
