"use client"

import type React from "react"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/providers/session-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith("/admin") || pathname === "/admin-login"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              {!isAdminPage && <SiteHeader />}
              <main className="flex-1">{children}</main>
              {!isAdminPage && <SiteFooter />}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
