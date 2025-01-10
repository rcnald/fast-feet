import { Entity } from "@/domain/core/entity"
import { UniqueId } from "./value-objects/unique-id"

export interface AdminProps {
  name: string
  cpf: string
  password: string
}

export class Admin extends Entity<AdminProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: AdminProps, id?: UniqueId) {
    return new Admin(props, id)
  }
}
