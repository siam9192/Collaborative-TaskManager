import { NotificationCategory, NotificationType } from "@prisma/client"

export interface CreateNotificationPayload {
    userId:string
    message:string,
    type:NotificationType,
    category:NotificationCategory
}