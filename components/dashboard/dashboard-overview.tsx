"use client"

import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react"
import { AlertCircle, FolderOpen, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Denúncias Ativas",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: AlertCircle,
    color: "warning" as const,
  },
  {
    title: "Casos em Investigação",
    value: "89",
    change: "+5%",
    trend: "up",
    icon: FolderOpen,
    color: "primary" as const,
  },
  {
    title: "Casos Resolvidos",
    value: "1,234",
    change: "+18%",
    trend: "up",
    icon: CheckCircle,
    color: "success" as const,
  },
  {
    title: "Tempo Médio Resolução",
    value: "12.5 dias",
    change: "-8%",
    trend: "down",
    icon: Clock,
    color: "secondary" as const,
  },
]

const recentCases = [
  { id: "C-2024-001", type: "Roubo", status: "Em Investigação", priority: "Alta", date: "2024-01-15" },
  {
    id: "C-2024-002",
    type: "Acidente de Trânsito",
    status: "Aguardando Perícia",
    priority: "Média",
    date: "2024-01-14",
  },
  { id: "C-2024-003", type: "Agressão", status: "Resolvido", priority: "Alta", date: "2024-01-13" },
  { id: "C-2024-004", type: "Furto", status: "Em Investigação", priority: "Baixa", date: "2024-01-12" },
]

const priorityColors = {
  Alta: "danger",
  Média: "warning",
  Baixa: "success",
} as const

const statusColors = {
  "Em Investigação": "primary",
  "Aguardando Perícia": "warning",
  Resolvido: "success",
} as const

export function DashboardOverview() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-balance text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Visão geral do sistema de gestão criminal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

          return (
            <Card
              key={stat.title}
              className="bg-white/60 backdrop-blur-sm border border-primary/10 hover:shadow-lg hover:border-primary/30 transition-all duration-300 shadow-md"
            >
              <CardBody className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendIcon className={`w-4 h-4 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                      <span
                        className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">vs. mês anterior</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/60 backdrop-blur-sm border border-primary/10 hover:shadow-lg hover:border-primary/30 transition-all duration-300 shadow-md">
          <CardHeader className="border-b border-primary/10 pb-4">
            <h3 className="text-lg font-semibold text-foreground">Casos Recentes</h3>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-primary/10">
              {recentCases.map((case_) => (
                <div key={case_.id} className="p-4 hover:bg-primary/5 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {case_.id}
                    </span>
                    <Chip
                      size="sm"
                      color={priorityColors[case_.priority as keyof typeof priorityColors]}
                      variant="flat"
                    >
                      {case_.priority}
                    </Chip>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{case_.type}</p>
                  <div className="flex items-center justify-between">
                    <Chip size="sm" color={statusColors[case_.status as keyof typeof statusColors]} variant="dot">
                      {case_.status}
                    </Chip>
                    <span className="text-xs text-muted-foreground">{case_.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white/60 backdrop-blur-sm border border-primary/10 hover:shadow-lg hover:border-primary/30 transition-all duration-300 shadow-md">
          <CardHeader className="border-b border-primary/10 pb-4">
            <h3 className="text-lg font-semibold text-foreground">Tipos de Crime Mais Comuns</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {[
                { type: "Roubo", count: 45, percentage: 35 },
                { type: "Furto", count: 38, percentage: 30 },
                { type: "Acidente de Trânsito", count: 25, percentage: 20 },
                { type: "Agressão", count: 19, percentage: 15 },
              ].map((crime) => (
                <div key={crime.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{crime.type}</span>
                    <span className="text-sm text-muted-foreground">{crime.count} casos</span>
                  </div>
                  <div className="w-full bg-primary/10 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${crime.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
