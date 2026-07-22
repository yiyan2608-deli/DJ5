import { ChevronRight } from "lucide-react"
import type { Drama } from "@/lib/dramas"
import { DramaCard } from "@/components/drama-card"

export function DramaRow({
  title,
  emoji,
  dramas,
}: {
  title: string
  emoji?: string
  dramas: Drama[]
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold sm:text-2xl">
          {emoji && <span aria-hidden>{emoji}</span>}
          {title}
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-gold"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {dramas.map((drama) => (
          <DramaCard key={drama.id} drama={drama} />
        ))}
      </div>
    </section>
  )
}
