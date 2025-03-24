"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Upload, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LogoManagement() {
  const [logoText, setLogoText] = useState("ExchangeWise")
  const [logoIcon, setLogoIcon] = useState("DollarSign")
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [savedLogo, setSavedLogo] = useState<string | null>(null)

  // Load saved data on component mount
  useEffect(() => {
    const savedLogoText = localStorage.getItem("logoText")
    const savedLogoIcon = localStorage.getItem("logoIcon")
    const savedLogoImage = localStorage.getItem("logoImage")

    if (savedLogoText) setLogoText(savedLogoText)
    if (savedLogoIcon) setLogoIcon(savedLogoIcon)
    if (savedLogoImage) setSavedLogo(savedLogoImage)
  }, [])

  const handleSaveText = () => {
    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem("logoText", logoText)
    localStorage.setItem("logoIcon", logoIcon)

    setSuccessMessage("Logo text updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // In a real application, this would update the actual website logo
    // For now, we'll simulate this by updating localStorage
    updateWebsiteLogo(logoText, logoIcon, savedLogo)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setUploadedLogo(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveImage = () => {
    if (uploadedLogo) {
      // Save to localStorage (in a real app, this would upload to a server)
      localStorage.setItem("logoImage", uploadedLogo)
      setSavedLogo(uploadedLogo)

      setSuccessMessage("Logo image updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)

      // In a real application, this would update the actual website logo
      // For now, we'll simulate this by updating localStorage
      updateWebsiteLogo(logoText, logoIcon, uploadedLogo)
    }
  }

  // Function to update the website logo (simulated)
  const updateWebsiteLogo = (text: string, icon: string, image: string | null) => {
    // In a real application, this would make an API call to update the website
    localStorage.setItem("websiteLogoText", text)
    localStorage.setItem("websiteLogoIcon", icon)
    if (image) localStorage.setItem("websiteLogoImage", image)

    // This is where you would update the actual website components
    console.log("Website logo updated:", { text, icon, image: image ? "Image uploaded" : "No image" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Logo Management</h2>
        <p className="text-muted-foreground">Customize your website logo and branding.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">Text Logo</TabsTrigger>
          <TabsTrigger value="image">Image Logo</TabsTrigger>
          <TabsTrigger value="icon">Icon</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Logo</CardTitle>
              <CardDescription>Update the text displayed in your website logo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-text">Logo Text</Label>
                <Input
                  id="logo-text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="Enter logo text"
                />
              </div>
              <div className="space-y-2">
                <Label>Current Logo Text</Label>
                <div className="p-4 border rounded-md flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <span className="font-bold">{logoText}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveText}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image Logo</CardTitle>
              <CardDescription>Upload an image to use as your website logo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-image">Upload Logo Image</Label>
                <div className="flex items-center gap-4">
                  <Input id="logo-image" type="file" accept="image/*" onChange={handleFileUpload} />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {uploadedLogo && (
                <div className="space-y-2">
                  <Label>New Logo Preview</Label>
                  <div className="p-4 border rounded-md">
                    <img
                      src={uploadedLogo || "/placeholder.svg"}
                      alt="Uploaded Logo"
                      className="max-h-20 object-contain"
                    />
                  </div>
                </div>
              )}

              {savedLogo && (
                <div className="space-y-2">
                  <Label>Current Saved Logo</Label>
                  <div className="p-4 border rounded-md">
                    <img src={savedLogo || "/placeholder.svg"} alt="Current Logo" className="max-h-20 object-contain" />
                  </div>
                </div>
              )}

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Recommendation</AlertTitle>
                <AlertDescription>
                  For best results, upload a PNG or SVG image with a transparent background. Recommended size: 200x50
                  pixels.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveImage} disabled={!uploadedLogo}>
                Save Logo Image
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="icon">
          <Card>
            <CardHeader>
              <CardTitle>Logo Icon</CardTitle>
              <CardDescription>Choose an icon to display alongside your logo text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Icon</Label>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                  {[
                    "DollarSign",
                    "CreditCard",
                    "Wallet",
                    "Landmark",
                    "TrendingUp",
                    "BarChart",
                    "PieChart",
                    "Globe",
                  ].map((icon) => (
                    <Button
                      key={icon}
                      variant={logoIcon === icon ? "default" : "outline"}
                      className="h-12 w-12 p-0"
                      onClick={() => setLogoIcon(icon)}
                    >
                      <DollarSign className="h-6 w-6" />
                      {logoIcon === icon && (
                        <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-primary-foreground">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveText}>Save Icon</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Logo Preview</CardTitle>
              <CardDescription>Preview how your logo will appear on the website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Header Logo</Label>
                <div className="p-4 border rounded-md bg-background">
                  <div className="flex items-center gap-2">
                    {savedLogo ? (
                      <img src={savedLogo || "/placeholder.svg"} alt="Logo" className="h-6 w-auto" />
                    ) : (
                      <DollarSign className="h-6 w-6 text-primary" />
                    )}
                    <span className="font-bold">{logoText}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Footer Logo</Label>
                <div className="p-4 border rounded-md bg-background">
                  <div className="flex items-center gap-2">
                    {savedLogo ? (
                      <img src={savedLogo || "/placeholder.svg"} alt="Logo" className="h-6 w-auto" />
                    ) : (
                      <DollarSign className="h-6 w-6 text-primary" />
                    )}
                    <span className="font-bold">{logoText}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mobile Logo</Label>
                <div className="p-4 border rounded-md bg-background">
                  <div className="flex items-center gap-2">
                    {savedLogo ? (
                      <img src={savedLogo || "/placeholder.svg"} alt="Logo" className="h-6 w-auto" />
                    ) : (
                      <DollarSign className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

