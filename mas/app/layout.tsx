import type { Metadata, Viewport } from 'next'
import './globals.css'

// next/font/google and @vercel/analytics are intentionally excluded.
// - Fonts: resolved via system font stack in globals.css (no network fetch).
// - Analytics: removed to comply with the "no external API calls" prototype scope.

export const metadata: Metadata = {
  title: 'MAS QHomemart - Multi-Agent System Prototype',
  description: 'Problem-to-Solution Bundle Multi-Agent System prototype for QHomemart AI Agent Competition 2026',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D71920',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-[#F0EBE3]">
      <body className="font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
