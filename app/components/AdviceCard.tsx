'use client'

interface Advice {
  id: number
  text: string
  emoji: string
}

interface AdviceCardProps {
  advice: Advice
  onShare: () => void
}

export default function AdviceCard({ advice, onShare }: AdviceCardProps) {
  return (
    <div className="w-full max-w-2xl animate-slide-up">
      <div className="neon-border glass-morphism rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Neon Glow Effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}} />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Emoji */}
          <div className="text-center">
            <span className="text-8xl md:text-9xl animate-pop inline-block drop-shadow-2xl">
              {advice.emoji}
            </span>
          </div>

          {/* Advice Text */}
          <div className="text-center px-4">
            <p className="text-2xl md:text-4xl font-black text-white leading-relaxed text-shadow-hard">
              {advice.text}
            </p>
          </div>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="w-32 h-1 neon-glow rounded-full" style={{background: 'var(--gradient-neon)'}} />
          </div>

          {/* Share Button */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onShare}
              className="
                px-8 py-4 rounded-xl font-black text-lg
                neon-border glass-morphism text-white
                button-juice hover:neon-glow
              "
            >
              📋 COPY THIS
            </button>
          </div>

          {/* Advice ID */}
          <div className="text-center text-sm text-white/40 font-mono">
            WISDOM_ID: #{advice.id.toString().padStart(4, '0')}
          </div>
        </div>
      </div>
    </div>
  )
}
