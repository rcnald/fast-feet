import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
import { Address } from "./value-objects/address"
import { UniqueId } from "./value-objects/unique-id"

export interface PackageProps {
  recipientId: UniqueId
  deliveryAddress: Address

  createdAt: Date
  pickedUpAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

export class Package extends Entity<PackageProps> {
  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueId) {
    this.props.recipientId = recipientId
  }

  get deliveryAddress() {
    return this.props.deliveryAddress
  }

  set deliveryAddress(address: Address) {
    this.props.deliveryAddress = address
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

  static create(props: Optional<PackageProps, "createdAt">, id?: UniqueId) {
    return new Package(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
