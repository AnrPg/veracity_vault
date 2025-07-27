"use client"

import { BookOpen, Scroll, Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 text-amber-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="floating-particles">
          {[...Array(10)].map((_, i) => (
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

      <div className="text-center relative z-10">
        <div className="relative mb-8">
          <BookOpen className="h-20 w-20 text-amber-400 mx-auto animate-book-flip" />
          <div className="absolute -top-2 -right-2 h-6 w-6 bg-amber-400 rounded-full animate-ping" />
          <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-yellow-300 animate-twinkle" />
        </div>

        <h2 className="text-3xl font-bold text-amber-200 mb-4 animate-text-glow">Accessing Ancient Archives</h2>

        <div className="flex items-center justify-center gap-2 text-stone-400 mb-8">
          <Scroll className="h-4 w-4 animate-bounce" />
          <span className="animate-shimmer">The spirits are awakening the knowledge...</span>
        </div>

        {/* Ancient Loading Runes */}
        <div className="flex gap-4 justify-center mb-8">
          {["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ"].map((rune, i) => (
            <div
              key={i}
              className="text-2xl text-amber-400 animate-pulse-glow"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            >
              {rune}
            </div>
          ))}
        </div>

        {/* Mystical Progress Indicator */}
        <div className="w-64 h-2 bg-stone-800 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full animate-pulse"
            style={{ width: "60%", animation: "loading-progress 3s ease-in-out infinite" }}
          />
        </div>

        <p className="text-sm text-amber-400 mt-4 animate-fade-in">
          `&quot;`Patience, seeker. Ancient wisdom reveals itself to those who wait...`&quot;`
        </p>
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 80%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
