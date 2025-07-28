import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Eye, Scroll, Share, Star, Flame, Sparkles } from "lucide-react"
import { notFound } from "next/navigation"

interface Article {
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

// Mock ancient knowledge data
const ancientKnowledge: Record<string, Article> = {
  Q5: {
    qid: "5",
    title: "The Nature of Humanity",
    description: "Ancient wisdom on the essence of human existence",
    image: "/placeholder.svg?height=400&width=600",
    category: "Philosophy",
    views: "2.1M seekers",
    lastUpdated: "Last Moon Cycle",
    rarity: "Sacred",
    infobox: {
      "Ancient Name": "Homo Sapiens",
      Realm: "Earthly Domain",
      Element: "Earth & Spirit",
      "Sacred Number": "Seven",
      "Guardian Spirit": "The Wise Ancestor",
      "First Chronicle": "Dawn of Consciousness",
      "Sacred Geometry": "The Golden Ratio",
      "Mystical Properties": "Self-Awareness",
    },
    content: `
      <p>In the ancient scrolls of wisdom, humanity is described as the bridge between the earthly realm and the divine consciousness. The sacred texts speak of beings who walk upright, reaching toward the heavens while remaining rooted in the earth.</p>
      
      <h2>The Great Awakening</h2>
      <p>Legend tells of the moment when the first humans gained consciousness, described in the Chronicle of Awakening as "the spark of divine fire entering mortal clay." This transformation marked the beginning of wisdom-seeking and the eternal quest for knowledge.</p>
      
      <h2>Sacred Characteristics</h2>
      <p>The ancient texts describe humans as possessing the "Threefold Nature" - body of earth, mind of air, and spirit of fire. These elements combine to create beings capable of both creation and destruction, wisdom and folly.</p>
      
      <h2>The Eternal Quest</h2>
      <p>Human societies are bound by the Sacred Covenant - the eternal pursuit of knowledge, the preservation of wisdom, and the passing of understanding from one generation to the next through the mystical arts of teaching and learning.</p>
    `,
  },
  Q42: {
    qid: "42",
    title: "The Chronicler Adams",
    description: "Keeper of cosmic humor and universal truths",
    image: "/placeholder.svg?height=400&width=600",
    category: "Chronicles",
    views: "1.8M seekers",
    lastUpdated: "Previous Season",
    rarity: "Legendary",
    infobox: {
      Born: "Spring Equinox, Year of the Dragon",
      Ascended: "Beltane, Year of the Phoenix",
      "Sacred Realm": "The British Isles",
      "Divine Calling": "Keeper of Cosmic Jest",
      "Greatest Work": "The Traveler's Guide to All Realms",
      "Mystical Genre": "Sacred Comedy",
      "Place of Learning": "The Cambridge Sanctum",
      "Sacred Number": "Forty-Two",
    },
    content: `
      <p>The Chronicler Adams, known in the ancient texts as the Keeper of Cosmic Jest, was a legendary figure who possessed the rare gift of finding divine humor in the mysteries of existence. His scrolls blend profound wisdom with sacred laughter.</p>
      
      <h2>The Early Mysteries</h2>
      <p>Born under auspicious stars, Adams showed early signs of his mystical calling. The Cambridge Sanctum recognized his gift for weaving humor into the fabric of cosmic understanding, a talent blessed by the ancient spirits of mirth.</p>
      
      <h2>The Great Work</h2>
      <p>His masterpiece, "The Traveler's Guide to All Realms," began as whispered tales shared around sacred fires. These stories expanded into a great chronicle that spans multiple dimensions of reality, teaching profound truths through the sacred art of laughter.</p>
      
      <h2>The Sacred Number</h2>
      <p>Adams revealed the mystical significance of "Forty-Two" as the answer to the Great Question of existence. This number has since become a sacred symbol, representing the perfect balance between the serious and the absurd in the cosmic order.</p>
    `,
  },
}

interface PageProps {
  params: Promise<{ qid: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { qid } = await params
  const article = ancientKnowledge[qid]

  if (!article) {
    notFound()
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gleaming Dust Particles */}
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
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

        {/* Magical Aura Effects */}
        <div className="magical-auras">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="magical-aura"
              style={{
                left: `${25 + i * 25}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="ancient-manuscript-bg" />
      </div>

      {/* Header */}
      <header className="border-b border-amber-700/30 bg-gradient-to-r from-amber-900/80 via-stone-900/80 to-amber-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Return to Vault</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1 bg-stone-800/60 border border-amber-700/50 rounded-md hover:border-amber-500/70 transition-all hover:shadow-lg hover:shadow-amber-400/20 backdrop-blur-sm">
                <Share className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Share Wisdom</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1 bg-stone-800/60 border border-amber-700/50 rounded-md hover:border-amber-500/70 transition-all hover:shadow-lg hover:shadow-amber-400/20 backdrop-blur-sm">
                <Star className="h-4 w-4 animate-twinkle" />
                <span className="text-sm">Preserve</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8 relative">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 bg-gradient-to-r ${rarityColors[article.rarity as keyof typeof rarityColors]} text-white text-sm font-medium rounded-full animate-pulse-glow`}
                >
                  {article.rarity}
                </span>
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Eye className="h-4 w-4 animate-blink" />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{article.lastUpdated}</span>
                </div>
              </div>

              {/* Floating Ancient Symbols */}
              <div className="absolute -top-4 right-0 animate-float">
                <span className="text-3xl text-amber-400/40">⚜</span>
              </div>
              <div className="absolute top-8 right-12 animate-float-delayed">
                <span className="text-2xl text-yellow-400/30">✦</span>
              </div>

              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent animate-text-glow">
                {article.title}
              </h1>

              <p className="text-xl text-amber-200 mb-6 animate-fade-in-up">{article.description}</p>

              {/* Featured Image with Mystical Frame */}
              <div className="relative rounded-xl overflow-hidden mb-8 border-2 border-amber-700/40 ancient-frame">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 animate-border-glow" />
                <img
                  src={article.image || "/old-paper.jpg"}
                  alt={article.title}
                  className="w-full h-64 object-cover sepia-effect"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent" />

                {/* Floating Sparkles on Image */}
                {[...Array(5)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className="absolute h-4 w-4 text-amber-300/60 animate-twinkle"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.8}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-amber max-w-none ancient-text">
              <div
                className="text-stone-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Ancient Wisdom Notice */}
            <div className="mt-12 p-6 bg-gradient-to-r from-amber-900/40 via-stone-800/40 to-amber-900/40 border border-amber-700/40 rounded-xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-transparent to-amber-400/5 animate-mystical-overlay" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <BookOpen className="h-5 w-5 text-amber-400 animate-book-flip" />
                <h3 className="text-lg font-semibold text-amber-100">Ancient Wisdom Enhanced</h3>
                <Flame className="h-4 w-4 text-orange-400 animate-flicker" />
              </div>
              <p className="text-stone-400 text-sm relative z-10">
                This sacred knowledge has been blessed by the Ancient Spirits and enhanced through mystical
                cross-referencing with the Great Library. The wisdom contained herein is continuously updated by the
                Keepers of Knowledge.
              </p>
            </div>
          </div>

          {/* Sidebar with Sacred Infobox */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Sacred Infobox */}
              <div className="bg-gradient-to-br from-amber-900/60 via-stone-800/60 to-amber-800/60 border border-amber-700/40 rounded-xl p-6 mb-6 backdrop-blur-sm ancient-infobox relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-purple-600/10 animate-mystical-overlay" />

                <h3 className="text-lg font-semibold text-amber-100 mb-4 flex items-center gap-2 relative z-10">
                  <Scroll className="h-5 w-5 animate-bounce" />
                  Sacred Properties
                </h3>

                <div className="space-y-3 relative z-10">
                  {Object.entries(article.infobox).map(([key, value], index) => (
                    <div
                      key={key}
                      className="border-b border-amber-700/30 pb-2 last:border-b-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <dt className="text-sm font-medium text-amber-300 mb-1 flex items-center gap-1">
                        <span className="text-xs text-amber-500">⚜</span>
                        {key}
                      </dt>
                      <dd className="text-sm text-stone-300">{typeof value === 'string' ? value : String(value)}</dd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Sacred Knowledge */}
              <div className="bg-gradient-to-br from-amber-900/60 via-stone-800/60 to-amber-800/60 border border-amber-700/40 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-purple-600/5 animate-mystical-overlay" />

                <h3 className="text-lg font-semibold text-amber-100 mb-4 relative z-10 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 animate-pulse" />
                  Related Wisdom
                </h3>

                <div className="space-y-3 relative z-10">
                  <Link
                    href="/article/Q1"
                    className="block p-3 bg-stone-800/40 rounded-lg hover:bg-stone-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 group"
                  >
                    <div className="text-sm font-medium text-amber-300 group-hover:text-amber-200 flex items-center gap-2">
                      <span className="animate-pulse">⚡</span>
                      The Cosmic Tapestry
                    </div>
                    <div className="text-xs text-stone-400">Cosmology</div>
                  </Link>

                  <Link
                    href="/article/Q11573"
                    className="block p-3 bg-stone-800/40 rounded-lg hover:bg-stone-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 group"
                  >
                    <div className="text-sm font-medium text-amber-300 group-hover:text-amber-200 flex items-center gap-2">
                      <span className="animate-twinkle">✦</span>
                      The Thinking Constructs
                    </div>
                    <div className="text-xs text-stone-400">Prophecy</div>
                  </Link>

                  <Link
                    href="/article/Q5582"
                    className="block p-3 bg-stone-800/40 rounded-lg hover:bg-stone-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20 group"
                  >
                    <div className="text-sm font-medium text-amber-300 group-hover:text-amber-200 flex items-center gap-2">
                      <span className="animate-pulse">☥</span>
                      The Great Beginning
                    </div>
                    <div className="text-xs text-stone-400">Creation</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
