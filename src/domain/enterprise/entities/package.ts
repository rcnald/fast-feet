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
  recipient: string
  recipientAddress: Address

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

  get recipient() {
    return this.props.recipient
  }

  set recipient(recipient: string) {
    this.props.recipient = recipient
  }

  get recipientAddress() {
    return this.props.recipientAddress
  }

  set recipientAddress(address: Address) {
    this.props.recipientAddress = address
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
        recipientAddress: new Address(props.recipientAddress),
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? "uninitialized",
      },
      id,
    )
  }
}
