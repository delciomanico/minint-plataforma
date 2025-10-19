"use client"

import { Card, CardBody, Chip, Button } from "@nextui-org/react"
import { Bell, AlertCircle, CheckCircle, Info, Clock } from "lucide-react"

const notifications = [
  {
    id: "1",
    type: "alert",
    title: "Novo caso atribuído",
    message: "Você foi designado para investigar o caso C-2024-045",
    time: "5 minutos atrás",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Caso resolvido",
    message: "O caso C-2024-032 foi marcado como resolvido",
    time: "1 hora atrás",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Nova denúncia registrada",
    message: "Uma nova denúncia foi registrada na sua região",
    time: "3 horas atrás",
    read: true,
  },
  {
    id: "4",
    type: "warning",
    title: "Prazo próximo do vencimento",
    message: "O caso C-2024-028 vence em 2 dias",
    time: "5 horas atrás",
    read: true,
  },
]

const typeConfig = {
  alert: { icon: AlertCircle, color: "danger" as const, bg: "bg-danger/10" },
  success: { icon: CheckCircle, color: "success" as const, bg: "bg-success/10" },
  info: { icon: Info, color: "primary" as const, bg: "bg-primary/10" },
  warning: { icon: Bell, color: "warning" as const, bg: "bg-warning/10" },
}

export function NotificationsView() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Notificações</h1>
          <p className="text-muted-foreground mt-1">Central de alertas e comunicações</p>
        </div>
        <Button variant="flat" size="sm">
          Marcar todas como lidas
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type as keyof typeof typeConfig]
          const Icon = config.icon

          return (
            <Card
              key={notification.id}
              className={`bg-card border transition-colors cursor-pointer ${
                notification.read ? "border-border" : "border-primary/50 bg-primary/5"
              }`}
            >
              <CardBody className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${config.bg} flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-balance">{notification.title}</h3>
                      {!notification.read && (
                        <Chip size="sm" color="primary" variant="dot">
                          Nova
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
