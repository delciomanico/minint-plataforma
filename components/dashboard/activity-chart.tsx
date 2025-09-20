"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ActivityChartProps {
  data: Array<{
    name: string
    denuncias: number
    resolvidas: number
  }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade dos Últimos 7 Dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="denuncias" fill="#3b82f6" name="Denúncias" />
            <Bar dataKey="resolvidas" fill="#10b981" name="Resolvidas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
