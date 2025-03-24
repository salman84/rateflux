"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Twitter, Github } from 'lucide-react'
import { supabase } from "@/lib/supabase"

interface Page {
  id: string
  title: string
  slug: string
  is_active: boolean
  in_footer: boolean
}

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  is_active: boolean
}

interface CopyrightSettings {
  text: string
  showYear: boolean
  companyName: string
  additionalText: string
}

export default function SiteFooter() {
  const [pages, setPages] = useState<Page[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [copyright, setCopyright] = useState<CopyrightSettings>({
    text: "© 2024 ExchangeWise. All rights reserved.",
    showYear: true,
    companyName: "ExchangeWise",
    additionalText: "Exchange rates provided by Open Exchange Rates API."
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch footer navigation pages
        const { data: pagesData, error: pagesError } = await supabase
          .from("pages")
          .select("id, title, slug, is_active, in_footer")
          .eq("is_active", true)
          .eq("in_footer", true)
          .order("created_at", { ascending: true })

        if (!pagesError && pagesData) {
          setPages(pagesData)
        }

        // Fetch social links
        const { data: socialData, error: socialError } = await supabase
          .from("social_links")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })

        if (!socialError && socialData) {
          setSocialLinks(socialData)
        }

        // Fetch copyright settings
        const { data: copyrightData, error: copyrightError } = await supabase
          .from("settings")
          .select("value")
          .eq("id", "copyright")
          .single()

        if (!copyrightError && copyrightData) {
          setCopyright(copyrightData.value)
        }
      } catch (error) {
        console.error("Error fetching footer data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case "Twitter":
        return <Twitter className="h-4 w-4" />
      case "Facebook":
        return <Facebook className="h-4 w-4" />
      case "Github":
        return <Github className="h-4 w-4" />
      default:
        return null
    }
  }

  const renderCopyright = () => {
    if (copyright.showYear) {
      return `© ${new Date().getFullYear()} ${copyright.companyName}. All rights reserved.`
    }
    return copyright.text
  }

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">ExchangeWise</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get real-time exchange rates and convert between 200+ currencies worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-2 space-y-2">
              {!isLoading &&
                pages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={page.slug === "/" ? "/" : `/${page.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="mt-2 flex space-x-4">
              {!isLoading &&
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {renderSocialIcon(link.icon)}
                    <span className="sr-only">{link.platform}</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{renderCopyright()}</p>
          {copyright.additionalText && (
            <p className="mt-1">{copyright.additionalText}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
