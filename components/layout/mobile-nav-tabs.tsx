"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, FileText, Briefcase, Users, BarChart3, Bell, Settings } from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Início", id: "home" },
  { href: "/dashboard/denuncias", icon: FileText, label: "Denúncias", id: "denuncias" },
  { href: "/dashboard/casos", icon: Briefcase, label: "Casos", id: "casos" },
  { href: "/dashboard/historico", icon: Users, label: "Histórico", id: "historico" },
  { href: "/dashboard/relatorios", icon: BarChart3, label: "Relatórios", id: "relatorios" },
  { href: "/dashboard/notificacoes", icon: Bell, label: "Notificações", id: "notificacoes" },
  { href: "/dashboard/admin", icon: Settings, label: "Admin", id: "admin" },
]

export function MobileNavTabs() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-border shadow-lg z-40">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
