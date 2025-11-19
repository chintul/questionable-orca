'use client'

import { useState, useEffect, useRef } from 'react'
import OrcaMascot from './components/OrcaMascot'
import AdviceCard from './components/AdviceCard'
import Toast from './components/Toast'
import Confetti from './components/Confetti'

interface Advice {
  id: number
  text: string
  emoji: string
}

type OrcaMood = 'happy' | 'unimpressed' | 'chaotic' | 'sleepy' | 'hyped'

export default function Home() {
  const [advice, setAdvice] = useState<Advice | null>(null)
  const [allAdvice, setAllAdvice] = useState<Advice[]>([])
  const [showToast, setShowToast] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [orcaAnimation, setOrcaAnimation] = useState(false)
  const [orcaMood, setOrcaMood] = useState<OrcaMood>('happy')

  // Juice & Effects
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(false)
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [clicks, setClicks] = useState(0)

  const comboTimeout = useRef<NodeJS.Timeout>()
  const mainRef = useRef<HTMLDivElement>(null)

  // Load advice
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

  // Cursor trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (combo > 5) {
        const trail = document.createElement('div')
        trail.className = 'cursor-trail'
        trail.style.left = `${e.clientX}px`
        trail.style.top = `${e.clientY}px`
        document.body.appendChild(trail)
        setTimeout(() => trail.remove(), 500)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [combo])

  // Combo system
  useEffect(() => {
    if (combo > 0) {
      setShowCombo(true)
      clearTimeout(comboTimeout.current)
      comboTimeout.current = setTimeout(() => {
        setCombo(0)
        setShowCombo(false)
      }, 2000)
    }
  }, [combo])

  const playSound = (type: 'click' | 'combo' | 'mega') => {
    if (!soundEnabled) return
    // Simple beep using Web Audio API
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    if (type === 'click') {
      osc.frequency.value = 440
      gain.gain.value = 0.1
    } else if (type === 'combo') {
      osc.frequency.value = 660
      gain.gain.value = 0.15
    } else {
      osc.frequency.value = 880
      gain.gain.value = 0.2
    }

    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  }

  const getRandomMood = (): OrcaMood => {
    const moods: OrcaMood[] = ['happy', 'unimpressed', 'chaotic', 'sleepy', 'hyped']
    return moods[Math.floor(Math.random() * moods.length)]
  }

  const getRandomAdvice = () => {
    if (allAdvice.length === 0) return

    setClicks(prev => prev + 1)

    // Combo system
    const newCombo = combo + 1
    setCombo(newCombo)

    // Trigger effects based on combo
    if (newCombo % 5 === 0) {
      setFlash(true)
      setTimeout(() => setFlash(false), 300)
      playSound('mega')
    } else if (newCombo % 3 === 0) {
      playSound('combo')
    } else {
      playSound('click')
    }

    // Screen shake for high combos
    if (newCombo > 3) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }

    // Random orca mood
    setOrcaMood(getRandomMood())

    // Trigger orca animation
    setOrcaAnimation(true)
    setTimeout(() => setOrcaAnimation(false), 1000)

    // Get random advice
    const randomIndex = Math.floor(Math.random() * allAdvice.length)
    const newAdvice = allAdvice[randomIndex]
    setAdvice(newAdvice)

    // Show confetti on combos
    if (newCombo > 2) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }

    // Show toast
    const messages = [
      'Wisdom deployed! 🐳',
      'Chaos delivered! ✨',
      'Big brain time! 🧠',
      'Orca approved! 💯',
      'This one hits different! 🎯'
    ]
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const copyToClipboard = async () => {
    if (!advice) return

    const text = `${advice.emoji} ${advice.text}\n\n— Little Orca's Questionable Wisdom 🐳✨`

    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <main ref={mainRef} className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${shake ? 'shake' : ''}`}>
      {/* Flash Effect */}
      {flash && <div className="flash" />}

      {/* Combo Counter */}
      {showCombo && combo > 2 && (
        <div className="combo-badge">
          🔥 {combo}x COMBO
        </div>
      )}

      {/* Sound Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-4 left-4 z-50 p-3 glass-morphism rounded-full hover:neon-glow transition-all button-juice"
        title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Stats */}
      <div className="fixed top-4 left-20 z-50 p-3 glass-morphism rounded-2xl text-sm">
        <div className="text-white/70">Wisdom Received: <span className="text-white font-bold">{clicks}</span></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-8 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black neon-text text-shadow-hard">
            Little Orca's
          </h1>
          <h2 className="text-5xl md:text-7xl font-black text-white text-shadow-hard">
            Questionable Wisdom
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-semibold">
            Chaotic life advice • Unhinged energy • Zero guarantees 🐳
          </p>
        </div>

        {/* Orca Mascot */}
        <OrcaMascot isAnimating={orcaAnimation} />

        {/* Advice Card */}
        {advice && (
          <AdviceCard
            advice={advice}
            onShare={copyToClipboard}
          />
        )}

        {/* Main Button */}
        <button
          onClick={getRandomAdvice}
          disabled={isLoading}
          className={`
            px-10 py-5 text-2xl md:text-3xl font-black rounded-2xl
            neon-border glass-morphism text-white
            button-juice disabled:opacity-50 disabled:cursor-not-allowed
            hover:neon-glow
            ${!advice ? 'animate-bounce-gentle' : ''}
          `}
        >
          {isLoading ? '🌊 Loading...' : advice ? '🔥 MORE CHAOS' : '✨ HIT ME'}
        </button>

        {/* Mood Indicator */}
        {advice && (
          <div className="text-center text-white/50 text-sm">
            Orca Mood: <span className="capitalize font-bold text-white">{orcaMood}</span> {orcaMood === 'chaotic' && '🌀'}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-white/50 text-sm mt-8 space-y-1">
          <p className="font-bold">Made with chaos by Little Orca 🐳</p>
          <p className="text-xs">Advice quality: questionable • Vibes: immaculate</p>
        </div>
      </div>

      {/* Toast */}
      {showToast && <Toast message={advice ? 'Copied to clipboard! 📋' : 'Wisdom delivered! 🐳'} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </main>
  )
}
