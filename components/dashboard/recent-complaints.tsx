import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock } from "lucide-react"
import type { Complaint } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface RecentComplaintsProps {
  complaints: Complaint[]
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  urgent: "Urgente",
}

export function RecentComplaints({ complaints }: RecentComplaintsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Denúncias Recentes
          <Button variant="outline" size="sm">
            Ver Todas
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complaints.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma denúncia encontrada</p>
          ) : (
            complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900 truncate">{complaint.title}</h4>
                    <Badge className={priorityColors[complaint.priority]}>{priorityLabels[complaint.priority]}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{complaint.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(complaint.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
