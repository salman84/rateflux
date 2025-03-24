import Link from "next/link"
import { DollarSign, Facebook, Github, Twitter } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <span className="font-bold">ExchangeWise</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time currency exchange rates and conversion for over 170 currencies worldwide.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rates" className="text-muted-foreground transition-colors hover:text-foreground">
                  Live Rates
                </Link>
              </li>
              <li>
                <Link href="/converter" className="text-muted-foreground transition-colors hover:text-foreground">
                  Currency Converter
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground transition-colors hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground transition-colors hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Contact us at:{" "}
              <a href="mailto:info@exchangewise.com" className="hover:text-foreground">
                info@exchangewise.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ExchangeWise. All rights reserved. Exchange rates provided by Open
            Exchange Rates API.
          </p>
        </div>
      </div>
    </footer>
  )
}

