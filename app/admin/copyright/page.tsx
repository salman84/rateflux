"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function CopyrightManagement() {
  const [copyrightText, setCopyrightText] = useState(
    "© 2024 ExchangeWise. All rights reserved. Exchange rates provided by Open Exchange Rates API.",
  )
  const [companyName, setCompanyName] = useState("ExchangeWise")
  const [showYear, setShowYear] = useState(true)
  const [additionalText, setAdditionalText] = useState("Exchange rates provided by Open Exchange Rates API.")
  const [successMessage, setSuccessMessage] = useState("")

  // Load saved data on component mount
  useEffect(() => {
    const savedCopyrightText = localStorage.getItem("copyrightText")
    const savedCompanyName = localStorage.getItem("copyrightCompanyName")
    const savedShowYear = localStorage.getItem("copyrightShowYear")
    const savedAdditionalText = localStorage.getItem("copyrightAdditionalText")

    if (savedCopyrightText) setCopyrightText(savedCopyrightText)
    if (savedCompanyName) setCompanyName(savedCompanyName)
    if (savedShowYear) setShowYear(savedShowYear === "true")
    if (savedAdditionalText) setAdditionalText(savedAdditionalText)
  }, [])

  const handleSaveCopyright = () => {
    // Build the new copyright text
    let newCopyrightText = `© ${showYear ? new Date().getFullYear() + " " : ""}${companyName}. All rights reserved.`
    if (additionalText) {
      newCopyrightText += ` ${additionalText}`
    }
    setCopyrightText(newCopyrightText)

    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem("copyrightText", newCopyrightText)
    localStorage.setItem("copyrightCompanyName", companyName)
    localStorage.setItem("copyrightShowYear", showYear.toString())
    localStorage.setItem("copyrightAdditionalText", additionalText)

    setSuccessMessage("Copyright notice updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // In a real application, this would update the actual website copyright
    updateWebsiteCopyright(newCopyrightText)
  }

  // Function to update the website copyright (simulated)
  const updateWebsiteCopyright = (text) => {
    // In a real application, this would make an API call to update the website
    localStorage.setItem("websiteCopyright", text)
    console.log("Website copyright updated:", text)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Copyright Management</h2>
        <p className="text-muted-foreground">Customize the copyright notice displayed in your website's footer.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit Copyright</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Copyright Notice</CardTitle>
              <CardDescription>Customize the copyright text that appears in your website footer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="show-year" checked={showYear} onCheckedChange={setShowYear} />
                  <Label htmlFor="show-year">Include current year</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-text">Additional Text</Label>
                  <Textarea
                    id="additional-text"
                    value={additionalText}
                    onChange={(e) => setAdditionalText(e.target.value)}
                    placeholder="Additional information to include in the copyright notice"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Current Copyright Text</Label>
                  <div className="p-4 border rounded-md bg-muted">
                    <p className="text-sm text-muted-foreground">{copyrightText}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveCopyright}>Save Copyright</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Copyright Preview</CardTitle>
              <CardDescription>Preview how your copyright notice will appear on the website.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 bg-background">
                <div className="mt-8 border-t pt-8">
                  <p className="text-center text-xs text-muted-foreground">{copyrightText}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

