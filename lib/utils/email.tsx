// Utilitário para envio de emails (integração com serviços como SendGrid, Resend, etc.)

export interface EmailData {
  to: string[]
  subject: string
  html: string
  text?: string
}

export async function sendEmail(data: EmailData) {
  // Em produção, integrar com serviço de email como SendGrid, Resend, etc.
  console.log("Sending email:", data)

  // Simulação de envio
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, messageId: `msg_${Date.now()}` })
    }, 1000)
  })
}

export function generateComplaintNotificationEmail(complaint: any, recipient: any) {
  const subject = `Nova denúncia: ${complaint.title}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937;">Nova Denúncia Recebida</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">${complaint.title}</h3>
        <p><strong>Categoria:</strong> ${complaint.category?.name || "Não especificada"}</p>
        <p><strong>Prioridade:</strong> ${complaint.priority}</p>
        <p><strong>Descrição:</strong></p>
        <p>${complaint.description}</p>
      </div>
      
      <p>Acesse o sistema para mais detalhes e para tomar as ações necessárias.</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
        <p>Este é um email automático do Sistema de Denúncias MININT.</p>
      </div>
    </div>
  `

  const text = `
    Nova Denúncia Recebida
    
    Título: ${complaint.title}
    Categoria: ${complaint.category?.name || "Não especificada"}
    Prioridade: ${complaint.priority}
    
    Descrição:
    ${complaint.description}
    
    Acesse o sistema para mais detalhes.
  `

  return { subject, html, text }
}
