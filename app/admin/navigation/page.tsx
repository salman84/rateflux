"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Plus, Trash2, ArrowUp, ArrowDown, MenuIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NavigationManagement() {
  const [headerItems, setHeaderItems] = useState([
    { id: 1, label: "Live Rates", url: "/rates", isExternal: false, isActive: true, order: 1 },
    { id: 2, label: "Converter", url: "/converter", isExternal: false, isActive: true, order: 2 },
    { id: 3, label: "About", url: "/about", isExternal: false, isActive: true, order: 3 },
  ])

  const [footerSections, setFooterSections] = useState([
    {
      id: 1,
      title: "Quick Links",
      items: [
        { id: 1, label: "Live Rates", url: "/rates", isExternal: false, isActive: true },
        { id: 2, label: "Currency Converter", url: "/converter", isExternal: false, isActive: true },
        { id: 3, label: "About Us", url: "/about", isExternal: false, isActive: true },
      ],
    },
    {
      id: 2,
      title: "Legal",
      items: [
        { id: 4, label: "Privacy Policy", url: "/privacy", isExternal: false, isActive: true },
        { id: 5, label: "Terms of Service", url: "/terms", isExternal: false, isActive: true },
        { id: 6, label: "Disclaimer", url: "/disclaimer", isExternal: false, isActive: true },
        { id: 7, label: "Cookie Policy", url: "/cookies", isExternal: false, isActive: true },
      ],
    },
  ])

  const [successMessage, setSuccessMessage] = useState("")
  const [newHeaderItem, setNewHeaderItem] = useState({ label: "", url: "", isExternal: false })
  const [newFooterItem, setNewFooterItem] = useState({ label: "", url: "", isExternal: false, section: "1" })
  const [newFooterSection, setNewFooterSection] = useState({ title: "" })

  const handleSaveNavigation = () => {
    setSuccessMessage("Navigation updated successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleAddHeaderItem = () => {
    const newId = Math.max(...headerItems.map((item) => item.id), 0) + 1
    setHeaderItems([
      ...headerItems,
      {
        ...newHeaderItem,
        id: newId,
        isActive: true,
        order: headerItems.length + 1,
      },
    ])
    setNewHeaderItem({ label: "", url: "", isExternal: false })
    setSuccessMessage("Header item added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleAddFooterItem = () => {
    const sectionId = Number.parseInt(newFooterItem.section)
    const section = footerSections.find((s) => s.id === sectionId)

    if (section) {
      const newId = Math.max(...footerSections.flatMap((s) => s.items.map((i) => i.id)), 0) + 1
      const updatedSections = footerSections.map((s) => {
        if (s.id === sectionId) {
          return {
            ...s,
            items: [
              ...s.items,
              {
                id: newId,
                label: newFooterItem.label,
                url: newFooterItem.url,
                isExternal: newFooterItem.isExternal,
                isActive: true,
              },
            ],
          }
        }
        return s
      })

      setFooterSections(updatedSections)
      setNewFooterItem({ label: "", url: "", isExternal: false, section: "1" })
      setSuccessMessage("Footer item added successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleAddFooterSection = () => {
    const newId = Math.max(...footerSections.map((s) => s.id)) + 1
    setFooterSections([...footerSections, { id: newId, title: newFooterSection.title, items: [] }])
    setNewFooterSection({ title: "" })
    setSuccessMessage("Footer section added successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteHeaderItem = (id) => {
    setHeaderItems(headerItems.filter((item) => item.id !== id))
  }

  const handleDeleteFooterItem = (sectionId, itemId) => {
    const updatedSections = footerSections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter((item) => item.id !== itemId),
        }
      }
      return section
    })

    setFooterSections(updatedSections)
  }

  const handleDeleteFooterSection = (sectionId) => {
    setFooterSections(footerSections.filter((section) => section.id !== sectionId))
  }

  const moveHeaderItem = (id, direction) => {
    const index = headerItems.findIndex((item) => item.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === headerItems.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newItems = [...headerItems]
    const temp = newItems[index]
    newItems[index] = newItems[newIndex]
    newItems[newIndex] = temp

    // Update order
    newItems.forEach((item, i) => {
      item.order = i + 1
    })

    setHeaderItems(newItems)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Header & Footer Management</h2>
        <p className="text-muted-foreground">Customize the navigation menus in your website's header and footer.</p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="header">
        <TabsList>
          <TabsTrigger value="header">Header Navigation</TabsTrigger>
          <TabsTrigger value="footer">Footer Navigation</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="header">
          <Card>
            <CardHeader>
              <CardTitle>Header Navigation</CardTitle>
              <CardDescription>Manage the navigation links in your website's header.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-center">External</TableHead>
                      <TableHead className="text-center">Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {headerItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.order}</TableCell>
                        <TableCell>
                          <Input
                            value={item.label}
                            onChange={(e) => {
                              const updatedItems = headerItems.map((i) =>
                                i.id === item.id ? { ...i, label: e.target.value } : i,
                              )
                              setHeaderItems(updatedItems)
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.url}
                            onChange={(e) => {
                              const updatedItems = headerItems.map((i) =>
                                i.id === item.id ? { ...i, url: e.target.value } : i,
                              )
                              setHeaderItems(updatedItems)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={item.isExternal}
                            onCheckedChange={(checked) => {
                              const updatedItems = headerItems.map((i) =>
                                i.id === item.id ? { ...i, isExternal: checked } : i,
                              )
                              setHeaderItems(updatedItems)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={item.isActive}
                            onCheckedChange={(checked) => {
                              const updatedItems = headerItems.map((i) =>
                                i.id === item.id ? { ...i, isActive: checked } : i,
                              )
                              setHeaderItems(updatedItems)
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHeaderItem(item.id, "up")}
                              disabled={item.order === 1}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHeaderItem(item.id, "down")}
                              disabled={item.order === headerItems.length}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteHeaderItem(item.id)}>
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
                <h3 className="text-lg font-medium">Add New Header Item</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="new-header-label">Label</Label>
                    <Input
                      id="new-header-label"
                      value={newHeaderItem.label}
                      onChange={(e) => setNewHeaderItem({ ...newHeaderItem, label: e.target.value })}
                      placeholder="Menu Item Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-header-url">URL</Label>
                    <Input
                      id="new-header-url"
                      value={newHeaderItem.url}
                      onChange={(e) => setNewHeaderItem({ ...newHeaderItem, url: e.target.value })}
                      placeholder="/page-url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>External Link</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="new-header-external"
                        checked={newHeaderItem.isExternal}
                        onCheckedChange={(checked) => setNewHeaderItem({ ...newHeaderItem, isExternal: checked })}
                      />
                      <Label htmlFor="new-header-external">Opens in new tab</Label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleAddHeaderItem} disabled={!newHeaderItem.label || !newHeaderItem.url}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Header Item
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNavigation}>Save Header Navigation</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Navigation</CardTitle>
              <CardDescription>Manage the navigation sections and links in your website's footer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {footerSections.map((section) => (
                <div key={section.id} className="space-y-4 border-b pb-6 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MenuIcon className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">{section.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteFooterSection(section.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead className="text-center">External</TableHead>
                        <TableHead className="text-center">Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input
                              value={item.label}
                              onChange={(e) => {
                                const updatedSections = footerSections.map((s) => {
                                  if (s.id === section.id) {
                                    return {
                                      ...s,
                                      items: s.items.map((i) =>
                                        i.id === item.id ? { ...i, label: e.target.value } : i,
                                      ),
                                    }
                                  }
                                  return s
                                })
                                setFooterSections(updatedSections)
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={item.url}
                              onChange={(e) => {
                                const updatedSections = footerSections.map((s) => {
                                  if (s.id === section.id) {
                                    return {
                                      ...s,
                                      items: s.items.map((i) => (i.id === item.id ? { ...i, url: e.target.value } : i)),
                                    }
                                  }
                                  return s
                                })
                                setFooterSections(updatedSections)
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={item.isExternal}
                              onCheckedChange={(checked) => {
                                const updatedSections = footerSections.map((s) => {
                                  if (s.id === section.id) {
                                    return {
                                      ...s,
                                      items: s.items.map((i) => (i.id === item.id ? { ...i, isExternal: checked } : i)),
                                    }
                                  }
                                  return s
                                })
                                setFooterSections(updatedSections)
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={item.isActive}
                              onCheckedChange={(checked) => {
                                const updatedSections = footerSections.map((s) => {
                                  if (s.id === section.id) {
                                    return {
                                      ...s,
                                      items: s.items.map((i) => (i.id === item.id ? { ...i, isActive: checked } : i)),
                                    }
                                  }
                                  return s
                                })
                                setFooterSections(updatedSections)
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteFooterItem(section.id, item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Footer Item</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-footer-section">Section</Label>
                    <Select
                      value={newFooterItem.section}
                      onValueChange={(value) => setNewFooterItem({ ...newFooterItem, section: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {footerSections.map((section) => (
                          <SelectItem key={section.id} value={section.id.toString()}>
                            {section.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-footer-label">Label</Label>
                    <Input
                      id="new-footer-label"
                      value={newFooterItem.label}
                      onChange={(e) => setNewFooterItem({ ...newFooterItem, label: e.target.value })}
                      placeholder="Menu Item Label"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-footer-url">URL</Label>
                    <Input
                      id="new-footer-url"
                      value={newFooterItem.url}
                      onChange={(e) => setNewFooterItem({ ...newFooterItem, url: e.target.value })}
                      placeholder="/page-url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>External Link</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="new-footer-external"
                        checked={newFooterItem.isExternal}
                        onCheckedChange={(checked) => setNewFooterItem({ ...newFooterItem, isExternal: checked })}
                      />
                      <Label htmlFor="new-footer-external">Opens in new tab</Label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAddFooterItem}
                  disabled={!newFooterItem.label || !newFooterItem.url || !newFooterItem.section}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Footer Item
                </Button>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">Add New Footer Section</h3>
                <div className="flex items-end gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="new-section-title">Section Title</Label>
                    <Input
                      id="new-section-title"
                      value={newFooterSection.title}
                      onChange={(e) => setNewFooterSection({ ...newFooterSection, title: e.target.value })}
                      placeholder="e.g. Resources, Support, etc."
                    />
                  </div>

                  <Button onClick={handleAddFooterSection} disabled={!newFooterSection.title}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNavigation}>Save Footer Navigation</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Preview</CardTitle>
              <CardDescription>Preview how your navigation will appear on the website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Header Navigation</h3>
                <div className="border rounded-md p-4 bg-background">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary"></div>
                      <span className="font-bold">ExchangeWise</span>
                    </div>
                    <div className="flex-1"></div>
                    <nav className="flex gap-6">
                      {headerItems
                        .filter((item) => item.isActive)
                        .sort((a, b) => a.order - b.order)
                        .map((item) => (
                          <div key={item.id} className="text-sm font-medium hover:text-primary cursor-pointer">
                            {item.label}
                          </div>
                        ))}
                    </nav>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Footer Navigation</h3>
                <div className="border rounded-md p-4 bg-background">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary"></div>
                        <span className="font-bold">ExchangeWise</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Real-time currency exchange rates and conversion for over 170 currencies worldwide.
                      </p>
                    </div>

                    {footerSections.map((section) => (
                      <div key={section.id}>
                        <h3 className="mb-3 text-sm font-medium">{section.title}</h3>
                        <ul className="space-y-2 text-sm">
                          {section.items
                            .filter((item) => item.isActive)
                            .map((item) => (
                              <li key={item.id}>
                                <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                  {item.label}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
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

