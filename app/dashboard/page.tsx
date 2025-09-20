import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentComplaints } from "@/components/dashboard/recent-complaints"
import { ActivityChart } from "@/components/dashboard/activity-chart"

export default async function DashboardPage() {
  

  // Buscar denúncias recentes (últimas 5)

  // Dados simulados para o gráfico (em produção, viria do banco)
  const chartData = [
    { name: "Seg", denuncias: 12, resolvidas: 8 },
    { name: "Ter", denuncias: 19, resolvidas: 15 },
    { name: "Qua", denuncias: 15, resolvidas: 12 },
    { name: "Qui", denuncias: 22, resolvidas: 18 },
    { name: "Sex", denuncias: 18, resolvidas: 14 },
    { name: "Sáb", denuncias: 8, resolvidas: 6 },
    { name: "Dom", denuncias: 5, resolvidas: 4 },
  ]

  return (
    <div className="space-y-6">
      <Header title="Dashboard" subtitle={`Bem-vindo, `} />

      <div className="px-6 space-y-6">
        <StatsCards stats={{
          total: 0,
          pending: 0,
          resolved: 0,
          urgent: 0
        }}  />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentComplaints complaints={[]}  />
          <ActivityChart data={chartData} />
        </div>
      </div>
    </div>
  )
}
