export interface DeliveryPersonPackageProps {
  id: string
  deliveryPersonId: string
  packageId: string
}

export class DeliveryPersonPackage {
  private _id: string
  private deliveryPersonId: string
  private packageId: string

  get id() {
    return this._id
  }

  protected constructor(props: DeliveryPersonPackageProps) {
    this._id = props.id
    this.deliveryPersonId = props.deliveryPersonId
    this.packageId = props.packageId
  }
}
