"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Scroll, Sparkles, Eye, Flame } from "lucide-react"
import { useEffect, useState } from "react"

// // Mock data for the top 10 most sought-after ancient knowledge
// const ancientKnowledge = [
//   {
//     qid: "Q5",
//     title: "The Nature of Humanity",
//     description: "Ancient wisdom on the essence of human existence",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "2.1M seekers",
//     category: "Philosophy",
//     rarity: "Sacred",
//   },
//   {
//     qid: "Q42",
//     title: "The Chronicler Adams",
//     description: "Keeper of cosmic humor and universal truths",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.8M seekers",
//     category: "Chronicles",
//     rarity: "Legendary",
//   },
//   {
//     qid: "Q1",
//     title: "The Cosmic Tapestry",
//     description: "Ancient understanding of all existence",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.6M seekers",
//     category: "Cosmology",
//     rarity: "Divine",
//   },
//   {
//     qid: "Q11573",
//     title: "The Thinking Constructs",
//     description: "Ancient prophecies of artificial minds",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.4M seekers",
//     category: "Prophecy",
//     rarity: "Mystical",
//   },
//   {
//     qid: "Q7318",
//     title: "The Dark Empire",
//     description: "Chronicles of a fallen realm",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.3M seekers",
//     category: "History",
//     rarity: "Cursed",
//   },
//   {
//     qid: "Q5582",
//     title: "The Great Beginning",
//     description: "Ancient creation myths and cosmic birth",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.2M seekers",
//     category: "Creation",
//     rarity: "Sacred",
//   },
//   {
//     qid: "Q8142",
//     title: "The Art of Exchange",
//     description: "Ancient wisdom on trade and value",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.1M seekers",
//     category: "Commerce",
//     rarity: "Common",
//   },
//   {
//     qid: "Q5107",
//     title: "The Great Lands",
//     description: "Ancient maps of the world's foundations",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "1.0M seekers",
//     category: "Geography",
//     rarity: "Rare",
//   },
//   {
//     qid: "Q11660",
//     title: "The Mind Webs",
//     description: "Ancient understanding of thought networks",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "950K seekers",
//     category: "Mysticism",
//     rarity: "Arcane",
//   },
//   {
//     qid: "Q2539",
//     title: "The Learning Arts",
//     description: "Ancient methods of knowledge acquisition",
//     image: "/placeholder.svg?height=200&width=300",
//     views: "900K seekers",
//     category: "Wisdom",
//     rarity: "Sacred",
//   },
// ]

const ultraAncientGlyphs: string[] = [

  // Glagolitic (old Slavic alphabet)
  "Ⰰ","Ⰱ","Ⰲ","Ⰳ","Ⰴ","Ⰵ","Ⰶ","Ⰷ","Ⰸ","Ⰹ","Ⰺ","Ⰻ","Ⰼ","Ⰽ","Ⰾ","Ⰿ","Ⱀ","Ⱁ","Ⱂ","Ⱃ","Ⱄ","Ⱅ","Ⱆ","Ⱇ","Ⱈ","Ⱉ","Ⱊ","Ⱋ","Ⱌ","Ⱍ","Ⱎ","Ⱏ","Ⱐ","Ⱑ","Ⱒ","Ⱓ","Ⱔ","Ⱕ","Ⱖ","Ⱗ","Ⱘ","Ⱙ","Ⱚ","Ⱛ","Ⱜ","Ⱝ","Ⱞ","Ⱟ","ⰰ","ⰱ","ⰲ","ⰳ","ⰴ","ⰵ","ⰶ","ⰷ","ⰸ","ⰹ","ⰺ","ⰻ","ⰼ","ⰽ","ⰾ","ⰿ","ⱀ","ⱁ","ⱂ","ⱃ","ⱄ","ⱅ","ⱆ","ⱇ","ⱈ","ⱉ","ⱊ","ⱋ","ⱌ","ⱍ","ⱎ","ⱏ",
  // Runes
  "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ",
  // Greek
  "α", "β", "γ", "δ", "θ", "λ", "μ", "ξ", "π", "ρ", "σ", "φ", "ψ", "Ω",
  // Cyrillic
  "Ж", "Д", "Ѭ", "Ѳ", "Ѧ", "Ѱ", "Ю", "Я", "Ѣ", "Ъ", "Ѫ", "Җ",
  // Armenian
  "Ա", "Թ", "Ժ", "Խ", "Ծ", "Շ", "Չ", "Ճ", "Ջ",
  // Georgian (Mkhedruli)
  "Ⴀ", "Ⴁ", "Ⴂ", "Ⴃ", "Ⴄ", "Ⴅ", "Ⴆ", "Ⴇ", "Ⴈ", "Ⴉ", "Ⴊ", "Ⴋ",
  // Glagolitic
  "Ⰰ", "Ⰱ", "Ⰲ", "Ⰳ", "Ⰴ", "Ⰵ", "Ⰶ", "Ⰷ", "Ⰸ", "Ⰹ", "Ⰺ", "Ⰻ", "Ⰼ",
  // Miscellaneous ancient/occult-style
  "☥", "✶", "☯", "♆", "♄", "☽", "✡", "⚚",
  // Lycian
  "𐊣","𐊤","𐊥","𐊦","𐊧","𐊨","𐊩","𐊪","𐊫","𐊬","𐊭","𐊮","𐊯","𐊰","𐊱","𐊲","𐊳","𐊴","𐊵","𐊶","𐊷","𐊸","𐊹","𐊺","𐊻","𐊼","𐊽","𐊾","𐊿","𐋀","𐋁","𐋂","𐋃","𐋄","𐋅","𐋆","𐋇","𐋈","𐋉","𐋊","𐋋","𐋌","𐋍","𐋎","𐋏",
  // Egyptian Hieroglyphs (just a few representative ones; Unicode block contains 1,070+ signs) :contentReference[oaicite:1]{index=1}
  "𓀀","𓁐","𓂀","𓃀","𓄿","𓅓","𓆣",
  // Linear A / Linear B
  "𐘀","𐘁","𐘂","𐝀","𐝁","𐝂",
  // Gothic / Ugaritic / Old Persian / Shavian etc.
  "𐌰","𐌱","𐌲","𐌳","𐌴", // Gothic
  "𐎀","𐎁","𐎂","𐎃","𐎄", // Ugaritic
  "𐑀","𐑁","𐑂","𐑐","𐑄" // Shavian / Osmanya
];

const gemColors = [
  { color: "#DC2626", name: "Ruby" }, // Red
  { color: "#059669", name: "Emerald" }, // Green
  { color: "#2563EB", name: "Sapphire" }, // Blue
  { color: "#7C3AED", name: "Amethyst" }, // Purple
  { color: "#D97706", name: "Topaz" }, // Orange
  { color: "#0891B2", name: "Aquamarine" }, // Cyan
  { color: "#DC2626", name: "Ruby" }, // Red (repeat)
  { color: "#059669", name: "Emerald" }, // Green (repeat)
  { color: "#2563EB", name: "Sapphire" }, // Blue (repeat)
  { color: "#7C3AED", name: "Amethyst" }, // Purple (repeat)
]

const rarityColors = {
  Common: "from-amber-600 to-yellow-600",
  Rare: "from-blue-600 to-indigo-600",
  Sacred: "from-purple-600 to-violet-600",
  Legendary: "from-orange-600 to-red-600",
  Mystical: "from-emerald-600 to-teal-600",
  Arcane: "from-pink-600 to-rose-600",
  Divine: "from-yellow-400 to-amber-400",
  Cursed: "from-red-800 to-black",
}

// Shiny Gem SVG Component
const ShinyGem = ({ color, number }: { color: string; number: number }) => (
  <div className="relative">
    <svg width="60" height="60" viewBox="0 0 60 60">
      <defs>
        <linearGradient id={`gemGradient${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="70%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
        <filter id={`gemGlow${number}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main gem shape */}
      <polygon
        points="30,5 45,20 40,45 20,45 15,20"
        fill={`url(#gemGradient${number})`}
        stroke="#ffffff"
        strokeWidth="1"
        filter={`url(#gemGlow${number})`}
      />

      {/* Top facet */}
      <polygon points="30,5 37,15 23,15" fill="#ffffff" opacity="0.6" />

      {/* Left facet */}
      <polygon points="15,20 23,15 20,35" fill={color} opacity="0.4" />

      {/* Right facet */}
      <polygon points="45,20 37,15 40,35" fill="#ffffff" opacity="0.3" />

      {/* Center highlight */}
      <ellipse cx="30" cy="25" rx="8" ry="12" fill="#ffffff" opacity="0.4" />
    </svg>

    {/* Number overlay */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-white font-bold text-lg drop-shadow-lg">{number}</span>
    </div>
  </div>
)

type Article = {
  qid: string
  title: string
  description: string
  image: string
  views: string
  category: string
  rarity: string
  lastUpdated: string
  infobox: Record<string, string>
  content: string
}

export default function HomePage() {

  const [ancientKnowledge, setAncientKnowledge] = useState<Article[]>([])

  useEffect(() => {
    const fetchTopItems = async () => {
      const qids = [
        "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"
      ]
      const results = await Promise.all(
        qids.map(async (qid) => {
          const res = await fetch(`/api/items/${qid}`)
          const data = await res.json()
          return {
            qid,
            title: data.label || "Unknown Title",
            description: data.description || "No description available",
            image: data.image || "/placeholder.svg?height=200&width=300",
            views: data.views || `${(Math.random() * 2 + 0.9).toFixed(1)}M seekers`,
            category: data.category || "Unknown",
            rarity: data.rarity || "Common",
            lastUpdated: data.lastUpdated || "N/A",
            infobox: data.infobox || {},
            content: data.content || "N/A"
          }
        })
      )
      setAncientKnowledge(results)
    }

    fetchTopItems()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gleaming Dust Particles */}
        <div className="floating-particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="particle gleaming-dust"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Ancient Runes Background */}
        <div className="ancient-runes">
          {ultraAncientGlyphs.map((rune, i) => (
            <div
              key={i}
              className="floating-rune"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {rune}
            </div>
          ))}
        </div>

        {/* Mystical Orbs */}
        <div className="mystical-orbs">
          {[...Array(Math.floor(Math.random() * (15 - 5 + 1) + 5))].map((_, i) => (
            <div
              key={i}
              className="mystical-orb"
              style={{
                left: `${20 + i * 20}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Magical Energy Streams */}
        <div className="energy-streams">
          {[...Array(Math.floor(Math.random() * (8 - 5 + 1) + 5))].map((_, i) => (
            <div
              key={i}
              className="energy-stream"
              style={{
                left: `${20 + i * 20}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-amber-700/30 bg-gradient-to-r from-amber-900/80 via-stone-900/80 to-amber-900/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-amber-400 animate-pulse-glow" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-400 rounded-full animate-ping" />
                <Sparkles className="absolute -bottom-1 -left-1 h-4 w-4 text-yellow-300 animate-twinkle" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent animate-shimmer">
                Veracity Vault
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-amber-300">
              <Scroll className="h-4 w-4 animate-bounce" />
              <span className="animate-fade-in">Your Wisdom Repository</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-transparent to-purple-900/20" />

        {/* Animated Scroll Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="scroll-animation" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 relative">
              <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-300 bg-clip-text text-transparent animate-text-glow">
                Top 10 Articles of the Day
              </h2>

              {/* Floating Ancient Symbols */}
              {/* <div className="absolute -top-4 left-1/4 animate-float">
                <span className="text-4xl text-amber-400/60">☥</span>
              </div>
              <div className="absolute -top-8 right-1/3 animate-float-delayed">
                <span className="text-3xl text-yellow-400/60">⚡</span>
              </div>
              <div className="absolute top-0 right-1/4 animate-float-slow">
                <span className="text-5xl text-amber-300/40">✦</span>
              </div> */}

              {/* Magical Constellation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="magical-star"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  >
                    ✦
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl text-amber-200 mb-8 leading-relaxed animate-fade-in-up">
              Discover the most coveted scrolls in our mystical repository. Each tome represents millennia of
              accumulated wisdom, guarded by ancient spirits and revealed to worthy seekers.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-amber-300">
              <div className="flex items-center gap-2 animate-pulse-soft">
                <Flame className="h-4 w-4 text-orange-400 animate-flicker" />
                <span>Living Archives</span>
              </div>
              <div className="flex items-center gap-2 animate-pulse-soft" style={{ animationDelay: "0.5s" }}>
                <Eye className="h-4 w-4 text-purple-400 animate-blink" />
                <span>Mystical Insights</span>
              </div>
              <div className="flex items-center gap-2 animate-pulse-soft" style={{ animationDelay: "1s" }}>
                <BookOpen className="h-4 w-4 text-amber-400 animate-book-flip" />
                <span>Sacred Knowledge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Grid */}
      <section className="py-12 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ancientKnowledge.map((knowledge, index) => (
              <Link key={knowledge.qid} href={`/article/${knowledge.qid}`} className="group relative">
                <div className="ancient-scroll-card-animated">
                  {/* Left scroll roll */}
                  <div className="scroll-roll scroll-roll-left">
                    <div className="scroll-roll-inner"></div>
                  </div>

                  {/* Right scroll roll */}
                  <div className="scroll-roll scroll-roll-right">
                    <div className="scroll-roll-inner"></div>
                  </div>

                  {/* Main scroll content */}
                  <div className="scroll-content-area">
                    {/* Shiny Gem Number */}
                    <div className="absolute top-4 left-4 z-20">
                      <ShinyGem color={gemColors[index].color} number={index + 1} />
                    </div>

                    {/* Rarity Badge */}
                    <div className="absolute top-4 right-4 z-20 bg-amber-100/90 backdrop-blur-sm text-amber-900 text-xs px-2 py-1 rounded-md border border-amber-600/50 font-semibold">
                      {knowledge.rarity}
                    </div>

                    {/* Floating Sparkles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="absolute h-3 w-3 text-amber-600/60 animate-twinkle"
                          style={{
                            top: `${30 + i * 25}%`,
                            left: `${15 + i * 20}%`,
                            animationDelay: `${i * 0.7}s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Image */}
                    <div className="relative h-40 overflow-hidden rounded-lg mx-4 mt-16 mb-4 border border-amber-700/30">
                      <img
                        src={knowledge.image || "/old-paper.jpg"}
                        alt={knowledge.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ancient-sepia"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4 relative">
                      <h3 className="text-lg font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                        {knowledge.title}
                      </h3>
                      <p className="text-amber-800 text-sm mb-4 line-clamp-2">{knowledge.description}</p>

                      {/* Stats with Icons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-700 text-sm">
                          <Eye className="h-4 w-4 animate-blink" />
                          <span>{knowledge.views}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-amber-700 group-hover:translate-x-2 group-hover:text-amber-600 transition-all duration-300" />
                      </div>

                      {/* Category with Ancient Symbol */}
                      <div className="mt-3 flex items-center gap-2 text-xs text-amber-600">
                        <span className="animate-pulse">⚜</span>
                        <span>{knowledge.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scroll strings/ties */}
                  <div className="scroll-string scroll-string-left"></div>
                  <div className="scroll-string scroll-string-right"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ancient Wisdom Quote Section */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <span className="text-6xl text-amber-400/30 animate-float">❝</span>
            </div>
            <blockquote className="text-2xl italic text-amber-200 mb-6 animate-fade-in-up">
              `&quot;`Knowledge is the light that illuminates the darkness of ignorance, passed down through the ages like
              sacred flame.`&quot;`
            </blockquote>
            <cite className="text-amber-400 animate-shimmer">— Ancient Proverb</cite>
          </div>
        </div>
      </section>

      {/* Footer with Big Opened Book */}
      <footer className="border-t border-amber-700/30 bg-gradient-to-r from-amber-900/80 via-stone-900/80 to-amber-900/80 backdrop-blur-sm mt-16 relative z-10 overflow-hidden">
        {/* Big Opened Book */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
          <div className="opened-book">
            <div className="book-spine"></div>
            <div className="book-page book-page-left">
              <div className="page-content">
                <div className="page-lines">
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                </div>
              </div>
            </div>
            <div className="book-page book-page-right">
              <div className="page-content">
                <div className="page-lines">
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                  <div className="page-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8 relative z-10">
          <div className="text-center text-stone-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Scroll className="h-4 w-4 animate-bounce" />
              <p>Guarded by Ancient Spirits • Blessed by the Keepers of Wisdom</p>
              <Scroll className="h-4 w-4 animate-bounce" style={{ animationDelay: "0.5s" }} />
            </div>
            <p className="text-sm">Sacred knowledge updated with each passing moon</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
