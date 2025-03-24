"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Plus, ArrowUp, ArrowDown, LinkIcon } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

const PLATFORM_OPTIONS = [
  { value: "twitter", label: "Twitter", icon: "Twitter" },
  { value: "facebook", label: "Facebook", icon: "Facebook" },
  { value: "instagram", label: "Instagram", icon: "Instagram" },
  { value: "linkedin", label: "LinkedIn", icon: "Linkedin" },
  { value: "youtube", label: "YouTube", icon: "Youtube" },
  { value: "github", label: "GitHub", icon: "Github" },
  { value: "discord", label: "Discord", icon: "MessageSquare" },
  { value: "telegram", label: "Telegram", icon: "Send" },
  { value: "whatsapp", label: "WhatsApp", icon: "Phone" },
  { value: "tiktok", label: "TikTok", icon: "Video" },
]

export default function SocialLinksManagement() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLink, setCurrentLink] = useState<SocialLink | null>(null)
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
    isActive: true,
  })
  const [error, setError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchSocialLinks()
  }, [])

  const fetchSocialLinks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/social")
      const data = await response.json()
      setSocialLinks(data)
    } catch (error) {
      console.error("Error fetching social links:", error)
      toast({
        title: "Error",
        description: "Failed to load social links",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isActive: checked })
  }

  const handlePlatformChange = (value: string) => {
    const platform = PLATFORM_OPTIONS.find(p => p.value === value)
    if (platform) {
      setFormData({
        ...formData,
        platform: value,
        icon: platform.icon
      })
    }
  }

  const resetForm = () => {
    setFormData({
      platform: "",
      url: "",
      icon: "",
      isActive: true,
    })
    setCurrentLink(null)
    setError("")
  }

  const openAddDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (link: SocialLink) => {
    setCurrentLink(link)
    setFormData({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      isActive: link.is_active,
    })
    setIsDialogOpen(true)
  }

  const openDeleteDialog = (link: SocialLink) => {
    setCurrentLink(link)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.platform) {
      setError("Please select a platform")
      return
    }

    if (!formData.url) {
      setError("Please enter a URL")
      return
    }

    try {
      if (currentLink) {
        // Update existing link
        const response = await fetch(`/api/social/${currentLink.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: formData.platform,
            url: formData.url,
            icon: formData.icon,
            is_active: formData.isActive,
          })
        })

        if (!response.ok) {
          throw new Error("Failed to update social link")
        }

        toast({
          title: "Success",
          description: "Social link updated successfully",
        })
      } else {
        // Create new link
        const response = await fetch("/api/social", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            platform: formData.platform,
            url: formData.url,
            icon: formData.icon,
            is_active: formData.isActive,
            display_order: socialLinks.length
          })
        })

        if (!response.ok) {
          throw new Error("Failed to create social link")
        }

        toast({
          title: "Success",
          description: "Social link created successfully",
        })
      }

      // Refresh social links list
      await fetchSocialLinks()
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving social link:", error)
      setError("Failed to save social link. Please try again.")
    }
  }

  const handleDelete = async () => {
    if (!currentLink) return

    try {
      const response = await fetch(`/api/social/${currentLink.id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error("Failed to delete social link")
      }

      toast({
        title: "Success",
        description: "Social link deleted successfully",
      })

      // Refresh social links list
      await fetchSocialLinks()
      setIsDeleteDialogOpen(false)
      setCurrentLink(null)
    } catch (error) {
      console.error("Error deleting social link:", error)
      toast({
        title: "Error",
        description: "Failed to delete social link",
        variant: "destructive"
      })
    }
  }

  const handleMoveUp = async (link: SocialLink, index: number) => {
    if (index === 0) return

    try {
      const prevLink = socialLinks[index - 1]
      
      // Swap display orders
      await Promise.all([
        fetch(`/api/social/${link.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...link,
            display_order: prevLink.display_order
          })
        }),
        fetch(`/api/social/${prevLink.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...prevLink,
            display_order: link.display_order
          })
        })
      ])

      await fetchSocialLinks()
    } catch (error) {
      console.error("Error reordering social links:", error)
      toast({
        title: "Error",
        description: "Failed to reorder social links",
        variant: "destructive"
      })
    }
  }

  const handleMoveDown = async (link: SocialLink, index: number) => {
    if (index === socialLinks.length - 1) return

    try {
      const nextLink = socialLinks[index + 1]
      
      // Swap display orders
      await Promise.all([
        fetch(`/api/social/${link.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...link,
            display_order: nextLink.display_order
          })
        }),
        fetch(`/api/social/${nextLink.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...nextLink,
            display_order: link.display_order
          })
        })
      ])

      await fetchSocialLinks()
    } catch (error) {
      console.error("Error reordering social links:", error)
      toast({
        title: "Error",
        description: "Failed to reorder social links",
        variant: "destructive"
      })
    }
  }

  const getPlatformLabel = (value: string) => {
    const platform = PLATFORM_OPTIONS.find(p => p.value === value)
    return platform ? platform.label : value
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Links</h1>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Social Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Manage your social media presence</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading social links...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socialLinks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No social links found. Add your first social link.
                    </TableCell>
                  </TableRow>
                ) : (
                  socialLinks.map((link, index) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">
                        {getPlatformLabel(link.platform)}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {link.url}
                          <LinkIcon className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${link.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {link.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveUp(link, index)}
                            disabled={index === 0}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveDown(link, index)}
                            disabled={index === socialLinks.length - 1}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(link)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(link)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Social Link Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentLink ? "Edit Social Link" : "Add Social Link"}</DialogTitle>
            <DialogDescription>
              {currentLink ? "Update the social link details" : "Add a new social media link to your website"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={handlePlatformChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORM_OPTIONS.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the {getPlatformLabel(currentLink?.platform || "")} social link. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
