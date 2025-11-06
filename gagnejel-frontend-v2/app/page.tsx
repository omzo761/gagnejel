'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Import dynamique sans SSR pour éviter l'hydration error
const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then((mod) => mod.ConnectButton),
  { ssr: false }
)

function WalletStatus() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <ConnectButton />
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">🏆 GagneJèl</div>
        {mounted && <WalletStatus />}
      </header>

      {/* Hero */}
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center text-white px-4">
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-6xl font-bold mb-4">GagneJèl</h1>
          <p className="text-2xl mb-8">Pariez entre amis sur la blockchain</p>
          
          {mounted ? (
            <div className="space-y-4">
              <WalletStatus />
            </div>
          ) : (
            <div className="bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-bold inline-block">
              🔄 Chargement...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}