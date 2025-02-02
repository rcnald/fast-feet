import { Entity } from "@/core/entity"
import { UniqueId } from "./value-objects/unique-id"

export interface DeliveryPersonProps {
  name: string
  cpf: string
  password: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  static role = "DELIVERY_PERSON" as const

  get role() {
    return DeliveryPerson.role
  }

  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: DeliveryPersonProps, id?: UniqueId) {
    return new DeliveryPerson(props, id)
  }
}
