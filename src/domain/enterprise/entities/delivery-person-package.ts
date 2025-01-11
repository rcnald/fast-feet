import { Entity } from "@/core/entity"
import { UniqueId } from "./value-objects/unique-id"

export interface DeliveryPersonPackageProps {
  deliveryPersonId: UniqueId
  packageId: UniqueId
}

export class DeliveryPersonPackage extends Entity<DeliveryPersonPackageProps> {
  get deliveryPersonId() {
    return this.props.deliveryPersonId
  }

  get packageId() {
    return this.props.packageId
  }

  static create(props: DeliveryPersonPackageProps, id?: UniqueId) {
    return new DeliveryPersonPackage(props, id)
  }
}
