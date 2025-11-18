'use client'

interface OrcaMascotProps {
  isAnimating: boolean
}

export default function OrcaMascot({ isAnimating }: OrcaMascotProps) {
  return (
    <div className="relative">
      <div
        className={`
          transform transition-all duration-500
          ${isAnimating ? 'animate-pop rotate-12 scale-110' : 'animate-float'}
        `}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 relative">
          {/* Orca SVG */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            {/* Shadow */}
            <ellipse cx="100" cy="180" rx="60" ry="15" fill="rgba(0,0,0,0.1)" />

            {/* Tail */}
            <path
              d="M 140 120 Q 160 110 165 95 Q 170 105 165 115 Q 160 125 150 128 Z"
              fill="#2D3748"
              stroke="#1A202C"
              strokeWidth="2"
            />
            <path
              d="M 140 120 Q 160 110 165 95 Q 170 105 165 115 Q 160 125 150 128 Z"
              fill="url(#tailGradient)"
              opacity="0.3"
            />

            {/* Back Fin */}
            <path
              d="M 95 60 Q 90 35 95 25 Q 100 35 100 55 Z"
              fill="#2D3748"
              stroke="#1A202C"
              strokeWidth="2"
            />

            {/* Main Body */}
            <ellipse cx="90" cy="100" rx="55" ry="65" fill="#2D3748" stroke="#1A202C" strokeWidth="3" />

            {/* White Belly Oval */}
            <ellipse cx="85" cy="115" rx="35" ry="45" fill="white" />

            {/* White Belly Bottom Curve */}
            <path d="M 50 115 Q 85 145 120 115" fill="white" />

            {/* Side White Patches */}
            <ellipse cx="110" cy="85" rx="12" ry="18" fill="white" />
            <ellipse cx="55" cy="85" rx="8" ry="12" fill="white" />

            {/* Side Fins */}
            <path
              d="M 45 110 Q 20 110 15 125 Q 20 130 35 125 Q 45 120 47 115 Z"
              fill="#2D3748"
              stroke="#1A202C"
              strokeWidth="2"
            />
            <path
              d="M 45 110 Q 20 110 15 125 Q 20 130 35 125 Q 45 120 47 115 Z"
              fill="url(#finGradient)"
              opacity="0.3"
            />

            {/* Eyes */}
            {/* Left Eye Background */}
            <ellipse cx="70" cy="85" rx="14" ry="16" fill="white" />
            {/* Left Eye */}
            <ellipse cx="70" cy="85" rx="10" ry="12" fill="#1A202C" />
            <ellipse cx="72" cy="83" rx="4" ry="5" fill="white" />
            <circle cx="75" cy="86" r="2" fill="white" opacity="0.7" />

            {/* Right Eye Background */}
            <ellipse cx="105" cy="85" rx="14" ry="16" fill="white" />
            {/* Right Eye */}
            <ellipse cx="105" cy="85" rx="10" ry="12" fill="#1A202C" />
            <ellipse cx="107" cy="83" rx="4" ry="5" fill="white" />
            <circle cx="110" cy="86" r="2" fill="white" opacity="0.7" />

            {/* Cute Blush */}
            <ellipse cx="55" cy="100" rx="8" ry="5" fill="#F9C5D5" opacity="0.6" />
            <ellipse cx="120" cy="100" rx="8" ry="5" fill="#F9C5D5" opacity="0.6" />

            {/* Smile */}
            <path
              d="M 75 105 Q 87 112 100 105"
              stroke="#1A202C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Sparkles */}
            <g className={isAnimating ? 'animate-spin-slow' : ''}>
              <path
                d="M 35 50 L 37 55 L 42 57 L 37 59 L 35 64 L 33 59 L 28 57 L 33 55 Z"
                fill="#F9C5D5"
                opacity="0.8"
              />
              <path
                d="M 150 60 L 152 65 L 157 67 L 152 69 L 150 74 L 148 69 L 143 67 L 148 65 Z"
                fill="#B5F9E5"
                opacity="0.8"
              />
              <path
                d="M 140 140 L 141 143 L 144 144 L 141 145 L 140 148 L 139 145 L 136 144 L 139 143 Z"
                fill="#D4B5F9"
                opacity="0.8"
              />
              <path
                d="M 30 120 L 32 124 L 36 126 L 32 128 L 30 132 L 28 128 L 24 126 L 28 124 Z"
                fill="#B8D4F1"
                opacity="0.8"
              />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8D4F1" stopOpacity="1" />
                <stop offset="100%" stopColor="#D4B5F9" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F9C5D5" stopOpacity="1" />
                <stop offset="100%" stopColor="#B5F9E5" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
