"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react"
import type { Profile } from "@/lib/types"
import { useRouter } from "next/navigation"

interface SidebarProps {
  profile: Profile | null
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "supervisor", "analyst", "user"],
  },
  {
    name: "Denúncias",
    href: "/complaints",
    icon: FileText,
    roles: ["admin", "supervisor", "analyst", "user"],
  },
  {
    name: "Usuários",
    href: "/users",
    icon: Users,
    roles: ["admin", "supervisor"],
  },
  {
    name: "Relatórios",
    href: "/reports",
    icon: BarChart3,
    roles: ["admin", "supervisor", "analyst"],
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: ["admin"],
  },
]

export function Sidebar({ profile }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
   
    router.push("/auth/login")
  }

  const filteredNavigation = navigation.filter((item) => profile?.role && item.roles.includes(profile.role))

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MININT</h1>
              <p className="text-xs text-gray-500">Sistema de Denúncias</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-blue-400",
                    collapsed ? "px-2" : "px-3",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && item.name}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-3">
        {!collapsed && profile && (
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{profile.full_name}</p>
              <p className="text-xs text-gray-500 capitalize">{profile.role}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn("w-full text-red-600 hover:text-red-700 hover:bg-red-50", collapsed ? "px-2" : "justify-start")}
        >
          <LogOut className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && "Sair"}
        </Button>
      </div>
    </div>
  )
}
