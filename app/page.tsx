'use client'

import { useState, useEffect } from 'react'
import OrcaMascot from './components/OrcaMascot'
import AdviceCard from './components/AdviceCard'
import Toast from './components/Toast'
import AdBox from './components/AdBox'
import Confetti from './components/Confetti'

interface Advice {
  id: number
  text: string
  emoji: string
}

export default function Home() {
  const [advice, setAdvice] = useState<Advice | null>(null)
  const [allAdvice, setAllAdvice] = useState<Advice[]>([])
  const [showToast, setShowToast] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [orcaAnimation, setOrcaAnimation] = useState(false)

  // Load advice on mount
  useEffect(() => {
    fetch('/advice.json')
      .then((res) => res.json())
      .then((data) => {
        setAllAdvice(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load advice:', error)
        setIsLoading(false)
      })
  }, [])

  const getRandomAdvice = () => {
    if (allAdvice.length === 0) return

    // Trigger orca animation
    setOrcaAnimation(true)
    setTimeout(() => setOrcaAnimation(false), 1000)

    // Get random advice
    const randomIndex = Math.floor(Math.random() * allAdvice.length)
    const newAdvice = allAdvice[randomIndex]

    setAdvice(newAdvice)

    // Show confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    // Show toast
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const shareAdvice = () => {
    if (advice) {
      console.log(`Sharing: ${advice.emoji} ${advice.text}`)
      alert('Chaos shared! (Check console for details)')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Top Ad */}
      <div className="w-full max-w-4xl mb-8">
        <AdBox position="top" />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-8 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-soft">
            Little Orca's
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white text-shadow-soft">
            Questionable Wisdom 🐳✨
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-medium">
            Chaotic but wholesome life advice from your favorite orca friend
          </p>
        </div>

        {/* Orca Mascot */}
        <OrcaMascot isAnimating={orcaAnimation} />

        {/* Advice Card */}
        {advice && (
          <AdviceCard
            advice={advice}
            onShare={shareAdvice}
          />
        )}

        {/* Main Button */}
        <button
          onClick={getRandomAdvice}
          disabled={isLoading}
          className={`
            px-8 py-4 text-xl md:text-2xl font-bold rounded-2xl
            bg-white/90 hover:bg-white text-purple-600
            shadow-2xl hover:shadow-3xl
            transform transition-all duration-300
            hover:scale-110 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            neumorphic
            ${!advice ? 'animate-bounce-gentle' : ''}
          `}
        >
          {isLoading ? '🌊 Loading...' : advice ? '✨ More Wisdom' : '✨ Give Me Wisdom'}
        </button>

        {/* Footer */}
        <div className="text-center text-white/70 text-sm mt-8">
          <p>Made with 💜 by Little Orca</p>
          <p className="text-xs mt-2">Advice quality not guaranteed. Chaos expected.</p>
        </div>
      </div>

      {/* Bottom Ad */}
      <div className="w-full max-w-4xl mt-8">
        <AdBox position="bottom" />
      </div>

      {/* Toast Notification */}
      {showToast && <Toast message="Orca delivered wisdom! ✨🐳" />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </main>
  )
}
