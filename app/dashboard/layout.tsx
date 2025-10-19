"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { MobileNavTabs } from "@/components/layout/mobile-nav-tabs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-background via-background to-blue-50 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <MobileNavTabs />
    </div>
  )
}
