import { Entity } from "@/core/entity"
import { UniqueId } from "./value-objects/unique-id"
import { Optional } from "@/core/types/optional"

export interface DeliveryProps {
  deliveryPersonId?: UniqueId
  packageId: UniqueId

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
