import { Entity } from "@/core/entity"
import { UniqueId } from "./value-objects/unique-id"

export interface DeliveryProps {
  deliveryPersonId: UniqueId
  packageId: UniqueId
}

export class Delivery extends Entity<DeliveryProps> {
  get deliveryPersonId() {
    return this.props.deliveryPersonId
  }

  get packageId() {
    return this.props.packageId
  }

  static create(props: DeliveryProps, id?: UniqueId) {
    return new Delivery(props, id)
  }
}
