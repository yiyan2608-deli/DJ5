"use client"

import Image from "next/image"
import { Play, Plus, Star, Eye } from "lucide-react"
import { featured, newReleases } from "@/lib/dramas"
import { useApp } from "@/components/app-provider"

export function Hero() {
  const { requirePlay } = useApp()
  const heroDrama = newReleases[0]

  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[70vh]">
        <Image
          src={featured.poster || "/placeholder.svg"}
          alt={featured.title}
          fill
          priority
          className="object-cover object-top"
        />
        {/* Gradients for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-16">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
                <Star className="h-3.5 w-3.5" fill="currentColor" />
                Featured Original
              </span>

              <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-balance sm:text-5xl">
                {featured.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold text-gold">
                  <Star className="h-4 w-4" fill="currentColor" />
                  {featured.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {featured.views}
                </span>
                <span>{featured.episodes} Episodes</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-foreground/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {featured.tagline}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => requirePlay(heroDrama)}
                  className="flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-black transition hover:brightness-110"
                >
                  <Play className="h-5 w-5" fill="currentColor" />
                  Play Now
                </button>
                <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/10">
                  <Plus className="h-5 w-5" />
                  My List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
