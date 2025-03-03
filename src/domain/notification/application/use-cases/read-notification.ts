import { bad, nice } from '@/core/error'
import { NotificationRepository } from '../repositories/notification-repository'

export interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest) {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return bad({ code: 'RESOURCE_NOT_FOUND' })
    }

    if (notification.recipientId.toString() !== recipientId) {
      return bad({ code: 'ACCESS_DENIED' })
    }
    notification.read()

    this.notificationRepository.save(notification)

    return nice({
      notification,
    })
  }
}
