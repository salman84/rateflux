"use client"

import { useEffect, useState } from "react"

export default function BlueTextAnimation() {
  const [text, setText] = useState("")
  const fullText = "Currency Exchange"

  useEffect(() => {
    let direction = "typing"
    let currentIndex = 0
    let timeout: NodeJS.Timeout

    const updateText = () => {
      if (direction === "typing") {
        currentIndex++
        setText(fullText.substring(0, currentIndex))

        if (currentIndex >= fullText.length) {
          direction = "waiting"
          timeout = setTimeout(() => {
            direction = "deleting"
            updateText()
          }, 1000)
          return
        }
      } else if (direction === "deleting") {
        currentIndex--
        setText(fullText.substring(0, currentIndex))

        if (currentIndex <= 0) {
          direction = "waiting"
          timeout = setTimeout(() => {
            direction = "typing"
            updateText()
          }, 500)
          return
        }
      } else {
        return
      }

      const speed = direction === "typing" ? 100 : 50
      timeout = setTimeout(updateText, speed)
    }

    timeout = setTimeout(updateText, 500)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <span className="text-primary inline-flex relative">
      {text}
      <span className="animate-blink">|</span>
    </span>
  )
}

