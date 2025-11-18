'use client'

interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div className="glass-morphism rounded-2xl px-6 py-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <span className="text-2xl animate-bounce">🐳</span>
          <p className="text-lg font-semibold text-gray-800">{message}</p>
        </div>
      </div>
    </div>
  )
}
