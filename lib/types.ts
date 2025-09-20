export interface Profile {
  id: string
  full_name: string
  email: string
  role: "admin" | "supervisor" | "analyst" | "user"
  department?: string
  phone?: string
  avatar_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ComplaintCategory {
  id: string
  name: string
  description?: string
  color: string
  is_active: boolean
  created_at: string
}

export interface ComplaintStatus {
  id: string
  name: string
  description?: string
  color: string
  order_index: number
  is_active: boolean
  created_at: string
}

export interface Complaint {
  id: string
  title: string
  description: string
  category_id?: string
  status_id?: string
  priority: "low" | "medium" | "high" | "urgent"
  complainant_name?: string
  complainant_email?: string
  complainant_phone?: string
  complainant_address?: string
  is_anonymous: boolean
  assigned_to?: string
  created_by?: string
  location?: string
  incident_date?: string
  evidence_urls?: string[]
  tags?: string[]
  created_at: string
  updated_at: string
  category?: ComplaintCategory
  status?: ComplaintStatus
  assigned_user?: Profile
  creator?: Profile
}

export interface ComplaintComment {
  id: string
  complaint_id: string
  user_id: string
  comment: string
  is_internal: boolean
  created_at: string
  user?: Profile
}

export interface ComplaintAttachment {
  id: string
  complaint_id: string
  file_name: string
  file_url: string
  file_type?: string
  file_size?: number
  uploaded_by: string
  created_at: string
  uploader?: Profile
}

export interface AuditLog {
  id: string
  table_name: string
  record_id: string
  action: "INSERT" | "UPDATE" | "DELETE"
  old_values?: any
  new_values?: any
  user_id?: string
  created_at: string
  user?: Profile
}
