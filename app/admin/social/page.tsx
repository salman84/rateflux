"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Check,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SocialLinksManagement() {
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "twitter", url: "https://twitter.com", icon: "Twitter", isActive: true, order: 1 },
    { id: 2, platform: "facebook", url: "https://facebook.com", icon: "Facebook", isActive: true, order: 2 },
    { id: 3, platform: "github", url: "https://github.com", icon: "Github", isActive: true, order: 3 },
  ])

  const [successMessage, setSuccessMessage] = useState("")
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "", icon: "" })

  const platformOptions = [
    { value: "twitter", label: "Twitter", icon: "Twitter" },
    { value: "facebook", label: "Facebook", icon: "Facebook" },
    { value: "instagram", label: "Instagram", icon: "Instagram" },
    { value: "linkedin", label: "LinkedIn", icon: "Linkedin" },
    { value: "youtube", label: "YouTube", icon: "Youtube" },
    { value: "github", label: "GitHub", icon: "Github" },
  ]

  const handleSaveSocialLinks = () => {
    setSuccessMessage("Social links updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleAddSocialLink = () => {
    const newId = Math.max(...socialLinks.map((link) => link.id), 0) + 1
    const platformInfo = platformOptions.find((p) => p.value === newSocialLink.platform)

    if (platformInfo) {
      setSocialLinks([
        ...socialLinks,
        {
          ...newSocialLink,
          id: newId,
          icon: platformInfo.icon,
          isActive: true,
          order: socialLinks.length + 1,
        },
      ])
      setNewSocialLink({ platform: "", url: "", icon: "" })
      setSuccessMessage("Social link added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleDeleteSocialLink = (id) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id))
  }

  const moveSocialLink = (id, direction) => {
    const index = socialLinks.findIndex((link) => link.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === socialLinks.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newLinks = [...socialLinks]
    const temp = newLinks[index]
    newLinks[index] = newLinks[newIndex]
    newLinks[newIndex] = temp

    // Update order
    newLinks.forEach((link, i) => {
      link.order = i + 1
    })

    setSocialLinks(newLinks)
  }

  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case "Twitter":
        return <Twitter className="h-5 w-5" />
      case "Facebook":
        return <Facebook className="h-5 w-5" />
      case "Instagram":
        return <Instagram className="h-5 w-5" />
      case "Linkedin":
        return <Linkedin className="h-5 w-5" />
      case "Youtube":
        return <Youtube className="h-5 w-5" />
      case "Github":
        return <Github className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Social Links Management</h2>
        <p className="text-muted-foreground">Manage your website's social media links and their display order.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="links">
        <TabsList>
          <TabsTrigger value="links">Social Links</TabsTrigger>
          <TabsTrigger value="display">Display Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Manage your social media profiles and links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-center">Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {socialLinks.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className="font-medium">{link.order}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {renderSocialIcon(link.icon)}
                            <span className="capitalize">{link.platform}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={link.url}
                            onChange={(e) => {
                              const updatedLinks = socialLinks.map((l) =>
                                l.id === link.id ? { ...l, url: e.target.value } : l,
                              )
                              setSocialLinks(updatedLinks)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={link.isActive}
                            onCheckedChange={(checked) => {
                              const updatedLinks = socialLinks.map((l) =>
                                l.id === link.id ? { ...l, isActive: checked } : l,
                              )
                              setSocialLinks(updatedLinks)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveSocialLink(link.id, "up")}
                              disabled={link.order === 1}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveSocialLink(link.id, "down")}
                              disabled={link.order === socialLinks.length}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteSocialLink(link.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Social Link</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-social-platform">Platform</Label>
                    <Select
                      value={newSocialLink.platform}
                      onValueChange={(value) => {
                        const platformInfo = platformOptions.find((p) => p.value === value)
                        setNewSocialLink({
                          ...newSocialLink,
                          platform: value,
                          icon: platformInfo ? platformInfo.icon : "",
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformOptions.map((platform) => (
                          <SelectItem key={platform.value} value={platform.value}>
                            <div className="flex items-center gap-2">
                              {renderSocialIcon(platform.icon)}
                              {platform.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-social-url">URL</Label>
                    <Input
                      id="new-social-url"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                      placeholder="https://example.com/profile"
                    />
                  </div>
                </div>

                <Button onClick={handleAddSocialLink} disabled={!newSocialLink.platform || !newSocialLink.url}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Social Link
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSocialLinks}>Save Social Links</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Configure how social links are displayed on your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Footer Display</h3>
                    <p className="text-sm text-muted-foreground">Show social links in the website footer</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Display Style</h3>
                    <p className="text-sm text-muted-foreground">Choose how social icons are displayed</p>
                  </div>
                  <Select defaultValue="icon-only">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icon-only">Icon Only</SelectItem>
                      <SelectItem value="icon-text">Icon with Text</SelectItem>
                      <SelectItem value="text-only">Text Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Icon Size</h3>
                    <p className="text-sm text-muted-foreground">Set the size of social icons</p>
                  </div>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Section Title</h3>
                    <p className="text-sm text-muted-foreground">Title for the social links section</p>
                  </div>
                  <Input defaultValue="Connect" className="w-40" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSocialLinks}>Save Display Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Social Links Preview</CardTitle>
              <CardDescription>Preview how your social links will appear on the website.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-6 bg-background">
                <h3 className="mb-3 text-sm font-medium">Connect</h3>
                <div className="flex space-x-4">
                  {socialLinks
                    .filter((link) => link.isActive)
                    .sort((a, b) => a.order - b.order)
                    .map((link) => (
                      <div key={link.id} className="text-muted-foreground hover:text-foreground cursor-pointer">
                        {renderSocialIcon(link.icon)}
                        <span className="sr-only">{link.platform}</span>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

