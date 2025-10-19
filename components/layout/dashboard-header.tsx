"use client"

import type React from "react"

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Badge } from "@nextui-org/react"
import { Bell, Search, LogOut, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    // TODO: Integrate with API - POST /api/auth/logout
    router.push("/login")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with API - GET /api/search?q={searchQuery}
    console.log("[v0] Search query:", searchQuery)
  }

  return (
    <header className="h-16 border-b border-primary/10 bg-white/50 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <form onSubmit={handleSearch} className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar casos, denúncias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gradient-to-r from-blue-50 to-white border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </form>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button isIconOnly variant="light" size="sm" className="sm:hidden">
          <Search className="w-5 h-5 text-muted-foreground" />
        </Button>

        <Badge content="5" color="danger" size="sm">
          <Button isIconOnly variant="light" size="sm" className="hover:bg-primary/5 transition-all">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </Button>
        </Badge>

        <Dropdown>
          <DropdownTrigger>
            <Avatar
              as="button"
              size="sm"
              src="/police-officer.jpg"
              className="cursor-pointer transition-transform hover:scale-110"
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="profile" startContent={<User className="w-4 h-4" />}>
              Meu Perfil
            </DropdownItem>
            <DropdownItem key="settings" startContent={<Settings className="w-4 h-4" />}>
              Configurações
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              startContent={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
