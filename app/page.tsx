import { AppProvider } from "@/components/app-provider"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { DramaRow } from "@/components/drama-row"
import { SiteFooter } from "@/components/site-footer"
import { newReleases, hot, mystery } from "@/lib/dramas"

export default function Page() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <DramaRow title="New Releases" dramas={newReleases} />
          <DramaRow title="Hot Now" emoji="🔥" dramas={hot} />
          <DramaRow title="Mystery Identity" emoji="🎭" dramas={mystery} />
        </main>
        <SiteFooter />
      </div>
    </AppProvider>
  )
}
