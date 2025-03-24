"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"

interface Page {
  id: string
  title: string
  slug: string
  is_active: boolean
  in_header: boolean
}

interface LogoSettings {
  text: string
  icon: string
  image: string | null
}

export default function SiteHeader() {
  const [pages, setPages] = useState<Page[]>([])
  const [logo, setLogo] = useState<LogoSettings>({
    text: "ExchangeWise",
    icon: "DollarSign",
    image: null
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch header navigation pages
        const { data: pagesData, error: pagesError } = await supabase
          .from("pages")
          .select("id, title, slug, is_active, in_header")
          .eq("is_active", true)
          .eq("in_header", true)
          .order("created_at", { ascending: true })

        if (!pagesError && pagesData) {
          setPages(pagesData)
        }

        // Fetch logo settings
        const { data: logoData, error: logoError } = await supabase
          .from("settings")
          .select("value")
          .eq("id", "logo")
          .single()

        if (!logoError && logoData) {
          setLogo(logoData.value)
        }
      } catch (error) {
        console.error("Error fetching header data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {logo.image ? (
              <img src={logo.image || "/placeholder.svg"} alt={logo.text} className="h-6 w-auto" />
            ) : (
              <DollarSign className="h-6 w-6" />
            )}
            <span className="font-bold">{logo.text}</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {!isLoading &&
              pages.map((page) => (
                <Link
                  key={page.id}
                  href={page.slug === "/" ? "/" : `/${page.slug}`}
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {page.title}
                </Link>
              ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
