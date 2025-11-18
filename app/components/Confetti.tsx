'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  emoji: string
  x: number
  y: number
  rotation: number
  duration: number
  delay: number
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const emojis = ['✨', '🌟', '💫', '⭐', '🌈', '💜', '💙', '💖', '🐳', '🎉']
    const newParticles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 0.5,
      })
    }

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-fade-in"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `fall ${particle.duration}s ease-in ${particle.delay}s forwards`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
