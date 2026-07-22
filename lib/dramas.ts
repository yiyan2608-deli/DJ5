export type Drama = {
  id: string
  title: string
  poster: string
  tags: string[]
  episodes: number
  views: string
  free: boolean
  badge?: string
}

export const featured = {
  id: "ceo-hidden-identity",
  title: "The CEO's Hidden Identity",
  poster: "/posters/hero-ceo.png",
  tagline: "He rules an empire by day. By night, he guards a secret that could destroy them both.",
  tags: ["CEO", "Secret Identity", "Romance"],
  episodes: 86,
  views: "12.4M",
  rating: 9.6,
}

export const newReleases: Drama[] = [
  {
    id: "hidden-identity",
    title: "The CEO's Hidden Identity",
    poster: "/posters/hidden-identity.png",
    tags: ["CEO", "Romance"],
    episodes: 86,
    views: "12.4M",
    free: true,
    badge: "NEW",
  },
  {
    id: "reborn-heiress",
    title: "The Reborn Heiress",
    poster: "/posters/reborn-heiress.png",
    tags: ["Rebirth", "Revenge"],
    episodes: 72,
    views: "9.1M",
    free: true,
    badge: "NEW",
  },
  {
    id: "billionaire-boss",
    title: "Married to My Billionaire Boss",
    poster: "/posters/billionaire-boss.png",
    tags: ["Office", "Marriage"],
    episodes: 64,
    views: "7.8M",
    free: false,
    badge: "NEW",
  },
  {
    id: "contract-marriage",
    title: "A Contract with Mr. Cold",
    poster: "/posters/contract-marriage.png",
    tags: ["Contract", "Slow Burn"],
    episodes: 58,
    views: "6.2M",
    free: false,
    badge: "NEW",
  },
]

export const hot: Drama[] = [
  {
    id: "divorced-wife",
    title: "Revenge of the Divorced Wife",
    poster: "/posters/divorced-wife.png",
    tags: ["Revenge", "Girlboss"],
    episodes: 90,
    views: "21.7M",
    free: false,
    badge: "HOT",
  },
  {
    id: "vampire-bodyguard",
    title: "My Vampire Bodyguard",
    poster: "/posters/vampire-bodyguard.png",
    tags: ["Vampire", "Fantasy"],
    episodes: 78,
    views: "15.3M",
    free: false,
    badge: "HOT",
  },
  {
    id: "alpha-bride",
    title: "The Alpha's Secret Bride",
    poster: "/posters/alpha-bride.png",
    tags: ["Werewolf", "Fated"],
    episodes: 82,
    views: "18.9M",
    free: false,
    badge: "HOT",
  },
  {
    id: "mr-right",
    title: "Trapped with Mr. Right",
    poster: "/posters/mr-right.png",
    tags: ["Rom-Com", "City"],
    episodes: 60,
    views: "11.0M",
    free: true,
    badge: "HOT",
  },
]

export const mystery: Drama[] = [
  {
    id: "royal-secret",
    title: "The Nanny's Royal Secret",
    poster: "/posters/royal-secret.png",
    tags: ["Hidden Royalty", "Drama"],
    episodes: 70,
    views: "8.4M",
    free: false,
    badge: "MYSTERY",
  },
  {
    id: "twin-swap",
    title: "Twin Swap: The Perfect Lie",
    poster: "/posters/twin-swap.png",
    tags: ["Identity Swap", "Thriller"],
    episodes: 66,
    views: "10.2M",
    free: false,
    badge: "MYSTERY",
  },
  {
    id: "hidden-identity-2",
    title: "The Heir Who Played Poor",
    poster: "/posters/hidden-identity.png",
    tags: ["Hidden Wealth", "Romance"],
    episodes: 74,
    views: "9.9M",
    free: false,
    badge: "MYSTERY",
  },
  {
    id: "contract-marriage-2",
    title: "Bride of the Masked Tycoon",
    poster: "/posters/contract-marriage.png",
    tags: ["Mystery", "Marriage"],
    episodes: 56,
    views: "5.7M",
    free: false,
    badge: "MYSTERY",
  },
]

export type VipPlan = {
  id: string
  name: string
  price: string
  original?: string
  note: string
  perks: string[]
  discount?: string
  highlight?: boolean
}

export const vipPlans: VipPlan[] = [
  {
    id: "weekly",
    name: "Weekly VIP",
    price: "$11.99",
    original: "$14.99",
    note: "First week $11.99, then $14.99/week. Cancel anytime.",
    perks: ["Unlimited watching", "1080p HD quality"],
    discount: "30% OFF",
    highlight: true,
  },
  {
    id: "monthly",
    name: "Monthly VIP",
    price: "$49.99",
    note: "Auto-renews. Cancel anytime.",
    perks: ["Unlimited watching", "1080p HD quality"],
  },
  {
    id: "yearly",
    name: "Yearly VIP",
    price: "$199.99",
    note: "Auto-renews. Cancel anytime.",
    perks: ["Unlimited watching", "1080p HD quality"],
  },
]

export type CoinPack = {
  id: string
  coins: number
  base: number
  bonus: number
  price: string
  bonusLabel: string
}

export const coinPacks: CoinPack[] = [
  { id: "c1", coins: 525, base: 500, bonus: 25, price: "$4.99", bonusLabel: "+5%" },
  { id: "c2", coins: 1100, base: 1000, bonus: 100, price: "$9.99", bonusLabel: "+10%" },
  { id: "c3", coins: 2400, base: 2000, bonus: 400, price: "$19.99", bonusLabel: "+20%" },
  { id: "c4", coins: 3900, base: 3000, bonus: 900, price: "$29.99", bonusLabel: "+30%" },
  { id: "c5", coins: 7500, base: 5000, bonus: 2500, price: "$49.99", bonusLabel: "+50%" },
  { id: "c6", coins: 20000, base: 10000, bonus: 10000, price: "$99.99", bonusLabel: "+100%" },
]
