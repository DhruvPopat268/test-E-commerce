"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  Users,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  icon: React.ElementType
  href?: string
  active?: boolean
  children?: NavItem[]
  expanded?: boolean
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Category",
      icon: Package,
      children: [
        {
          label: "Categories",
          href: "/dashboard/categories",
          active: pathname === "/dashboard/categories",
          icon: ChevronRight,
        },
        {
          label: "Sub Categories",
          href: "/dashboard/subcategories",
          active: pathname === "/dashboard/subcategories",
          icon: ChevronRight,
        },
      ],
      expanded: pathname.includes("/dashboard/categories") || pathname.includes("/dashboard/subcategories"),
    },
    {
      label: "Product",
      icon: ShoppingBag,
      children: [
        {
          label: "Product Attribute",
          href: "/dashboard/attributes",
          active: pathname === "/dashboard/attributes",
          icon: ChevronRight,
        },
        {
          label: "Product List",
          href: "/dashboard/products",
          active: pathname === "/dashboard/products",
          icon: ChevronRight,
        },
        {
          label: "Bulk Import",
          href: "/dashboard/bulk-import",
          active: pathname === "/dashboard/bulk-import",
          icon: ChevronRight,
        },
        {
          label: "Bulk Export",
          href: "/dashboard/bulk-export",
          active: pathname === "/dashboard/bulk-export",
          icon: ChevronRight,
        },
        {
          label: "Limited Stocks",
          href: "/dashboard/limited-stocks",
          active: pathname === "/dashboard/limited-stocks",
          icon: ChevronRight,
        },
      ],
      expanded:
        pathname.includes("/dashboard/attributes") ||
        pathname.includes("/dashboard/products") ||
        pathname.includes("/dashboard/bulk-import") ||
        pathname.includes("/dashboard/bulk-export") ||
        pathname.includes("/dashboard/limited-stocks"),
    },
    {
      label: "User Logs",
      icon: Users,
      href: "/dashboard/user-logs",
      active: pathname === "/dashboard/user-logs",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
  ])

  const toggleExpand = (index: number) => {
    setNavItems((prev) => prev.map((item, i) => (i === index ? { ...item, expanded: !item.expanded } : item)))
  }

  const renderNavItems = (items: NavItem[], isMobile = false) => {
    return items.map((item, index) => {
      // If the item has children, render a dropdown
      if (item.children) {
        return (
          <div key={item.label} className="space-y-1">
            <button
              onClick={() => toggleExpand(index)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                item.expanded ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
              )}
            >
              <item.icon className={cn("h-5 w-5", item.expanded ? "text-white" : "text-gray-400")} />
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  item.expanded ? "rotate-180 text-white" : "text-gray-400",
                )}
              />
            </button>
            {item.expanded && (
              <div className="pl-6 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href || "#"}
                    onClick={isMobile ? () => setIsSidebarOpen(false) : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      child.active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                    )}
                  >
                    <span className="h-1 w-1 rounded-full bg-current"></span>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      }

      // Otherwise, render a regular nav item
      return (
        <Link
          key={item.label}
          href={item.href || "#"}
          onClick={isMobile ? () => setIsSidebarOpen(false) : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
            item.active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
          )}
        >
          <item.icon className={cn("h-5 w-5", item.active ? "text-white" : "text-gray-400")} />
          {item.label}
        </Link>
      )
    })
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center justify-center px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Package className="h-8 w-8 text-white" />
              <span className="font-bold text-2xl text-white">Admin</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col px-6 py-4 space-y-1">{renderNavItems(navItems)}</div>
          <div className="p-6">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start text-white bg-gray-800 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="md:pl-72">
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 md:px-8">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <div className="flex flex-col h-full bg-gray-900">
                <div className="h-20 flex items-center px-6 justify-between">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Package className="h-8 w-8 text-white" />
                    <span className="font-bold text-2xl text-white">Admin</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-6 w-6 text-white" />
                  </Button>
                </div>
                <div className="flex-1 flex flex-col px-6 py-4 space-y-1">{renderNavItems(navItems, true)}</div>
                <div className="p-6">
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-white bg-gray-800 hover:bg-gray-700 hover:text-white"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-x-4">
              <div className="hidden md:flex md:items-center md:gap-4">
                <div className="text-sm font-medium">Admin User</div>
              </div>
            </div>
          </div>
        </div>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
