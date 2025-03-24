import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Globe, BarChart, Clock, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">About ExchangeWise</h1>

        <div className="mb-12 space-y-6">
          <p className="text-lg text-muted-foreground">
            ExchangeWise provides real-time currency exchange rates and conversion tools for travelers, businesses, and
            financial professionals worldwide. Our mission is to make currency information accessible, accurate, and
            easy to understand.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-primary" />}
              title="Global Coverage"
              description="Access exchange rates for over 170 currencies from around the world."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Real-Time Data"
              description="Get up-to-date exchange rates refreshed regularly throughout the day."
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="Historical Trends"
              description="View and analyze currency performance over time with our charts."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Reliable Information"
              description="Data sourced from trusted financial institutions and exchange services."
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-primary" />}
              title="Free Converter"
              description="Convert between any currencies instantly with our free tool."
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Our Story</h2>
          <p className="mb-4">
            Founded in 2023, ExchangeWise began with a simple goal: to provide travelers and businesses with accurate
            currency information without the complexity. What started as a small project has grown into a trusted
            resource used by thousands of people daily.
          </p>
          <p>
            Our team consists of financial experts, data analysts, and developers who are passionate about creating
            tools that make financial information more accessible. We believe that understanding currency exchange
            should be simple, regardless of your financial background.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Data Sources</h2>
          <p>
            ExchangeWise uses data from Open Exchange Rates API, which aggregates exchange rate data from multiple
            financial sources. Our rates are updated regularly to ensure accuracy, but they should be considered
            informational. Actual transaction rates may vary depending on financial institutions and service providers.
          </p>
        </div>

        <div className="rounded-md bg-muted p-6">
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="mb-4">
            We value your feedback and are always looking for ways to improve our service. If you have questions,
            suggestions, or need assistance, please don't hesitate to reach out.
          </p>
          <p className="font-medium">
            Email:{" "}
            <a href="mailto:info@exchangewise.com" className="text-primary hover:underline">
              info@exchangewise.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        {icon}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

