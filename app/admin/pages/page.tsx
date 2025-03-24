"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Plus, Trash2, Edit, Eye } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PagesManagement() {
  const [pages, setPages] = useState([
    { id: 1, title: "Home", slug: "/", isActive: true, inHeader: false, inFooter: false, content: "Home page content" },
    {
      id: 2,
      title: "Live Rates",
      slug: "/rates",
      isActive: true,
      inHeader: true,
      inFooter: true,
      content: "Live rates page content",
    },
    {
      id: 3,
      title: "Converter",
      slug: "/converter",
      isActive: true,
      inHeader: true,
      inFooter: true,
      content: "Converter page content",
    },
    {
      id: 4,
      title: "About",
      slug: "/about",
      isActive: true,
      inHeader: true,
      inFooter: true,
      content: "About page content",
    },
    {
      id: 5,
      title: "Privacy Policy",
      slug: "/privacy",
      isActive: true,
      inHeader: false,
      inFooter: true,
      content: "Privacy policy content",
    },
    {
      id: 6,
      title: "Terms of Service",
      slug: "/terms",
      isActive: true,
      inHeader: false,
      inFooter: true,
      content: "Terms of service content",
    },
    {
      id: 7,
      title: "Disclaimer",
      slug: "/disclaimer",
      isActive: true,
      inHeader: false,
      inFooter: true,
      content: "Disclaimer content",
    },
    {
      id: 8,
      title: "Cookie Policy",
      slug: "/cookies",
      isActive: true,
      inHeader: false,
      inFooter: true,
      content: "Cookie policy content",
    },
  ])

  const [successMessage, setSuccessMessage] = useState("")
  const [editingPage, setEditingPage] = useState<any>(null)
  const [viewingPage, setViewingPage] = useState<any>(null)
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: "",
    template: "default",
    isActive: true,
    inHeader: false,
    inFooter: false,
  })
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  // Load saved data on component mount
  useEffect(() => {
    const savedPages = localStorage.getItem("adminPages")
    if (savedPages) {
      try {
        setPages(JSON.parse(savedPages))
      } catch (e) {
        console.error("Error parsing saved pages:", e)
      }
    }
  }, [])

  const handleSavePages = () => {
    // Save to localStorage (in a real app, this would be an API call)
    localStorage.setItem("adminPages", JSON.stringify(pages))

    setSuccessMessage("Pages updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // In a real application, this would update the actual website pages
    updateWebsitePages(pages)
  }

  const togglePageStatus = (id, field) => {
    setPages(pages.map((page) => (page.id === id ? { ...page, [field]: !page[field] } : page)))
  }

  const handleAddPage = () => {
    // In a real app, this would make an API call to create the page
    const newId = Math.max(...pages.map((p) => p.id)) + 1
    const updatedPages = [...pages, { ...newPage, id: newId }]
    setPages(updatedPages)

    // Save to localStorage
    localStorage.setItem("adminPages", JSON.stringify(updatedPages))

    setNewPage({
      title: "",
      slug: "",
      content: "",
      template: "default",
      isActive: true,
      inHeader: false,
      inFooter: false,
    })

    setSuccessMessage("New page added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // Update website pages
    updateWebsitePages(updatedPages)
  }

  const handleEditPage = () => {
    if (editingPage) {
      const updatedPages = pages.map((page) => (page.id === editingPage.id ? editingPage : page))
      setPages(updatedPages)

      // Save to localStorage
      localStorage.setItem("adminPages", JSON.stringify(updatedPages))

      setEditingPage(null)
      setSuccessMessage("Page updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)

      // Update website pages
      updateWebsitePages(updatedPages)
    }
  }

  const handleDeletePage = (id) => {
    // In a real app, this would make an API call to delete the page
    const updatedPages = pages.filter((page) => page.id !== id)
    setPages(updatedPages)

    // Save to localStorage
    localStorage.setItem("adminPages", JSON.stringify(updatedPages))

    setConfirmDelete(null)
    setSuccessMessage("Page deleted successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)

    // Update website pages
    updateWebsitePages(updatedPages)
  }

  // Function to update the website pages (simulated)
  const updateWebsitePages = (updatedPages) => {
    // In a real application, this would make an API call to update the website
    console.log("Website pages updated:", updatedPages)
  }

  // Function to get the actual page content from the website
  const getActualPageContent = (slug) => {
    // In a real application, this would fetch the actual page content from the database
    // For now, we'll simulate this by returning more detailed content based on the slug

    const pageContents = {
      "/": "# Home Page\n\nWelcome to ExchangeWise, your trusted platform for currency exchange rates and conversions.\n\nGet real-time exchange rates and convert between 200+ currencies worldwide with our easy-to-use tools.",
      "/rates":
        "# Live Exchange Rates\n\nCurrent exchange rates against the US Dollar (USD). Rates are updated every hour from Open Exchange Rates API.\n\nView rates for popular currencies, European currencies, and Asian currencies.",
      "/converter":
        "# Currency Converter\n\nConvert between different currencies using real-time exchange rates. Our converter supports over 170 currencies worldwide.\n\nSimply enter the amount, select your currencies, and get instant conversions.",
      "/about":
        "# About ExchangeWise\n\nExchangeWise provides real-time currency exchange rates and conversion tools for travelers, businesses, and financial professionals worldwide.\n\nOur mission is to make currency information accessible, accurate, and easy to understand.",
      "/privacy":
        "# Privacy Policy\n\nAt ExchangeWise, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
      "/terms":
        "# Terms of Service\n\nPlease read these Terms of Service carefully before using the ExchangeWise website operated by ExchangeWise.",
      "/disclaimer":
        "# Disclaimer\n\nThe information provided on ExchangeWise is for general informational purposes only. All information on the site is provided in good faith.",
      "/cookies":
        "# Cookie Policy\n\nThis Cookie Policy explains how ExchangeWise uses cookies and similar technologies to recognize you when you visit our website.",
    }

    // Return the content for the given slug, or a default message if not found
    return pageContents[slug] || `Content for ${slug} page`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pages Management</h2>
        <p className="text-muted-foreground">Add, edit, and manage website pages and their navigation settings.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all-pages">
        <TabsList>
          <TabsTrigger value="all-pages">All Pages</TabsTrigger>
          <TabsTrigger value="add-page">Add New Page</TabsTrigger>
          <TabsTrigger value="navigation">Navigation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all-pages">
          <Card>
            <CardHeader>
              <CardTitle>All Pages</CardTitle>
              <CardDescription>Manage existing pages on your website.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="text-center">Active</TableHead>
                    <TableHead className="text-center">In Header</TableHead>
                    <TableHead className="text-center">In Footer</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.slug}</TableCell>
                      <TableCell className="text-center">
                        <Switch checked={page.isActive} onCheckedChange={() => togglePageStatus(page.id, "isActive")} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={page.inHeader} onCheckedChange={() => togglePageStatus(page.id, "inHeader")} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch checked={page.inFooter} onCheckedChange={() => togglePageStatus(page.id, "inFooter")} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  // Load the actual page content from the website
                                  const pageContent = getActualPageContent(page.slug)
                                  setEditingPage({ ...page, content: pageContent })
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Page</DialogTitle>
                                <DialogDescription>Make changes to the page details below.</DialogDescription>
                              </DialogHeader>
                              {editingPage && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-title">Page Title</Label>
                                    <Input
                                      id="edit-title"
                                      value={editingPage.title}
                                      onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-slug">Page URL</Label>
                                    <Input
                                      id="edit-slug"
                                      value={editingPage.slug}
                                      onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                                      disabled={editingPage.slug === "/"}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-content">Page Content</Label>
                                    <Textarea
                                      id="edit-content"
                                      value={editingPage.content}
                                      onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                                      rows={10}
                                      className="font-mono text-sm"
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button onClick={handleEditPage}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setViewingPage(page)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>View Page</DialogTitle>
                                <DialogDescription>Preview of {viewingPage?.title}</DialogDescription>
                              </DialogHeader>
                              {viewingPage && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Title</Label>
                                    <div className="p-2 border rounded-md">{viewingPage.title}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>URL</Label>
                                    <div className="p-2 border rounded-md">{viewingPage.slug}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Content</Label>
                                    <div className="p-2 border rounded-md h-40 overflow-auto">
                                      {viewingPage.content}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <Label>Active</Label>
                                      <div className="p-2 border rounded-md">{viewingPage.isActive ? "Yes" : "No"}</div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>In Header</Label>
                                      <div className="p-2 border rounded-md">{viewingPage.inHeader ? "Yes" : "No"}</div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>In Footer</Label>
                                      <div className="p-2 border rounded-md">{viewingPage.inFooter ? "Yes" : "No"}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setConfirmDelete(page.id)}
                                disabled={page.slug === "/"}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Delete</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this page? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2 sm:gap-0">
                                <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => handleDeletePage(confirmDelete)}>
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
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePages}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="add-page">
          <Card>
            <CardHeader>
              <CardTitle>Add New Page</CardTitle>
              <CardDescription>Create a new page for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="page-title">Page Title</Label>
                  <Input
                    id="page-title"
                    value={newPage.title}
                    onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                    placeholder="Enter page title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page-slug">Page URL</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">/</span>
                    <Input
                      id="page-slug"
                      value={newPage.slug}
                      onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                      placeholder="page-url"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="page-content">Page Content</Label>
                <Textarea
                  id="page-content"
                  value={newPage.content}
                  onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                  placeholder="Enter page content"
                  rows={10}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="page-template">Page Template</Label>
                  <Select
                    value={newPage.template}
                    onValueChange={(value) => setNewPage({ ...newPage, template: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="full-width">Full Width</SelectItem>
                      <SelectItem value="sidebar">With Sidebar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Show in Header</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="header-nav"
                      checked={newPage.inHeader}
                      onCheckedChange={(checked) => setNewPage({ ...newPage, inHeader: checked })}
                    />
                    <Label htmlFor="header-nav">Include in header navigation</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Show in Footer</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="footer-nav"
                      checked={newPage.inFooter}
                      onCheckedChange={(checked) => setNewPage({ ...newPage, inFooter: checked })}
                    />
                    <Label htmlFor="footer-nav">Include in footer navigation</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddPage}>
                <Plus className="mr-2 h-4 w-4" />
                Add Page
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="navigation">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Settings</CardTitle>
              <CardDescription>Configure which pages appear in the header and footer navigation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Header Navigation</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-center">Include</TableHead>
                      <TableHead>Order</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={`header-${page.id}`}>
                        <TableCell>{page.title}</TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={page.inHeader}
                            onCheckedChange={() => togglePageStatus(page.id, "inHeader")}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            defaultValue={page.inHeader ? pages.filter((p) => p.inHeader).indexOf(page) + 1 : ""}
                            className="w-16"
                            disabled={!page.inHeader}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Footer Navigation</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-center">Include</TableHead>
                      <TableHead>Section</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={`footer-${page.id}`}>
                        <TableCell>{page.title}</TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={page.inFooter}
                            onCheckedChange={() => togglePageStatus(page.id, "inFooter")}
                          />
                        </TableCell>
                        <TableCell>
                          <Select defaultValue="quick-links" disabled={!page.inFooter}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quick-links">Quick Links</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                              <SelectItem value="resources">Resources</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePages}>Save Navigation Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

