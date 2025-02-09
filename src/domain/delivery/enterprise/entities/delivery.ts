import { UniqueId } from "./value-objects/unique-id"
import { Optional } from "@/core/types/optional"
import { AggregateRoot } from "@/core/entities/aggregate-root"
import { DeliveryPackageStatusChangedEvent } from "../events/delivery-package-status-changed-event"

export interface DeliveryProps {
  deliveryPersonId?: UniqueId
  packageId: UniqueId
  attachmentId?: UniqueId

  createdAt: Date
  packagePostedAt?: Date | null
  packagePickedUpAt?: Date | null
  packageDeliveredAt?: Date | null
  packageReturnedAt?: Date | null
}

export class Delivery extends AggregateRoot<DeliveryProps> {
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

  get packagePostedAt() {
    return this.props.packagePostedAt
  }

  set packagePostedAt(date: Date | undefined | null) {
    this.addDomainEvent(new DeliveryPackageStatusChangedEvent(this))

    this.props.packagePostedAt = date
  }

  get packagePickedUpAt() {
    return this.props.packagePickedUpAt
  }

  set packagePickedUpAt(date: Date | undefined | null) {
    this.props.packagePickedUpAt = date
  }

  get packageDeliveredAt() {
    return this.props.packageDeliveredAt
  }

  set packageDeliveredAt(date: Date | undefined | null) {
    this.props.packageDeliveredAt = date
  }

  get packageReturnedAt() {
    return this.props.packageReturnedAt
  }

  set packageReturnedAt(date: Date | undefined | null) {
    this.props.packageReturnedAt = date
  }

  get status() {
    if (this.props.packageReturnedAt) return "returned"
    if (this.props.packageDeliveredAt) return "delivered"
    if (this.props.packagePickedUpAt) return "picked_up"
    if (this.props.packagePostedAt) return "awaiting_pickup"

    return "uninitialized"
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
