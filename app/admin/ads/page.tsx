"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Plus, Trash2, LayoutTemplate, Code, ImageIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdsManagement() {
  const [adSlots, setAdSlots] = useState([
    {
      id: 1,
      name: "Left Sidebar",
      location: "left-sidebar",
      isActive: true,
      adType: "google",
      adCode:
        '<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-1234567890"\n     data-ad-slot="1234567890"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>',
      imageUrl: "",
      imageLink: "",
      description: "Ad slot on the left sidebar of the main page",
    },
    {
      id: 2,
      name: "Right Sidebar",
      location: "right-sidebar",
      isActive: true,
      adType: "google",
      adCode:
        '<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-1234567890"\n     data-ad-slot="2345678901"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>',
      imageUrl: "",
      imageLink: "",
      description: "Ad slot on the right sidebar of the main page",
    },
    {
      id: 3,
      name: "Before Footer",
      location: "before-footer",
      isActive: true,
      adType: "custom",
      adCode: "",
      imageUrl: "/placeholder.svg?height=250&width=970",
      imageLink: "https://example.com",
      description: "Ad slot before the footer section",
    },
  ])

  const [successMessage, setSuccessMessage] = useState("")
  const [newAdSlot, setNewAdSlot] = useState({
    name: "",
    location: "",
    isActive: true,
    adType: "google",
    adCode: "",
    imageUrl: "",
    imageLink: "",
    description: "",
  })
  const [editingAdSlot, setEditingAdSlot] = useState<any>(null)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  // Load saved data on component mount
  useEffect(() => {
    const savedAdSlots = localStorage.getItem("adminAdSlots")
    if (savedAdSlots) {
      try {
        setAdSlots(JSON.parse(savedAdSlots))
      } catch (e) {
        console.error("Error parsing saved ad slots:", e)
      }
    }
  }, [])

  const locationOptions = [
    { value: "left-sidebar", label: "Left Sidebar" },
    { value: "right-sidebar", label: "Right Sidebar" },
    { value: "before-footer", label: "Before Footer" },
    { value: "after-header", label: "After Header" },
    { value: "in-content", label: "In Content" },
  ]

  const handleSaveAds = () => {
    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem("adminAdSlots", JSON.stringify(adSlots))

    setSuccessMessage("Ad slots updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // In a real application, this would update the actual website ads
    updateWebsiteAds(adSlots)
  }

  const handleAddAdSlot = () => {
    const newId = Math.max(...adSlots.map((slot) => slot.id), 0) + 1
    const updatedAdSlots = [...adSlots, { ...newAdSlot, id: newId }]
    setAdSlots(updatedAdSlots)

    // Save to localStorage
    localStorage.setItem("adminAdSlots", JSON.stringify(updatedAdSlots))

    setNewAdSlot({
      name: "",
      location: "",
      isActive: true,
      adType: "google",
      adCode: "",
      imageUrl: "",
      imageLink: "",
      description: "",
    })

    setSuccessMessage("Ad slot added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // Update website ads
    updateWebsiteAds(updatedAdSlots)
  }

  const handleEditAdSlot = () => {
    if (editingAdSlot) {
      const updatedAdSlots = adSlots.map((slot) => (slot.id === editingAdSlot.id ? editingAdSlot : slot))
      setAdSlots(updatedAdSlots)

      // Save to localStorage
      localStorage.setItem("adminAdSlots", JSON.stringify(updatedAdSlots))

      setEditingAdSlot(null)
      setSuccessMessage("Ad slot updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)

      // Update website ads
      updateWebsiteAds(updatedAdSlots)
    }
  }

  const handleDeleteAdSlot = (id) => {
    const updatedAdSlots = adSlots.filter((slot) => slot.id !== id)
    setAdSlots(updatedAdSlots)

    // Save to localStorage
    localStorage.setItem("adminAdSlots", JSON.stringify(updatedAdSlots))

    setConfirmDelete(null)
    setSuccessMessage("Ad slot deleted successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // Update website ads
    updateWebsiteAds(updatedAdSlots)
  }

  const updateAdSlot = (id, field, value) => {
    setAdSlots(adSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)))
  }

  // Function to update the website ads (simulated)
  const updateWebsiteAds = (updatedAdSlots) => {
    // In a real application, this would make an API call to update the website
    localStorage.setItem("websiteAds", JSON.stringify(updatedAdSlots))
    console.log("Website ads updated:", updatedAdSlots)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ads Management</h2>
        <p className="text-muted-foreground">Manage advertisement slots and content on your website.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="ad-slots">
        <TabsList>
          <TabsTrigger value="ad-slots">Ad Slots</TabsTrigger>
          <TabsTrigger value="add-new">Add New Slot</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="ad-slots">
          <Card>
            <CardHeader>
              <CardTitle>Ad Slots</CardTitle>
              <CardDescription>Manage existing advertisement slots on your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adSlots.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell className="font-medium">{slot.name}</TableCell>
                      <TableCell>{slot.location.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</TableCell>
                      <TableCell className="capitalize">{slot.adType}</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={slot.isActive}
                          onCheckedChange={(checked) => updateAdSlot(slot.id, "isActive", checked)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingAdSlot({ ...slot })}>
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Edit Ad Slot</DialogTitle>
                                <DialogDescription>Make changes to the ad slot details below.</DialogDescription>
                              </DialogHeader>
                              {editingAdSlot && (
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-ad-name">Ad Slot Name</Label>
                                      <Input
                                        id="edit-ad-name"
                                        value={editingAdSlot.name}
                                        onChange={(e) => setEditingAdSlot({ ...editingAdSlot, name: e.target.value })}
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-ad-location">Location</Label>
                                      <Select
                                        value={editingAdSlot.location}
                                        onValueChange={(value) =>
                                          setEditingAdSlot({ ...editingAdSlot, location: value })
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {locationOptions.map((location) => (
                                            <SelectItem key={location.value} value={location.value}>
                                              {location.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="edit-ad-description">Description</Label>
                                    <Textarea
                                      id="edit-ad-description"
                                      value={editingAdSlot.description}
                                      onChange={(e) =>
                                        setEditingAdSlot({ ...editingAdSlot, description: e.target.value })
                                      }
                                      rows={2}
                                    />
                                  </div>

                                  <div className="space-y-4">
                                    <Label>Ad Type</Label>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                      <div
                                        className={`border rounded-md p-4 cursor-pointer ${
                                          editingAdSlot.adType === "google" ? "border-primary bg-primary/5" : ""
                                        }`}
                                        onClick={() => setEditingAdSlot({ ...editingAdSlot, adType: "google" })}
                                      >
                                        <div className="flex items-center gap-2">
                                          <Code className="h-5 w-5 text-primary" />
                                          <h3 className="font-medium">Google AdSense</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                          Use Google AdSense code for dynamic ads
                                        </p>
                                      </div>

                                      <div
                                        className={`border rounded-md p-4 cursor-pointer ${
                                          editingAdSlot.adType === "custom" ? "border-primary bg-primary/5" : ""
                                        }`}
                                        onClick={() => setEditingAdSlot({ ...editingAdSlot, adType: "custom" })}
                                      >
                                        <div className="flex items-center gap-2">
                                          <ImageIcon className="h-5 w-5 text-primary" />
                                          <h3 className="font-medium">Custom Banner</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                          Upload your own banner image with a custom link
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {editingAdSlot.adType === "google" && (
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-ad-code">AdSense Code</Label>
                                      <Textarea
                                        id="edit-ad-code"
                                        value={editingAdSlot.adCode}
                                        onChange={(e) => setEditingAdSlot({ ...editingAdSlot, adCode: e.target.value })}
                                        rows={6}
                                        className="font-mono text-xs"
                                      />
                                    </div>
                                  )}

                                  {editingAdSlot.adType === "custom" && (
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-image-url">Image URL</Label>
                                        <Input
                                          id="edit-image-url"
                                          value={editingAdSlot.imageUrl}
                                          onChange={(e) =>
                                            setEditingAdSlot({ ...editingAdSlot, imageUrl: e.target.value })
                                          }
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="edit-image-link">Link URL</Label>
                                        <Input
                                          id="edit-image-link"
                                          value={editingAdSlot.imageLink}
                                          onChange={(e) =>
                                            setEditingAdSlot({ ...editingAdSlot, imageLink: e.target.value })
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}

                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id="edit-ad-active"
                                      checked={editingAdSlot.isActive}
                                      onCheckedChange={(checked) =>
                                        setEditingAdSlot({ ...editingAdSlot, isActive: checked })
                                      }
                                    />
                                    <Label htmlFor="edit-ad-active">Active</Label>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button onClick={handleEditAdSlot}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setConfirmDelete(slot.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Delete</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this ad slot? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2 sm:gap-0">
                                <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => handleDeleteAdSlot(confirmDelete)}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between">
                <Button onClick={handleSaveAds}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const tabsList = document.querySelector('[role="tablist"]')
                    const addNewTab = tabsList?.querySelector('[value="add-new"]')
                    if (addNewTab instanceof HTMLElement) {
                      addNewTab.click()
                    }
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Ad Slot
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-new">
          <Card>
            <CardHeader>
              <CardTitle>Add New Ad Slot</CardTitle>
              <CardDescription>Create a new advertisement slot for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ad-name">Ad Slot Name</Label>
                  <Input
                    id="ad-name"
                    value={newAdSlot.name}
                    onChange={(e) => setNewAdSlot({ ...newAdSlot, name: e.target.value })}
                    placeholder="e.g. Homepage Sidebar"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-location">Location</Label>
                  <Select
                    value={newAdSlot.location}
                    onValueChange={(value) => setNewAdSlot({ ...newAdSlot, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-description">Description</Label>
                <Textarea
                  id="ad-description"
                  value={newAdSlot.description}
                  onChange={(e) => setNewAdSlot({ ...newAdSlot, description: e.target.value })}
                  placeholder="Brief description of this ad slot"
                />
              </div>

              <div className="space-y-4">
                <Label>Ad Type</Label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div
                    className={`border rounded-md p-4 cursor-pointer ${
                      newAdSlot.adType === "google" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setNewAdSlot({ ...newAdSlot, adType: "google" })}
                  >
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Google AdSense</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Use Google AdSense code for dynamic ads</p>
                  </div>

                  <div
                    className={`border rounded-md p-4 cursor-pointer ${
                      newAdSlot.adType === "custom" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setNewAdSlot({ ...newAdSlot, adType: "custom" })}
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Custom Banner</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Upload your own banner image with a custom link
                    </p>
                  </div>
                </div>
              </div>

              {newAdSlot.adType === "google" && (
                <div className="space-y-2">
                  <Label htmlFor="ad-code">AdSense Code</Label>
                  <Textarea
                    id="ad-code"
                    value={newAdSlot.adCode}
                    onChange={(e) => setNewAdSlot({ ...newAdSlot, adCode: e.target.value })}
                    placeholder="Paste your Google AdSense code here"
                    rows={6}
                    className="font-mono text-xs"
                  />
                </div>
              )}

              {newAdSlot.adType === "custom" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <Input
                      id="image-url"
                      value={newAdSlot.imageUrl}
                      onChange={(e) => setNewAdSlot({ ...newAdSlot, imageUrl: e.target.value })}
                      placeholder="https://example.com/banner.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image-link">Link URL</Label>
                    <Input
                      id="image-link"
                      value={newAdSlot.imageLink}
                      onChange={(e) => setNewAdSlot({ ...newAdSlot, imageLink: e.target.value })}
                      placeholder="https://example.com/landing-page"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="ad-active"
                  checked={newAdSlot.isActive}
                  onCheckedChange={(checked) => setNewAdSlot({ ...newAdSlot, isActive: checked })}
                />
                <Label htmlFor="ad-active">Active</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAddAdSlot}
                disabled={
                  !newAdSlot.name ||
                  !newAdSlot.location ||
                  (newAdSlot.adType === "google" && !newAdSlot.adCode) ||
                  (newAdSlot.adType === "custom" && (!newAdSlot.imageUrl || !newAdSlot.imageLink))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Ad Slot
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Ad Settings</CardTitle>
              <CardDescription>Configure global settings for advertisements on your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Enable Ads</h3>
                  <p className="text-sm text-muted-foreground">Turn all advertisements on or off globally</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adsense-id">Google AdSense Publisher ID</Label>
                <Input id="adsense-id" defaultValue="ca-pub-1234567890" placeholder="ca-pub-XXXXXXXXXX" />
                <p className="text-xs text-muted-foreground">
                  Your Google AdSense publisher ID will be used for all Google ads on the site.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ad-header-code">Global Ad Header Code</Label>
                <Textarea
                  id="ad-header-code"
                  defaultValue="<script async src=\"
                  https:placeholder="Code to be included in the <head> section" //pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890\" crossorigin=\"anonymous\"></script>"
                  rows={4}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-muted-foreground">
                  This code will be added to the header of all pages on your website.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ad-desktop-limit">Desktop Ad Limit</Label>
                  <Input id="ad-desktop-limit" type="number" defaultValue="3" min="0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-mobile-limit">Mobile Ad Limit</Label>
                  <Input id="ad-mobile-limit" type="number" defaultValue="2" min="0" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAds}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Ad Slots Preview</CardTitle>
              <CardDescription>Preview how ad slots will appear on your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2 border border-dashed border-primary/50 rounded-md p-4 flex items-center justify-center min-h-[300px] bg-primary/5">
                    <div className="text-center">
                      <LayoutTemplate className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Left Sidebar Ad</p>
                    </div>
                  </div>

                  <div className="col-span-8 border rounded-md p-4 min-h-[500px]">
                    <p className="text-center text-muted-foreground">Main Content Area</p>
                  </div>

                  <div className="col-span-2 border border-dashed border-primary/50 rounded-md p-4 flex items-center justify-center min-h-[300px] bg-primary/5">
                    <div className="text-center">
                      <LayoutTemplate className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Right Sidebar Ad</p>
                    </div>
                  </div>

                  <div className="col-span-12 border border-dashed border-primary/50 rounded-md p-4 flex items-center justify-center h-[100px] bg-primary/5 mt-4">
                    <div className="text-center">
                      <LayoutTemplate className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Before Footer Ad</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ad Slot Dimensions</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead>Desktop Size</TableHead>
                      <TableHead>Mobile Size</TableHead>
                      <TableHead>Recommended Format</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Left Sidebar</TableCell>
                      <TableCell>300 x 600 px</TableCell>
                      <TableCell>320 x 100 px</TableCell>
                      <TableCell>Vertical Banner</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Right Sidebar</TableCell>
                      <TableCell>300 x 600 px</TableCell>
                      <TableCell>320 x 100 px</TableCell>
                      <TableCell>Vertical Banner</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Before Footer</TableCell>
                      <TableCell>970 x 250 px</TableCell>
                      <TableCell>320 x 100 px</TableCell>
                      <TableCell>Horizontal Banner</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

