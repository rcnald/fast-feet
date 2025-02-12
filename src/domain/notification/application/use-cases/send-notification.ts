import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Notification } from "../../enterprise/entities/notification"
import { NotificationRepository } from "../repositories/notification-repository"

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = {
  notification: Notification
}

export class SendNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueId(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)

    return {
      notification,
    }
  }
}
