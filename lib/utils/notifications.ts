import { createClient } from "@/lib/supabase/client"

export interface NotificationData {
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  user_ids: string[]
}

export async function createNotification(data: NotificationData) {
  const supabase = createClient()

  try {
    const { data: notifications, error } = await supabase
      .from("notifications")
      .insert(
        data.user_ids.map((userId) => ({
          user_id: userId,
          title: data.title,
          message: data.message,
          type: data.type,
        })),
      )
      .select()

    if (error) throw error

    return notifications
  } catch (error) {
    console.error("Error creating notification:", error)
    throw error
  }
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq("id", notificationId)
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw error
  }
}

export async function getUserNotifications(userId: string, limit = 50) {
  const supabase = createClient()

  try {
    const { data: notifications, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error

    return notifications
  } catch (error) {
    console.error("Error fetching notifications:", error)
    throw error
  }
}
