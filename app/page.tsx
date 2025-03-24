import ClientLayout from "./ClientLayout"
import ExchangeRateCalculator from "@/components/exchange-rate-calculator"
import AnimatedCoins from "@/components/animated-coins"
import BlueTextAnimation from "@/components/blue-text-animation"

export default function Home() {
  return (
    <ClientLayout>
      <div className="container mx-auto py-10 px-4 relative">
        <div className="relative overflow-hidden">
          <AnimatedCoins />
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center relative z-10">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl whitespace-nowrap">
              <BlueTextAnimation /> Made Simple
            </h1>
            <p className="mb-10 max-w-2xl text-xl text-muted-foreground">
              Get real-time exchange rates and convert between 200+ currencies worldwide with ExchangeWise.
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-md mx-auto gap-6 mt-8">
          <ExchangeRateCalculator />
        </div>
      </div>
    </ClientLayout>
  )
}
