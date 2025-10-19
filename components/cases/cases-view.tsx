"use client"

import { useState } from "react"
import { Card, CardBody, Input, Select, SelectItem, Chip, Progress, Avatar, AvatarGroup } from "@nextui-org/react"
import { Search, Filter, Clock, User } from "lucide-react"

const cases = [
  {
    id: "C-2024-001",
    title: "Investigação de Roubo - Veículo",
    type: "Roubo",
    status: "Em Investigação",
    priority: "Alta",
    progress: 65,
    assignedTo: ["Detetive Silva", "Agente Costa"],
    createdAt: "2024-01-10",
    deadline: "2024-02-10",
  },
  {
    id: "C-2024-002",
    title: "Acidente de Trânsito - Av. Brasil",
    type: "Acidente de Trânsito",
    status: "Aguardando Perícia",
    priority: "Média",
    progress: 40,
    assignedTo: ["Perito Santos"],
    createdAt: "2024-01-12",
    deadline: "2024-01-25",
  },
  {
    id: "C-2024-003",
    title: "Agressão em Via Pública",
    type: "Agressão",
    status: "Encaminhado à Justiça",
    priority: "Alta",
    progress: 90,
    assignedTo: ["Detetive Oliveira", "Agente Lima"],
    createdAt: "2024-01-05",
    deadline: "2024-01-20",
  },
]

const statusColors = {
  "Em Investigação": "primary",
  "Aguardando Perícia": "warning",
  "Encaminhado à Justiça": "secondary",
  Resolvido: "success",
  Arquivado: "default",
} as const

const priorityColors = {
  Alta: "danger",
  Média: "warning",
  Baixa: "success",
} as const

export function CasesView() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Casos e Investigações</h1>
          <p className="text-muted-foreground mt-1">Acompanhe o andamento de todos os casos</p>
        </div>
      </div>

      <Card className="bg-card border border-border">
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Buscar casos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="w-4 h-4 text-muted-foreground" />}
              className="flex-1"
              variant="bordered"
            />
            <Select
              placeholder="Filtrar por status"
              className="md:w-64"
              variant="bordered"
              startContent={<Filter className="w-4 h-4 text-muted-foreground" />}
            >
              <SelectItem key="investigacao">Em Investigação</SelectItem>
              <SelectItem key="pericia">Aguardando Perícia</SelectItem>
              <SelectItem key="justica">Encaminhado à Justiça</SelectItem>
              <SelectItem key="resolvido">Resolvido</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4">
        {cases.map((case_) => (
          <Card
            key={case_.id}
            className="bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
          >
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm font-medium text-primary">{case_.id}</span>
                  <Chip size="sm" variant="flat" color="secondary">
                    {case_.type}
                  </Chip>
                  <Chip size="sm" color={statusColors[case_.status as keyof typeof statusColors]} variant="dot">
                    {case_.status}
                  </Chip>
                  <Chip size="sm" color={priorityColors[case_.priority as keyof typeof priorityColors]} variant="flat">
                    Prioridade {case_.priority}
                  </Chip>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-4 text-balance">{case_.title}</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Progresso da Investigação</span>
                    <span className="font-medium">{case_.progress}%</span>
                  </div>
                  <Progress value={case_.progress} color="primary" size="sm" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Responsáveis:</span>
                    <AvatarGroup size="sm" max={3}>
                      {case_.assignedTo.map((person, idx) => (
                        <Avatar
                          key={idx}
                          name={person}
                          size="sm"
                          src={`/placeholder.svg?height=32&width=32&query=${person}`}
                        />
                      ))}
                    </AvatarGroup>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Criado: {case_.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Prazo: {case_.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
