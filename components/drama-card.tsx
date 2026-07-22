"use client"

import Image from "next/image"
import { Play, Lock, Eye } from "lucide-react"
import type { Drama } from "@/lib/dramas"
import { useApp } from "@/components/app-provider"

const badgeStyles: Record<string, string> = {
  NEW: "bg-emerald-500 text-black",
  HOT: "bg-red-500 text-white",
  MYSTERY: "bg-gold text-black",
}

export function DramaCard({ drama }: { drama: Drama }) {
  const { requirePlay, isVip } = useApp()
  const locked = !drama.free && !isVip

  return (
    <button
      onClick={() => requirePlay(drama)}
      className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-card text-left transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={drama.poster || "/placeholder.svg"}
          alt={drama.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

        {/* Badge */}
        {drama.badge && (
          <span
            className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              badgeStyles[drama.badge] ?? "bg-white text-black"
            }`}
          >
            {drama.badge}
          </span>
        )}

        {/* Lock indicator */}
        {locked && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-1 text-[10px] font-semibold text-gold backdrop-blur">
            <Lock className="h-3 w-3" />
            VIP
          </span>
        )}

        {/* Hover play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/95 text-black shadow-xl">
            {locked ? <Lock className="h-6 w-6" /> : <Play className="h-6 w-6" fill="currentColor" />}
          </span>
        </div>

        {/* Bottom meta */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white text-balance">
            {drama.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-white/70">
            <span>EP {drama.episodes}</span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {drama.views}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
