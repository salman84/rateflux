"use client"

import { useState, useEffect } from "react"

const phrases = [
  "Currency Exchange",
  "Rate Conversion",
  "Foreign Exchange",
  "Money Transfer",
  "Global Payments"
]

export default function BlueTextAnimation() {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <span className="text-gradient-animation">{phrases[index]}</span>
  )
}
