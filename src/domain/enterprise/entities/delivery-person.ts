import { Entity } from "@/domain/core/entity"
import { UniqueId } from "./value-objects/unique-id"

export interface DeliveryPersonProps {
  name: string
  cpf: string
  password: string
}

export class DeliveryPerson extends Entity<DeliveryPersonProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: DeliveryPersonProps, id?: UniqueId) {
    return new DeliveryPerson(props, id)
  }
}
