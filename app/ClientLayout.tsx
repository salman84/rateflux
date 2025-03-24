"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  )
}
