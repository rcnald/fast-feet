import { Entity } from "@/core/entities/entity"

import { UniqueId } from "./value-objects/unique-id"

export interface AdminProps {
  name: string
  cpf: string
  password: string
}

export class Admin extends Entity<AdminProps> {
  static role = "ADMIN" as const

  get role() {
    return Admin.role
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
    this.password = password
  }

  static create(props: AdminProps, id?: UniqueId) {
    return new Admin(props, id)
  }
}
