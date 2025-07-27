import Link from "next/link"
import { ArrowLeft, BookOpen, Search, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center max-w-md mx-auto px-6 relative z-10">
        <div className="mb-8 relative">
          <BookOpen className="h-24 w-24 text-amber-400 mx-auto mb-4 opacity-60 animate-book-flip" />
          <Sparkles className="absolute top-0 right-1/3 h-6 w-6 text-yellow-300 animate-twinkle" />
          <Sparkles
            className="absolute bottom-4 left-1/3 h-4 w-4 text-amber-400 animate-twinkle"
            style={{ animationDelay: "1s" }}
          />

          <h1 className="text-6xl font-bold text-amber-400 mb-4 animate-text-glow">404</h1>
          <h2 className="text-2xl font-semibold text-amber-200 mb-4">Sacred Knowledge Lost</h2>

          <p className="text-stone-400 mb-8 leading-relaxed">
            The ancient scroll you seek has been lost to time, or perhaps the mystical pathways have shifted. Even the
            wisest keepers cannot locate this particular wisdom.
          </p>
        </div>

        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-1 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Return to the Vault
          </Link>

          <div className="flex items-center justify-center gap-2 text-stone-400 text-sm">
            <Search className="h-4 w-4 animate-pulse" />
            <span>Perhaps seek related ancient wisdom instead</span>
          </div>

          {/* Ancient Quote */}
          <div className="mt-8 p-4 bg-stone-800/40 rounded-lg border border-amber-700/30 backdrop-blur-sm">
            <blockquote className="text-amber-300 italic text-sm">
              `&quot;`Not all knowledge is meant to be found at once. Sometimes the journey of seeking is more valuable than
              the destination.`&quot;`
            </blockquote>
            <cite className="text-stone-500 text-xs mt-2 block">— Ancient Proverb</cite>
          </div>
        </div>

        {/* Floating Ancient Symbols */}
        <div className="absolute -top-8 left-0 animate-float">
          <span className="text-3xl text-amber-400/20">⚜</span>
        </div>
        <div className="absolute top-0 right-0 animate-float-delayed">
          <span className="text-2xl text-yellow-400/20">✦</span>
        </div>
        <div className="absolute -bottom-4 right-1/4 animate-float-slow">
          <span className="text-4xl text-amber-300/15">☥</span>
        </div>
      </div>
    </div>
  )
}
