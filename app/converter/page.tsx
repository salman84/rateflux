import ExchangeRateCalculator from "@/components/exchange-rate-calculator"

export default function ConverterPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Currency Converter</h1>
        <p className="mb-8 text-muted-foreground">
          Convert between different currencies using real-time exchange rates. Our converter supports over 170
          currencies worldwide.
        </p>

        <div className="mx-auto max-w-md">
          <ExchangeRateCalculator />
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">How to Use the Currency Converter</h2>
          <ol className="ml-6 list-decimal space-y-2">
            <li>Enter the amount you want to convert in the "Amount" field.</li>
            <li>Select the currency you want to convert from in the "From" dropdown.</li>
            <li>Select the currency you want to convert to in the "To" dropdown.</li>
            <li>The converted amount will be displayed automatically.</li>
            <li>You can swap the currencies by clicking the swap button between the dropdowns.</li>
            <li>To refresh the rates, click the refresh button next to the converted amount.</li>
          </ol>

          <h2 className="text-2xl font-semibold">About Our Exchange Rates</h2>
          <p>
            Our exchange rates are sourced from Open Exchange Rates API, which provides reliable and up-to-date currency
            exchange data. Rates are updated regularly to ensure accuracy.
          </p>

          <div className="rounded-md bg-muted p-4">
            <h3 className="text-lg font-medium">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              The exchange rates provided are for informational purposes only and do not constitute financial advice.
              Actual conversion rates may vary at the time of transaction. We recommend consulting with a financial
              professional for specific advice related to currency exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

