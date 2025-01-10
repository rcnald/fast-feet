import { Entity } from "@/domain/core/entity"
import { Optional } from "@/domain/core/types/optional"
import { Address } from "./value-objects/address"
import { UniqueId } from "./value-objects/unique-id"

type PackageStatus = "awaiting_pickup" | "picked_up" | "delivered" | "returned"

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

  get recipient() {
    return this.props.recipient
  }

  get recipientAddress() {
    return this.props.recipientAddress
  }

  get createdAt() {
    return this.props.createdAt
  }

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  static create(
    props: Optional<PackageProps, "createdAt" | "status">,
    id?: UniqueId,
  ) {
    return new Package(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? "awaiting_pickup",
      },
      id,
    )
  }
}
