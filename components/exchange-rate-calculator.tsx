"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, Search } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Currency {
  code: string
  name: string
  symbol: string
}

interface ExchangeRate {
  rate: number
  timestamp: number
  base: string
}

// Sample currency data
const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
]

// Sample exchange rates (in a real app, these would come from an API)
const sampleRates: Record<string, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 150.12,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.89,
  CNY: 7.24,
  INR: 83.12,
  BRL: 5.05,
  RUB: 92.50,
  KRW: 1345.67,
  SGD: 1.34,
  NZD: 1.64,
  MXN: 16.82,
}

export default function ExchangeRateCalculator() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [rate, setRate] = useState<number | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [fromSearch, setFromSearch] = useState<string>("")
  const [toSearch, setToSearch] = useState<string>("")
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  // Filter currencies based on search
  const filteredFromCurrencies = currencies.filter((currency) => 
    currency.code.toLowerCase().includes(fromSearch.toLowerCase()) || 
    currency.name.toLowerCase().includes(fromSearch.toLowerCase())
  )

  const filteredToCurrencies = currencies.filter((currency) => 
    currency.code.toLowerCase().includes(toSearch.toLowerCase()) || 
    currency.name.toLowerCase().includes(toSearch.toLowerCase())
  )

  // Calculate exchange rate
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fromRate = sampleRates[fromCurrency]
      const toRate = sampleRates[toCurrency]
      
      if (fromRate && toRate) {
        const calculatedRate = toRate / fromRate
        setRate(calculatedRate)
        
        const parsedAmount = parseFloat(amount)
        if (!isNaN(parsedAmount)) {
          setResult(parsedAmount * calculatedRate)
        }
      }
      
      // Set last updated time
      setLastUpdated(new Date().toLocaleString())
    }
  }, [fromCurrency, toCurrency, amount])

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    
    if (value && rate) {
      const parsedAmount = parseFloat(value)
      if (!isNaN(parsedAmount)) {
        setResult(parsedAmount * rate)
      } else {
        setResult(null)
      }
    } else {
      setResult(null)
    }
  }

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // Format currency display
  const formatCurrency = (code: string) => {
    const currency = currencies.find(c => c.code === code)
    return currency ? `${currency.code} - ${currency.name}` : code
  }

  // Get currency symbol
  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code)
    return currency ? currency.symbol : ""
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>
          Get live exchange rates and convert between currencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
          <div className="space-y-2">
            <Label htmlFor="fromCurrency">From</Label>
            <Popover open={fromOpen} onOpenChange={setFromOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={fromOpen}
                  className="w-full justify-between"
                >
                  {fromCurrency ? formatCurrency(fromCurrency) : "Select currency..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search currency..." 
                    value={fromSearch}
                    onValueChange={setFromSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup>
                      {filteredFromCurrencies.map((currency) => (
                        <CommandItem
                          key={currency.code}
                          value={currency.code}
                          onSelect={(value) => {
                            setFromCurrency(value)
                            setFromOpen(false)
                          }}
                        >
                          <span className="mr-2">{currency.symbol}</span>
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
            variant="ghost"
            size="icon"
            onClick={handleSwapCurrencies}
            className="mt-8"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
          
          <div className="space-y-2">
            <Label htmlFor="toCurrency">To</Label>
            <Popover open={toOpen} onOpenChange={setToOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={toOpen}
                  className="w-full justify-between"
                >
                  {toCurrency ? formatCurrency(toCurrency) : "Select currency..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search currency..." 
                    value={toSearch}
                    onValueChange={setToSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup>
                      {filteredToCurrencies.map((currency) => (
                        <CommandItem
                          key={currency.code}
                          value={currency.code}
                          onSelect={(value) => {
                            setToCurrency(value)
                            setToOpen(false)
                          }}
                        >
                          <span className="mr-2">{currency.symbol}</span>
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
        
        {result !== null && (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm text-muted-foreground mb-1">Result</div>
              <div className="text-2xl font-bold">
                {getCurrencySymbol(fromCurrency)} {parseFloat(amount).toLocaleString()} = {getCurrencySymbol(toCurrency)} {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                1 {fromCurrency} = {rate?.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {toCurrency}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
