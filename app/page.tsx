import ExchangeRateCalculator from "@/components/exchange-rate-calculator"
import AnimatedCoins from "@/components/animated-coins"
import BlueTextAnimation from "@/components/blue-text-animation"

export default function Home() {
  return (
    <div className="container py-8 md:py-12 lg:py-24 relative">
      <div className="relative overflow-hidden">
        <AnimatedCoins />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center relative z-10">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl whitespace-nowrap">
            <BlueTextAnimation /> Made Simple
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-muted-foreground">
            Get real-time exchange rates and convert between 200+ currencies worldwide with ExchangeWise.
          </p>

          <div className="grid w-full max-w-md gap-6">
            <ExchangeRateCalculator />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-4">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Real-Time Rates</h3>
              <p className="text-center text-muted-foreground">
                Up-to-date exchange rates from reliable financial sources.
              </p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="mb-4 rounded-full bg-secondary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Conversion</h3>
              <p className="text-center text-muted-foreground">
                Simple interface to convert between any two currencies instantly.
              </p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">200+ Currencies</h3>
              <p className="text-center text-muted-foreground">
                Support for major and exotic currencies from around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

