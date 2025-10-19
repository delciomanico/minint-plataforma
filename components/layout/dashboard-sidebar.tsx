"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  Home,
  AlertCircle,
  FolderOpen,
  Users,
  BarChart3,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@nextui-org/react"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: AlertCircle, label: "Denúncias", href: "/dashboard/denuncias" },
  { icon: FolderOpen, label: "Casos", href: "/dashboard/casos" },
  { icon: Users, label: "Histórico Criminal", href: "/dashboard/historico" },
  { icon: BarChart3, label: "Relatórios", href: "/dashboard/relatorios" },
  { icon: Bell, label: "Notificações", href: "/dashboard/notificacoes" },
  { icon: Settings, label: "Administração", href: "/dashboard/admin" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          variant="flat"
          size="lg"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-primary text-white shadow-lg"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside
        className={`fixed md:relative z-40 h-screen bg-gradient-to-b from-white to-blue-50 border-r border-primary/10 transition-all duration-300 ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } ${isMobileOpen ? "w-64" : "w-0 md:w-auto"} flex flex-col shadow-xl md:shadow-none`}
      >
        <div className="p-6 flex items-center justify-between border-b border-primary/10">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-foreground">SGC</h2>
                <p className="text-xs text-muted-foreground">Gestão Criminal</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg mx-auto">
              <Shield className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-md"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary/10">
          <Button
            isIconOnly={isCollapsed}
            variant="light"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-muted-foreground hover:text-foreground hidden md:flex"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="ml-2">Recolher</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </>
  )
}
