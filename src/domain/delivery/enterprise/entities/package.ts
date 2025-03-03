import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { Address } from './value-objects/address'
import { UniqueId } from './value-objects/unique-id'

export interface PackageProps {
  recipientId: UniqueId
  deliveryAddress: Address

  createdAt: Date
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

  static create(props: Optional<PackageProps, 'createdAt'>, id?: UniqueId) {
    return new Package(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
