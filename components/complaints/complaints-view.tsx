"use client"

import { useState } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react"
import { Plus, Search, MapPin, Calendar, User } from "lucide-react"

const complaints = [
  {
    id: "D-2024-001",
    type: "Roubo",
    description: "Roubo de veículo na Rua Principal",
    location: "Rua Principal, 123 - Centro",
    date: "2024-01-15 14:30",
    status: "Pendente",
    reporter: "João Silva",
    anonymous: false,
  },
  {
    id: "D-2024-002",
    type: "Acidente de Trânsito",
    description: "Colisão entre dois veículos",
    location: "Av. Brasil, 456 - Zona Sul",
    date: "2024-01-15 10:15",
    status: "Em Análise",
    reporter: "Anônimo",
    anonymous: true,
  },
  {
    id: "D-2024-003",
    type: "Agressão",
    description: "Agressão física em via pública",
    location: "Praça Central - Centro",
    date: "2024-01-14 22:45",
    status: "Atribuída",
    reporter: "Maria Santos",
    anonymous: false,
  },
]

const statusColors = {
  Pendente: "warning",
  "Em Análise": "primary",
  Atribuída: "success",
  Arquivada: "default",
} as const

const crimeTypes = [
  { key: "roubo", label: "Roubo" },
  { key: "furto", label: "Furto" },
  { key: "acidente", label: "Acidente de Trânsito" },
  { key: "agressao", label: "Agressão" },
  { key: "outros", label: "Outros" },
]

export function ComplaintsView() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState(new Set([]))
  const [newComplaint, setNewComplaint] = useState({
    type: "",
    description: "",
    location: "",
    anonymous: false,
  })

  const handleSubmitComplaint = () => {
    // TODO: Integrate with API
    // await fetch('/api/complaints', {
    //   method: 'POST',
    //   body: JSON.stringify(newComplaint)
    // })
    console.log("Nova denúncia:", newComplaint)
    onClose()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Denúncias</h1>
          <p className="text-muted-foreground mt-1">Gerencie todas as denúncias registradas</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={onOpen}>
          Nova Denúncia
        </Button>
      </div>

      <Card className="bg-card border border-border">
        <CardBody className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Buscar denúncias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="w-4 h-4 text-muted-foreground" />}
              className="flex-1"
              variant="bordered"
            />
            <Select
              placeholder="Filtrar por tipo"
              className="md:w-64"
              variant="bordered"
              selectedKeys={filterType}
              onSelectionChange={setFilterType}
            >
              {crimeTypes.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4">
        {complaints.map((complaint) => (
          <Card
            key={complaint.id}
            className="bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
          >
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-primary">{complaint.id}</span>
                  <Chip size="sm" variant="flat" color="secondary">
                    {complaint.type}
                  </Chip>
                  <Chip size="sm" color={statusColors[complaint.status as keyof typeof statusColors]} variant="dot">
                    {complaint.status}
                  </Chip>
                </div>
                {complaint.anonymous && (
                  <Chip size="sm" variant="flat">
                    Anônima
                  </Chip>
                )}
              </div>

              <h3 className="font-semibold mb-2 text-balance">{complaint.description}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{complaint.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{complaint.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{complaint.reporter}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Nova Denúncia</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Select
                label="Tipo de Ocorrência"
                placeholder="Selecione o tipo"
                variant="bordered"
                selectedKeys={newComplaint.type ? [newComplaint.type] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string
                  setNewComplaint({ ...newComplaint, type: selected })
                }}
              >
                {crimeTypes.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>

              <Textarea
                label="Descrição"
                placeholder="Descreva o ocorrido em detalhes..."
                variant="bordered"
                minRows={4}
                value={newComplaint.description}
                onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              />

              <Input
                label="Local da Ocorrência"
                placeholder="Endereço completo"
                variant="bordered"
                startContent={<MapPin className="w-4 h-4 text-muted-foreground" />}
                value={newComplaint.location}
                onChange={(e) => setNewComplaint({ ...newComplaint, location: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleSubmitComplaint}>
              Registrar Denúncia
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
