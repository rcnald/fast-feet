import { Entity } from "@/core/entity"
import { Optional } from "@/core/types/optional"
import { Address } from "./value-objects/address"
import { UniqueId } from "./value-objects/unique-id"

type PackageStatus =
  | "uninitialized"
  | "awaiting_pickup"
  | "picked_up"
  | "delivered"
  | "returned"

export interface PackageProps {
  status: PackageStatus
  recipientId: string
  deliveryAddress: Address

  createdAt: Date
  pickedUpAt?: Date | null
  deliveredAt?: Date | null
}

export class Package extends Entity<PackageProps> {
  get status() {
    return this.props.status
  }

  set status(status: PackageStatus) {
    this.props.status = status
  }

  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: string) {
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
    this.props.pickedUpAt = date
  }

  static create(
    props: Optional<PackageProps, "createdAt" | "status">,
    id?: UniqueId,
  ) {
    return new Package(
      {
        ...props,
        deliveryAddress: new Address(props.deliveryAddress),
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? "uninitialized",
      },
      id,
    )
  }
}
