import { Entity } from "@/core/entities/entity"
import { UniqueId } from "./value-objects/unique-id"
import { Optional } from "@/core/types/optional"

export interface DeliveryProps {
  deliveryPersonId?: UniqueId
  packageId: UniqueId
  attachmentId?: UniqueId

  createdAt: Date
}

export class Delivery extends Entity<DeliveryProps> {
  get deliveryPersonId() {
    return this.props.deliveryPersonId
  }

  set deliveryPersonId(deliveryPersonId: UniqueId | undefined) {
    this.props.deliveryPersonId = deliveryPersonId
  }

  get packageId() {
    return this.props.packageId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  set attachmentId(attachmentId: UniqueId | undefined) {
    this.props.attachmentId = attachmentId
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(date: Date) {
    this.props.createdAt = date
  }

  static create(props: Optional<DeliveryProps, "createdAt">, id?: UniqueId) {
    return new Delivery(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
