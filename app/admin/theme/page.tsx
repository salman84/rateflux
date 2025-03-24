"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"

export default function ThemeColorManagement() {
  const [primaryColor, setPrimaryColor] = useState("#0066FF") // Blue
  const [secondaryColor, setSecondaryColor] = useState("#FF66B2") // Pink
  const [successMessage, setSuccessMessage] = useState("")

  const handleSaveColors = () => {
    // In a real application, this would update the theme in a database or config file
    setSuccessMessage("Theme colors updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleResetColors = () => {
    setPrimaryColor("#0066FF")
    setSecondaryColor("#FF66B2")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Theme Color Management</h2>
        <p className="text-muted-foreground">Customize your website's color scheme.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Set the primary and secondary colors for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color (Currently Blue)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color (Currently Pink)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color Preview</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="h-20 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Primary
                  </div>
                  <div
                    className="h-20 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    Secondary
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetColors}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Default
              </Button>
              <Button onClick={handleSaveColors}>Save Colors</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preview</CardTitle>
              <CardDescription>Preview how your color scheme will look on different elements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Buttons</Label>
                <div className="flex flex-wrap gap-4">
                  <Button style={{ backgroundColor: primaryColor }}>Primary Button</Button>
                  <Button variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>
                    Outline Button
                  </Button>
                  <Button style={{ backgroundColor: secondaryColor }}>Secondary Button</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Text</Label>
                <div className="space-y-2">
                  <p style={{ color: primaryColor }}>This is text in the primary color.</p>
                  <p style={{ color: secondaryColor }}>This is text in the secondary color.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cards</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4" style={{ borderColor: primaryColor }}>
                    <h3 className="font-medium" style={{ color: primaryColor }}>
                      Card with Primary
                    </h3>
                    <p className="text-sm text-gray-500">This card uses the primary color.</p>
                  </div>
                  <div className="border rounded-md p-4" style={{ borderColor: secondaryColor }}>
                    <h3 className="font-medium" style={{ color: secondaryColor }}>
                      Card with Secondary
                    </h3>
                    <p className="text-sm text-gray-500">This card uses the secondary color.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Color Settings</CardTitle>
              <CardDescription>Fine-tune additional color settings for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="primary-brightness">Primary Color Brightness</Label>
                    <span className="text-sm text-muted-foreground">50%</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="primary-saturation">Primary Color Saturation</Label>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>

                <div className="space-y-2">
                  <Label>Dark Mode Colors</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dark-primary-color">Dark Mode Primary</Label>
                      <Input id="dark-primary-color" type="color" defaultValue="#3385FF" className="w-full h-10 p-1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dark-secondary-color">Dark Mode Secondary</Label>
                      <Input
                        id="dark-secondary-color"
                        type="color"
                        defaultValue="#FF85C0"
                        className="w-full h-10 p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveColors}>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

