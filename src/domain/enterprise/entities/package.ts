import { Address } from "./value-objects/address"

type PackageStatus = "awaiting_pickup" | "picked_up" | "delivered" | "returned"

export interface PackageProps {
  id: string
  status: PackageStatus
  recipient: string
  recipientAddress: Address

  createdAt: Date
  pickedUpAt?: Date | null
  deliveredAt?: Date | null
}

export class Package {
  private _id: string
  private status: string
  private recipient: string
  private recipientAddress: Address

  get id() {
    return this._id
  }

  protected constructor(props: PackageProps) {
    this._id = props.id
    this.status = props.status
    this.recipient = props.recipient
    this.recipientAddress = props.recipientAddress
  }
}
