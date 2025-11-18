'use client'

interface AdBoxProps {
  position: 'top' | 'bottom'
}

export default function AdBox({ position }: AdBoxProps) {
  return (
    <div className={`w-full ${position === 'top' ? 'mb-4' : 'mt-4'}`}>
      <div className="glass-morphism rounded-2xl p-6 border-2 border-white/30 shadow-lg">
        <div className="text-center space-y-2">
          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Advertisement
          </div>
          <div className="h-24 flex items-center justify-center">
            <p className="text-gray-500 italic">Ad space 📢</p>
          </div>
          <div className="text-xs text-gray-400">
            Your wholesome ad could be here
          </div>
        </div>
      </div>
    </div>
  )
}
