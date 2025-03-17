import { DomainEvent } from "@/core/events/domain-event"

import { Delivery } from "../entities/delivery"
import { UniqueId } from "../entities/value-objects/unique-id"

export class DeliveryPackageStatusChangedEvent implements DomainEvent {
  public occurredAt: Date
  public delivery: Delivery

  constructor(delivery: Delivery) {
    this.delivery = delivery
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueId {
    return this.delivery.id
  }
}
