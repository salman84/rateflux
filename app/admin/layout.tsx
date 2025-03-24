"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { DollarSign, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("adminAuth")
    if (auth !== "true") {
      router.push("/admin-login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin-login")
  }

  // Add meta tags to prevent indexing
  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Logo", href: "/admin/logo" },
    { name: "Theme Color", href: "/admin/theme" },
    { name: "Pages", href: "/admin/pages" },
    { name: "Header & Footer", href: "/admin/navigation" },
    { name: "Social", href: "/admin/social" },
    { name: "Copyright", href: "/admin/copyright" },
    { name: "Ads", href: "/admin/ads" },
    { name: "Settings", href: "/admin/settings" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r">
        <div className="flex h-16 items-center px-4 border-b">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="font-bold">Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm rounded-md ${
                pathname === item.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

