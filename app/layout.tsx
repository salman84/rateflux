import type React from "react"
import ClientLayout from "./ClientLayout"

export const metadata = {
  title: "ExchangeWise - Currency Exchange Rates",
  description: "Get real-time currency exchange rates and convert between currencies worldwide.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'