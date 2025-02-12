import { NotificationRepository } from "@/domain/notification/application/repositories/notification-repository"
import { Notification } from "@/domain/notification/enterprise/entities/notification"

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((notification) => {
      return notification.id.toString() === id
    })

    if (!notification) return null

    return notification
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex((notification) =>
      notification.id.equals(notification.id),
    )

    this.items[notificationIndex] = notification
  }
}
