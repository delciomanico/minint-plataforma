"use client"

import { useState } from "react"
import { Card, CardBody, CardHeader, Button, Input, Chip, Avatar, Divider } from "@nextui-org/react"
import { Search, AlertTriangle, FileText, Calendar } from "lucide-react"

const mockCitizens = [
  {
    id: "001",
    name: "Carlos Alberto Santos",
    cpf: "123.456.789-00",
    photo: "/man.jpg",
    status: "Suspeito",
    alerts: 2,
    cases: [
      { id: "C-2024-001", type: "Roubo", status: "Em Investigação", date: "2024-01-10" },
      { id: "C-2023-045", type: "Furto", status: "Condenado", date: "2023-08-15" },
    ],
  },
  {
    id: "002",
    name: "Maria Fernanda Lima",
    cpf: "987.654.321-00",
    photo: "/diverse-woman-portrait.png",
    status: "Absolvido",
    alerts: 0,
    cases: [{ id: "C-2023-089", type: "Acidente de Trânsito", status: "Arquivado", date: "2023-11-20" }],
  },
]

const statusColors = {
  Suspeito: "warning",
  Condenado: "danger",
  Absolvido: "success",
  "Em Investigação": "primary",
} as const

export function CriminalHistoryView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCitizen, setSelectedCitizen] = useState(mockCitizens[0])

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-balance">Histórico Criminal</h1>
        <p className="text-muted-foreground mt-1">Consulte informações sobre cidadãos e seus envolvimentos</p>
      </div>

      <Card className="bg-card border border-border">
        <CardBody className="p-4">
          <Input
            placeholder="Buscar por nome, CPF ou BI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startContent={<Search className="w-4 h-4 text-muted-foreground" />}
            variant="bordered"
            size="lg"
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border border-border lg:col-span-1">
          <CardHeader className="border-b border-border">
            <h3 className="font-semibold">Resultados da Busca</h3>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-border">
              {mockCitizens.map((citizen) => (
                <button
                  key={citizen.id}
                  onClick={() => setSelectedCitizen(citizen)}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                    selectedCitizen.id === citizen.id ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={citizen.photo} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{citizen.name}</p>
                      <p className="text-sm text-muted-foreground">{citizen.cpf}</p>
                    </div>
                    {citizen.alerts > 0 && (
                      <Chip size="sm" color="danger" variant="flat">
                        {citizen.alerts} alertas
                      </Chip>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="bg-card border border-border lg:col-span-2">
          <CardHeader className="border-b border-border">
            <h3 className="font-semibold">Perfil Criminal</h3>
          </CardHeader>
          <CardBody className="p-6 space-y-6">
            <div className="flex items-start gap-6">
              <Avatar src={selectedCitizen.photo} className="w-24 h-24" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{selectedCitizen.name}</h2>
                  <Chip color={statusColors[selectedCitizen.status as keyof typeof statusColors]} variant="flat">
                    {selectedCitizen.status}
                  </Chip>
                </div>
                <p className="text-muted-foreground mb-4">CPF: {selectedCitizen.cpf}</p>

                {selectedCitizen.alerts > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-danger/10 border border-danger/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                    <span className="text-sm font-medium text-danger">
                      {selectedCitizen.alerts} alerta(s) ativo(s) - Reincidência detectada
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Divider />

            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Histórico de Casos
              </h3>
              <div className="space-y-3">
                {selectedCitizen.cases.map((case_) => (
                  <Card key={case_.id} className="bg-muted/50 border border-border">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-medium text-primary">{case_.id}</span>
                        <Chip size="sm" variant="flat" color="secondary">
                          {case_.type}
                        </Chip>
                      </div>
                      <div className="flex items-center justify-between">
                        <Chip size="sm" color={statusColors[case_.status as keyof typeof statusColors]} variant="dot">
                          {case_.status}
                        </Chip>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{case_.date}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>

            <Divider />

            <div className="flex gap-3">
              <Button color="primary" variant="flat">
                Exportar Relatório
              </Button>
              <Button variant="bordered">Adicionar Observação</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
