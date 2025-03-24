import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, Palette, FileText, Menu, Share2, Copyright, BarChart4 } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Logo",
      description: "Manage website logo",
      icon: <Image className="h-5 w-5 text-primary" />,
      href: "/admin/logo",
    },
    {
      title: "Theme Color",
      description: "Customize website colors",
      icon: <Palette className="h-5 w-5 text-primary" />,
      href: "/admin/theme",
    },
    {
      title: "Pages",
      description: "Manage website pages",
      icon: <FileText className="h-5 w-5 text-primary" />,
      href: "/admin/pages",
    },
    {
      title: "Header & Footer",
      description: "Customize navigation",
      icon: <Menu className="h-5 w-5 text-primary" />,
      href: "/admin/navigation",
    },
    {
      title: "Social",
      description: "Manage social links",
      icon: <Share2 className="h-5 w-5 text-primary" />,
      href: "/admin/social",
    },
    {
      title: "Copyright",
      description: "Update copyright notice",
      icon: <Copyright className="h-5 w-5 text-primary" />,
      href: "/admin/copyright",
    },
    {
      title: "Ads",
      description: "Manage advertisement sections",
      icon: <BarChart4 className="h-5 w-5 text-primary" />,
      href: "/admin/ads",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome to Admin Dashboard</h2>
        <p className="text-muted-foreground">Manage and customize your ExchangeWise website from here.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <CardDescription>{stat.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>View detailed analytics about your website traffic and user engagement.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Analytics dashboard will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and download reports about your website performance.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Reports will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

