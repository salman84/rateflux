import ClientLayout from "@/app/ClientLayout"
import ExchangeRateCalculator from "@/components/exchange-rate-calculator"
import AnimatedCoins from "@/components/animated-coins"
import BlueTextAnimation from "@/components/blue-text-animation"
import { supabase } from "@/lib/supabase"

// Fetch settings from the database
async function getSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", "theme")
    .single()

  if (error || !data) {
    return { primaryColor: "#0066FF", secondaryColor: "#FF66B2" }
  }

  return data.value
}

export default async function Home() {
  const settings = await getSettings()

  return (
    <ClientLayout>
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
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
