import { Flame } from "lucide-react"

const columns = [
  { title: "Explore", links: ["Home", "Categories", "Ranking", "New Releases"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
  { title: "Support", links: ["Help Center", "Terms of Service", "Privacy Policy", "Refunds"] },
]

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-black">
              <Flame className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Gold<span className="text-gold">Reel</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Binge addictive vertical micro-dramas anytime, anywhere. New episodes dropping every day.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition hover:text-gold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} GoldReel. All rights reserved. For demo purposes only.
      </div>
    </footer>
  )
}
