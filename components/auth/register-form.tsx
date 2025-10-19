"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardBody, CardHeader, Input, Button, Select, SelectItem, Link } from "@nextui-org/react"
import { Shield, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

const userTypes = [
  { key: "citizen", label: "Cidadão" },
  { key: "agent", label: "Agente Policial" },
]

export function RegisterForm() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    password: "",
    confirmPassword: "",
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Integrate with API
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // })

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border border-border">
      <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-balance">Criar Nova Conta</h1>
          <p className="text-sm text-muted-foreground mt-1">Preencha os dados para se cadastrar</p>
        </div>
      </CardHeader>
      <CardBody className="gap-4 px-8 pb-8">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="text"
            label="Nome Completo"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            startContent={<User className="w-4 h-4 text-muted-foreground" />}
            variant="bordered"
            isRequired
          />

          <Input
            type="email"
            label="Email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            startContent={<Mail className="w-4 h-4 text-muted-foreground" />}
            variant="bordered"
            isRequired
          />

          <Input
            type="tel"
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            startContent={<Phone className="w-4 h-4 text-muted-foreground" />}
            variant="bordered"
            isRequired
          />

          <Select
            label="Tipo de Usuário"
            placeholder="Selecione o tipo"
            variant="bordered"
            selectedKeys={formData.userType ? [formData.userType] : []}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
            isRequired
          >
            {userTypes.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>

          <Input
            type={isVisible ? "text" : "password"}
            label="Senha"
            placeholder="Crie uma senha forte"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            startContent={<Lock className="w-4 h-4 text-muted-foreground" />}
            endContent={
              <button type="button" onClick={() => setIsVisible(!isVisible)} className="focus:outline-none">
                {isVisible ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            }
            variant="bordered"
            isRequired
          />

          <Input
            type={isVisible ? "text" : "password"}
            label="Confirmar Senha"
            placeholder="Digite a senha novamente"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            startContent={<Lock className="w-4 h-4 text-muted-foreground" />}
            variant="bordered"
            isRequired
          />

          <Button type="submit" color="primary" size="lg" isLoading={isLoading} className="w-full font-semibold mt-2">
            Cadastrar
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-2">
          Já tem uma conta?{" "}
          <Link href="/login" size="sm" className="text-primary font-medium">
            Faça login
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
