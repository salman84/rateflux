"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Check, Undo2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
}

export default function ThemeSettings() {
  const [theme, setTheme] = useState<ThemeSettings>({
    primaryColor: "#0066FF",
    secondaryColor: "#FF66B2"
  })
  const [originalTheme, setOriginalTheme] = useState<ThemeSettings>({
    primaryColor: "#0066FF",
    secondaryColor: "#FF66B2"
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchThemeSettings()
  }, [])

  const fetchThemeSettings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/settings/theme")
      
      if (response.ok) {
        const data = await response.json()
        setTheme(data.value)
        setOriginalTheme(data.value)
      }
    } catch (error) {
      console.error("Error fetching theme settings:", error)
      toast({
        title: "Error",
        description: "Failed to load theme settings",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTheme(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setTheme({ ...originalTheme })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch("/api/settings/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: theme })
      })

      if (!response.ok) {
        throw new Error("Failed to update theme settings")
      }

      setOriginalTheme({ ...theme })
      toast({
        title: "Success",
        description: "Theme settings updated successfully",
      })
    } catch (error) {
      console.error("Error saving theme settings:", error)
      toast({
        title: "Error",
        description: "Failed to save theme settings",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const isChanged = JSON.stringify(theme) !== JSON.stringify(originalTheme)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Theme Settings</h1>

      <Tabs defaultValue="colors">
        <TabsList className="mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Customize the primary and secondary colors of your website
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-4">Loading theme settings...</div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center gap-4 mt-1.5">
                          <div 
                            className="w-10 h-10 rounded-full border"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <Input
                            id="primaryColor"
                            name="primaryColor"
                            type="text"
                            value={theme.primaryColor}
                            onChange={handleInputChange}
                            className="w-40"
                          />
                          <Input
                            type="color"
                            value={theme.primaryColor}
                            onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="w-12 h-10 p-1 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <div className="flex items-center gap-4 mt-1.5">
                          <div 
                            className="w-10 h-10 rounded-full border"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                          <Input
                            id="secondaryColor"
                            name="secondaryColor"
                            type="text"
                            value={theme.secondaryColor}
                            onChange={handleInputChange}
                            className="w-40"
                          />
                          <Input
                            type="color"
                            value={theme.secondaryColor}
                            onChange={(e) => setTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                            className="w-12 h-10 p-1 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="font-medium mb-3">Preview</h3>
                      <div className="flex gap-4">
                        <div 
                          className="px-4 py-2 rounded-md text-white"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          Primary Button
                        </div>
                        <div 
                          className="px-4 py-2 rounded-md text-white"
                          style={{ backgroundColor: theme.secondaryColor }}
                        >
                          Secondary Button
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleReset}
                  disabled={!isChanged || isLoading || isSaving}
                  className="flex items-center gap-2"
                >
                  <Undo2 className="h-4 w-4" />
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  disabled={!isChanged || isLoading || isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
