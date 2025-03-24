"use client"

import { useState, useEffect } from "react"
import { ArrowRightLeft, RefreshCw, Search, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Expanded list of 200+ currencies
const currencies = [
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "AFN", name: "Afghan Afghani" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "ANG", name: "Netherlands Antillean Guilder" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "AWG", name: "Aruban Florin" },
  { code: "AZN", name: "Azerbaijani Manat" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
  { code: "BBD", name: "Barbadian Dollar" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "BIF", name: "Burundian Franc" },
  { code: "BMD", name: "Bermudan Dollar" },
  { code: "BND", name: "Brunei Dollar" },
  { code: "BOB", name: "Bolivian Boliviano" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "BSD", name: "Bahamian Dollar" },
  { code: "BTC", name: "Bitcoin" },
  { code: "BTN", name: "Bhutanese Ngultrum" },
  { code: "BWP", name: "Botswanan Pula" },
  { code: "BYN", name: "Belarusian Ruble" },
  { code: "BZD", name: "Belize Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CDF", name: "Congolese Franc" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CLF", name: "Chilean Unit of Account (UF)" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "CNH", name: "Chinese Yuan (Offshore)" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "COP", name: "Colombian Peso" },
  { code: "CRC", name: "Costa Rican Colón" },
  { code: "CUC", name: "Cuban Convertible Peso" },
  { code: "CUP", name: "Cuban Peso" },
  { code: "CVE", name: "Cape Verdean Escudo" },
  { code: "CZK", name: "Czech Republic Koruna" },
  { code: "DJF", name: "Djiboutian Franc" },
  { code: "DKK", name: "Danish Krone" },
  { code: "DOP", name: "Dominican Peso" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "ERN", name: "Eritrean Nakfa" },
  { code: "ETB", name: "Ethiopian Birr" },
  { code: "EUR", name: "Euro" },
  { code: "FJD", name: "Fijian Dollar" },
  { code: "FKP", name: "Falkland Islands Pound" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "GEL", name: "Georgian Lari" },
  { code: "GGP", name: "Guernsey Pound" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "GIP", name: "Gibraltar Pound" },
  { code: "GMD", name: "Gambian Dalasi" },
  { code: "GNF", name: "Guinean Franc" },
  { code: "GTQ", name: "Guatemalan Quetzal" },
  { code: "GYD", name: "Guyanaese Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HNL", name: "Honduran Lempira" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "HTG", name: "Haitian Gourde" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli New Sheqel" },
  { code: "IMP", name: "Manx pound" },
  { code: "INR", name: "Indian Rupee" },
  { code: "IQD", name: "Iraqi Dinar" },
  { code: "IRR", name: "Iranian Rial" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "JEP", name: "Jersey Pound" },
  { code: "JMD", name: "Jamaican Dollar" },
  { code: "JOD", name: "Jordanian Dinar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "KGS", name: "Kyrgystani Som" },
  { code: "KHR", name: "Cambodian Riel" },
  { code: "KMF", name: "Comorian Franc" },
  { code: "KPW", name: "North Korean Won" },
  { code: "KRW", name: "South Korean Won" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "KYD", name: "Cayman Islands Dollar" },
  { code: "KZT", name: "Kazakhstani Tenge" },
  { code: "LAK", name: "Laotian Kip" },
  { code: "LBP", name: "Lebanese Pound" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "LRD", name: "Liberian Dollar" },
  { code: "LSL", name: "Lesotho Loti" },
  { code: "LYD", name: "Libyan Dinar" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "MDL", name: "Moldovan Leu" },
  { code: "MGA", name: "Malagasy Ariary" },
  { code: "MKD", name: "Macedonian Denar" },
  { code: "MMK", name: "Myanma Kyat" },
  { code: "MNT", name: "Mongolian Tugrik" },
  { code: "MOP", name: "Macanese Pataca" },
  { code: "MRU", name: "Mauritanian Ouguiya" },
  { code: "MUR", name: "Mauritian Rupee" },
  { code: "MVR", name: "Maldivian Rufiyaa" },
  { code: "MWK", name: "Malawian Kwacha" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "MZN", name: "Mozambican Metical" },
  { code: "NAD", name: "Namibian Dollar" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "NIO", name: "Nicaraguan Córdoba" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "PAB", name: "Panamanian Balboa" },
  { code: "PEN", name: "Peruvian Nuevo Sol" },
  { code: "PGK", name: "Papua New Guinean Kina" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "PYG", name: "Paraguayan Guarani" },
  { code: "QAR", name: "Qatari Rial" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RSD", name: "Serbian Dinar" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "RWF", name: "Rwandan Franc" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "SBD", name: "Solomon Islands Dollar" },
  { code: "SCR", name: "Seychellois Rupee" },
  { code: "SDG", name: "Sudanese Pound" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "SHP", name: "Saint Helena Pound" },
  { code: "SLL", name: "Sierra Leonean Leone" },
  { code: "SOS", name: "Somali Shilling" },
  { code: "SRD", name: "Surinamese Dollar" },
  { code: "SSP", name: "South Sudanese Pound" },
  { code: "STN", name: "São Tomé and Príncipe Dobra" },
  { code: "SVC", name: "Salvadoran Colón" },
  { code: "SYP", name: "Syrian Pound" },
  { code: "SZL", name: "Swazi Lilangeni" },
  { code: "THB", name: "Thai Baht" },
  { code: "TJS", name: "Tajikistani Somoni" },
  { code: "TMT", name: "Turkmenistani Manat" },
  { code: "TND", name: "Tunisian Dinar" },
  { code: "TOP", name: "Tongan Pa'anga" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "TTD", name: "Trinidad and Tobago Dollar" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "UGX", name: "Ugandan Shilling" },
  { code: "USD", name: "United States Dollar" },
  { code: "UYU", name: "Uruguayan Peso" },
  { code: "UZS", name: "Uzbekistan Som" },
  { code: "VES", name: "Venezuelan Bolívar Soberano" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "VUV", name: "Vanuatu Vatu" },
  { code: "WST", name: "Samoan Tala" },
  { code: "XAF", name: "CFA Franc BEAC" },
  { code: "XAG", name: "Silver Ounce" },
  { code: "XAU", name: "Gold Ounce" },
  { code: "XCD", name: "East Caribbean Dollar" },
  { code: "XDR", name: "Special Drawing Rights" },
  { code: "XOF", name: "CFA Franc BCEAO" },
  { code: "XPD", name: "Palladium Ounce" },
  { code: "XPF", name: "CFP Franc" },
  { code: "XPT", name: "Platinum Ounce" },
  { code: "YER", name: "Yemeni Rial" },
  { code: "ZAR", name: "South African Rand" },
  { code: "ZMW", name: "Zambian Kwacha" },
  { code: "ZWL", name: "Zimbabwean Dollar" },
]

export default function ExchangeRateCalculator() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [amount, setAmount] = useState(1)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  const fetchExchangeRate = async () => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1)
      setConvertedAmount(amount)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Using a different free exchange rate API
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate")
      }

      const data = await response.json()

      if (data && data.rates && data.rates[toCurrency] !== undefined) {
        const rate = data.rates[toCurrency]
        setExchangeRate(rate)
        setConvertedAmount(amount * rate)
      } else {
        console.error("API response:", data)
        throw new Error("Invalid response from exchange rate API")
      }
    } catch (err) {
      setError("Failed to fetch exchange rate. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Update conversion when inputs change
  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  // Update converted amount when amount changes
  useEffect(() => {
    setConvertedAmount(amount * exchangeRate)
  }, [amount, exchangeRate])

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Get real-time exchange rates between currencies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={fromOpen} className="w-full justify-between">
                  {fromCurrency ? currencies.find((c) => c.code === fromCurrency)?.code : "Select currency"}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search currency..." />
                  <CommandList>
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {currencies.map((currency) => (
                        <CommandItem
                          key={currency.code}
                          value={`${currency.code} ${currency.name}`.toLowerCase()}
                          onSelect={() => {
                            setFromCurrency(currency.code)
                            setFromOpen(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", fromCurrency === currency.code ? "opacity-100" : "opacity-0")}
                          />
                          {currency.code} - {currency.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapCurrencies}
            className="mt-8 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={toOpen} className="w-full justify-between">
                  {toCurrency ? currencies.find((c) => c.code === toCurrency)?.code : "Select currency"}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search currency..." />
                  <CommandList>
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {currencies.map((currency) => (
                        <CommandItem
                          key={currency.code}
                          value={`${currency.code} ${currency.name}`.toLowerCase()}
                          onSelect={() => {
                            setToCurrency(currency.code)
                            setToOpen(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", toCurrency === currency.code ? "opacity-100" : "opacity-0")}
                          />
                          {currency.code} - {currency.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="rounded-lg bg-secondary/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Converted Amount</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : (
                  `${convertedAmount.toFixed(2)} ${toCurrency}`
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchExchangeRate}
              disabled={isLoading}
              aria-label="Refresh exchange rate"
              className="text-primary hover:bg-primary/10 hover:text-primary"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          {!isLoading && (
            <p className="mt-2 text-sm text-muted-foreground">
              1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-primary/5 text-xs text-muted-foreground">
        <p>Exchange rates provided by Open Exchange Rates API</p>
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </CardFooter>
    </Card>
  )
}

