import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Little Orca's Questionable Wisdom 🐳✨",
  description: 'Chaotic but wholesome life advice from a cute orca friend',
  keywords: ['orca', 'advice', 'fun', 'wholesome', 'chaotic'],
  authors: [{ name: 'Little Orca' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
