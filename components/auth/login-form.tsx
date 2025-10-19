"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardBody, CardHeader, Input, Button, Divider, Link } from "@nextui-org/react"
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with API - POST /api/auth/login
    router.push("/dashboard")
  }

  return (
    <Card className="w-full bg-white/80 backdrop-blur-xl border border-primary/10 shadow-2xl animate-scale-in">
      <CardHeader className="flex flex-col gap-3 items-center pt-8 pb-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-balance text-foreground">Sistema de Gestão Criminal</h1>
          <p className="text-sm text-muted-foreground mt-2">Acesse sua conta para continuar</p>
        </div>
      </CardHeader>
      <CardBody className="gap-4 px-6 md:px-8 pb-8">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            startContent={<Mail className="w-4 h-4 text-muted-foreground" />}
            variant="bordered"
            isRequired
            className="text-sm"
          />

          <Input
            type={isVisible ? "text" : "password"}
            label="Senha"
            placeholder="Digite sua senha"
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
            className="text-sm"
          />

          <div className="flex justify-end">
            <Link href="/recuperar-senha" size="sm" className="text-primary hover:text-accent transition-colors">
              Esqueceu sua senha?
            </Link>
          </div>

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Entrar
          </Button>
        </form>

        <Divider className="my-2" />

        <div className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/cadastro" size="sm" className="text-primary font-medium hover:text-accent transition-colors">
            Cadastre-se
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
