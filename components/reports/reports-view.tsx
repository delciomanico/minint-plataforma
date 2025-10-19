"use client"

import { Card, CardBody, CardHeader, Select, SelectItem, Button } from "@nextui-org/react"
import { BarChart3, Download, Calendar, MapPin, TrendingUp } from "lucide-react"

export function ReportsView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Relatórios e Estatísticas</h1>
          <p className="text-muted-foreground mt-1">Análise de dados e métricas do sistema</p>
        </div>
        <Button color="primary" startContent={<Download className="w-4 h-4" />}>
          Exportar Relatório
        </Button>
      </div>

      <Card className="bg-card border border-border">
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              placeholder="Período"
              className="md:w-48"
              variant="bordered"
              defaultSelectedKeys={["30days"]}
              startContent={<Calendar className="w-4 h-4 text-muted-foreground" />}
            >
              <SelectItem key="7days">Últimos 7 dias</SelectItem>
              <SelectItem key="30days">Últimos 30 dias</SelectItem>
              <SelectItem key="90days">Últimos 90 dias</SelectItem>
              <SelectItem key="year">Último ano</SelectItem>
            </Select>
            <Select
              placeholder="Região"
              className="md:w-48"
              variant="bordered"
              defaultSelectedKeys={["all"]}
              startContent={<MapPin className="w-4 h-4 text-muted-foreground" />}
            >
              <SelectItem key="all">Todas as regiões</SelectItem>
              <SelectItem key="centro">Centro</SelectItem>
              <SelectItem key="norte">Zona Norte</SelectItem>
              <SelectItem key="sul">Zona Sul</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total de Denúncias", value: "1,248", change: "+12.5%", icon: BarChart3 },
          { label: "Taxa de Resolução", value: "78.3%", change: "+5.2%", icon: TrendingUp },
          { label: "Tempo Médio", value: "12.5 dias", change: "-8.1%", icon: Calendar },
          { label: "Casos Ativos", value: "89", change: "+3.4%", icon: BarChart3 },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border border-border">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <span className="text-sm text-success">{stat.change}</span>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border border-border">
          <CardHeader className="border-b border-border">
            <h3 className="font-semibold">Crimes por Tipo</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {[
                { type: "Roubo", count: 445, percentage: 35.7, color: "bg-chart-1" },
                { type: "Furto", count: 387, percentage: 31.0, color: "bg-chart-2" },
                { type: "Acidente de Trânsito", count: 256, percentage: 20.5, color: "bg-chart-3" },
                { type: "Agressão", count: 160, percentage: 12.8, color: "bg-chart-4" },
              ].map((crime) => (
                <div key={crime.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{crime.type}</span>
                    <span className="text-sm text-muted-foreground">
                      {crime.count} ({crime.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`${crime.color} h-2.5 rounded-full transition-all`}
                      style={{ width: `${crime.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader className="border-b border-border">
            <h3 className="font-semibold">Eficiência por Unidade</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {[
                { unit: "1ª Delegacia - Centro", efficiency: 85, cases: 145 },
                { unit: "2ª Delegacia - Zona Norte", efficiency: 78, cases: 132 },
                { unit: "3ª Delegacia - Zona Sul", efficiency: 92, cases: 98 },
                { unit: "4ª Delegacia - Zona Leste", efficiency: 71, cases: 156 },
              ].map((unit) => (
                <div key={unit.unit}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{unit.unit}</span>
                    <span className="text-sm text-muted-foreground">
                      {unit.efficiency}% ({unit.cases} casos)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-success h-2.5 rounded-full transition-all"
                      style={{ width: `${unit.efficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="bg-card border border-border">
        <CardHeader className="border-b border-border">
          <h3 className="font-semibold">Mapa de Calor - Ocorrências por Bairro</h3>
        </CardHeader>
        <CardBody className="p-6">
          <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Mapa de calor interativo</p>
              <p className="text-sm mt-1">Integração com API de mapas</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
