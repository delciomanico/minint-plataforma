import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Profile } from "@/lib/types"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile:Profile = {
  id: '',
  full_name:'',
  email: '',
  role: "admin",
  department: "",
  phone: "",
  avatar_url: "",
  is_active: true,
  created_at: "",
  updated_at: "",
}

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar profile={profile}  />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
