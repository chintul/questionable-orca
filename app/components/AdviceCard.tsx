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
      <div className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pastel-pink/30 to-pastel-purple/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pastel-blue/30 to-pastel-mint/30 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Emoji */}
          <div className="text-center">
            <span className="text-7xl md:text-8xl animate-pop inline-block">
              {advice.emoji}
            </span>
          </div>

          {/* Advice Text */}
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
              {advice.text}
            </p>
          </div>

          {/* Divider */}
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-pastel-blue via-pastel-purple to-pastel-pink rounded-full" />
          </div>

          {/* Share Button */}
          <div className="flex justify-center">
            <button
              onClick={onShare}
              className="
                px-6 py-3 rounded-xl
                bg-gradient-to-r from-pastel-purple to-pastel-pink
                text-white font-semibold
                shadow-lg hover:shadow-xl
                transform hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              ✨ Share this chaos
            </button>
          </div>

          {/* Advice ID */}
          <div className="text-center text-sm text-gray-500">
            Wisdom #{advice.id}
          </div>
        </div>
      </div>
    </div>
  )
}
