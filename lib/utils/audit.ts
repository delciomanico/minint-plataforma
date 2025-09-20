import { createClient } from "@/lib/supabase/client"

export interface AuditLogData {
  user_id: string
  action: string
  resource_type: string
  resource_id: string
  details?: Record<string, any>
}

export async function createAuditLog(data: AuditLogData) {
  const supabase = createClient()

  try {
    const { data: auditLog, error } = await supabase
      .from("audit_logs")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return auditLog
  } catch (error) {
    console.error("Error creating audit log:", error)
    throw error
  }
}

export async function getAuditLogs(filters: {
  page?: number
  limit?: number
  action?: string
  user_id?: string
  resource_type?: string
}) {
  const supabase = createClient()

  try {
    const { page = 1, limit = 50, action, user_id, resource_type } = filters

    let query = supabase
      .from("audit_logs")
      .select(`
        *,
        user:profiles(id, full_name, role)
      `)
      .order("created_at", { ascending: false })

    // Aplicar filtros
    if (action) query = query.eq("action", action)
    if (user_id) query = query.eq("user_id", user_id)
    if (resource_type) query = query.eq("resource_type", resource_type)

    // Paginação
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: logs, error, count } = await query.range(from, to)

    if (error) throw error

    return {
      logs,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    }
  } catch (error) {
    console.error("Error fetching audit logs:", error)
    throw error
  }
}
