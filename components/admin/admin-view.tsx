"use client"

import { Card, CardBody, CardHeader, Button, Chip, Avatar } from "@nextui-org/react"
import { Users, Shield, Database, Settings, Plus } from "lucide-react"

const users = [
  { id: "1", name: "João Silva", role: "Administrador", status: "Ativo", avatar: "/thoughtful-man.png" },
  { id: "2", name: "Maria Santos", role: "Detetive", status: "Ativo", avatar: "/woman1.png" },
  { id: "3", name: "Carlos Costa", role: "Agente", status: "Ativo", avatar: "/diverse-group-friends.png" },
  { id: "4", name: "Ana Lima", role: "Analista", status: "Inativo", avatar: "/diverse-woman-portrait.png" },
]

const crimeCategories = [
  { id: "1", name: "Roubo", count: 445, color: "primary" },
  { id: "2", name: "Furto", count: 387, color: "secondary" },
  { id: "3", name: "Acidente de Trânsito", count: 256, color: "warning" },
  { id: "4", name: "Agressão", count: 160, color: "danger" },
]

export function AdminView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-balance">Administração</h1>
        <p className="text-muted-foreground mt-1">Gerencie usuários, configurações e categorias</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total de Usuários", value: "48", icon: Users, color: "primary" },
          { label: "Administradores", value: "5", icon: Shield, color: "warning" },
          { label: "Logs de Auditoria", value: "1,234", icon: Database, color: "secondary" },
          { label: "Configurações", value: "12", icon: Settings, color: "success" },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="bg-card border border-border">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border border-border">
          <CardHeader className="border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Gerenciar Usuários</h3>
            <Button size="sm" color="primary" startContent={<Plus className="w-4 h-4" />}>
              Novo Usuário
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-border">
              {users.map((user) => (
                <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.avatar} size="sm" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <Chip size="sm" color={user.status === "Ativo" ? "success" : "default"} variant="flat">
                      {user.status}
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader className="border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Categorias de Crime</h3>
            <Button size="sm" variant="flat" startContent={<Plus className="w-4 h-4" />}>
              Nova Categoria
            </Button>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-border">
              {crimeCategories.map((category) => (
                <div key={category.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Chip size="sm" variant="flat">
                      {category.count} casos
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="bg-card border border-border">
        <CardHeader className="border-b border-border">
          <h3 className="font-semibold">Logs de Auditoria Recentes</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-border">
            {[
              { action: "Login realizado", user: "João Silva", time: "2 minutos atrás" },
              { action: "Caso C-2024-045 atualizado", user: "Maria Santos", time: "15 minutos atrás" },
              { action: "Nova denúncia registrada", user: "Sistema", time: "1 hora atrás" },
              { action: "Usuário criado", user: "João Silva", time: "3 horas atrás" },
            ].map((log, idx) => (
              <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">Por: {log.user}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
