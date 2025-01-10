export interface DeliveryPersonProps {
  id: string
  name: string
  cpf: string
  password: string
}

export class DeliveryPerson {
  private _id: string
  private name: string
  private cpf: string
  private password: string

  get id() {
    return this._id
  }

  protected constructor(props: DeliveryPersonProps) {
    this._id = props.id
    this.cpf = props.cpf
    this.name = props.name
    this.password = props.password
  }
}
