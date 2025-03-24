"use client"

import { useEffect, useState } from "react"
import { DollarSign, Euro, Bitcoin, PoundSterlingIcon as Pound } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

type Coin = {
  id: number
  icon: JSX.Element
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
}

export default function AnimatedCoins() {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    // Create initial coins
    const initialCoins: Coin[] = []
    const icons = [
      <DollarSign key="dollar" className="text-primary/15" />,
      <Euro key="euro" className="text-primary/15" />,
      <Bitcoin key="bitcoin" className="text-secondary/15" />,
      <Pound key="pound" className="text-primary/15" />,
    ]

    for (let i = 0; i < 20; i++) {
      initialCoins.push({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, // Size between 0.5 and 2
        speed: Math.random() * 1.5 + 0.5, // Speed between 0.5 and 2
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2, // Between -1 and 1
      })
    }

    setCoins(initialCoins)

    // Animation loop
    const animationFrame = requestAnimationFrame(animateCoins)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  const animateCoins = () => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) => {
        // Update y position (falling)
        let newY = coin.y + coin.speed * 0.1
        // Reset position if coin goes off screen
        if (newY > 100) {
          newY = -10
        }

        // Update rotation
        const newRotation = (coin.rotation + coin.rotationSpeed) % 360

        return {
          ...coin,
          y: newY,
          rotation: newRotation,
        }
      }),
    )

    requestAnimationFrame(animateCoins)
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute"
          style={{
            left: `${coin.x}%`,
            top: `${coin.y}%`,
            transform: `scale(${coin.size}) rotate(${coin.rotation}deg)`,
            transition: "transform 0.5s ease",
          }}
        >
          {coin.icon}
        </div>
      ))}
    </div>
  )
}

