import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export interface NotificationProps {
  recipientId: UniqueId
  title: string
  content: string
  createdAt: Date
  readAt?: Date | null
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  read() {
    this.props.readAt = new Date()
  }

  static create(
    props: Optional<NotificationProps, "createdAt">,
    id?: UniqueId,
  ) {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
