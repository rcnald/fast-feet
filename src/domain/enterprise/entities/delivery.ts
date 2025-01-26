import { Entity } from "@/core/entity"
import { UniqueId } from "./value-objects/unique-id"
import { Optional } from "@/core/types/optional"

export interface DeliveryProps {
  deliveryPersonId?: UniqueId
  packageId: UniqueId
  attachmentId?: UniqueId

  createdAt: Date
  pickedUpAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
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

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  set pickedUpAt(date: Date | null | undefined) {
    this.props.pickedUpAt = date
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(date: Date | null | undefined) {
    this.props.deliveredAt = date
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(date: Date | null | undefined) {
    this.props.returnedAt = date
  }

  get status() {
    if (this.props.returnedAt) return "returned"
    if (this.props.deliveredAt) return "delivered"
    if (this.props.pickedUpAt) return "picked_up"

    return "awaiting_pickup"
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
