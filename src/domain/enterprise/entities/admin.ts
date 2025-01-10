export interface AdminProps {
  id: string
  name: string
  cpf: string
  password: string
}

export class Admin {
  private _id: string
  private cpf: string
  private name: string
  private password: string

  get id() {
    return this._id
  }

  protected constructor(props: AdminProps) {
    this._id = props.id
    this.cpf = props.cpf
    this.name = props.name
    this.password = props.password
  }
}
