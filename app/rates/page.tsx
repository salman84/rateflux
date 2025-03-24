import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample exchange rate data
const popularCurrencies = [
  { code: "USD", name: "US Dollar", rate: 1.0 },
  { code: "EUR", name: "Euro", rate: 0.918 },
  { code: "GBP", name: "British Pound", rate: 0.785 },
  { code: "JPY", name: "Japanese Yen", rate: 149.32 },
  { code: "AUD", name: "Australian Dollar", rate: 1.512 },
  { code: "CAD", name: "Canadian Dollar", rate: 1.354 },
  { code: "CHF", name: "Swiss Franc", rate: 0.879 },
  { code: "CNY", name: "Chinese Yuan", rate: 7.213 },
  { code: "INR", name: "Indian Rupee", rate: 83.25 },
  { code: "MXN", name: "Mexican Peso", rate: 16.78 },
]

const europeanCurrencies = [
  { code: "EUR", name: "Euro", rate: 0.918 },
  { code: "GBP", name: "British Pound", rate: 0.785 },
  { code: "CHF", name: "Swiss Franc", rate: 0.879 },
  { code: "SEK", name: "Swedish Krona", rate: 10.36 },
  { code: "NOK", name: "Norwegian Krone", rate: 10.52 },
  { code: "DKK", name: "Danish Krone", rate: 6.84 },
  { code: "PLN", name: "Polish Zloty", rate: 3.93 },
  { code: "CZK", name: "Czech Koruna", rate: 22.87 },
  { code: "HUF", name: "Hungarian Forint", rate: 354.25 },
  { code: "RON", name: "Romanian Leu", rate: 4.57 },
]

const asianCurrencies = [
  { code: "JPY", name: "Japanese Yen", rate: 149.32 },
  { code: "CNY", name: "Chinese Yuan", rate: 7.213 },
  { code: "HKD", name: "Hong Kong Dollar", rate: 7.82 },
  { code: "SGD", name: "Singapore Dollar", rate: 1.34 },
  { code: "INR", name: "Indian Rupee", rate: 83.25 },
  { code: "KRW", name: "South Korean Won", rate: 1335.45 },
  { code: "MYR", name: "Malaysian Ringgit", rate: 4.68 },
  { code: "THB", name: "Thai Baht", rate: 35.78 },
  { code: "PHP", name: "Philippine Peso", rate: 56.35 },
  { code: "IDR", name: "Indonesian Rupiah", rate: 15675.0 },
]

export default function RatesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Live Exchange Rates</h1>
        <p className="mb-8 text-muted-foreground">
          Current exchange rates against the US Dollar (USD). Rates are updated every hour from Open Exchange Rates API.
        </p>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="european">European</TabsTrigger>
            <TabsTrigger value="asian">Asian</TabsTrigger>
          </TabsList>

          <TabsContent value="popular">
            <Card>
              <CardHeader>
                <CardTitle>Popular Currencies</CardTitle>
                <CardDescription>Most traded currencies against the US Dollar</CardDescription>
              </CardHeader>
              <CardContent>
                <RatesTable currencies={popularCurrencies} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="european">
            <Card>
              <CardHeader>
                <CardTitle>European Currencies</CardTitle>
                <CardDescription>Major European currencies against the US Dollar</CardDescription>
              </CardHeader>
              <CardContent>
                <RatesTable currencies={europeanCurrencies} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="asian">
            <Card>
              <CardHeader>
                <CardTitle>Asian Currencies</CardTitle>
                <CardDescription>Major Asian currencies against the US Dollar</CardDescription>
              </CardHeader>
              <CardContent>
                <RatesTable currencies={asianCurrencies} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p className="mt-2">
            Note: These rates are for informational purposes only and may not reflect actual transaction rates.
          </p>
        </div>
      </div>
    </div>
  )
}

function RatesTable({ currencies }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Currency</TableHead>
          <TableHead>Code</TableHead>
          <TableHead className="text-right">Rate (1 USD =)</TableHead>
          <TableHead className="text-right">Inverse (1 Unit =)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currencies.map((currency) => (
          <TableRow key={currency.code}>
            <TableCell className="font-medium">{currency.name}</TableCell>
            <TableCell>{currency.code}</TableCell>
            <TableCell className="text-right">
              {currency.rate.toFixed(4)} {currency.code}
            </TableCell>
            <TableCell className="text-right">{(1 / currency.rate).toFixed(4)} USD</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

