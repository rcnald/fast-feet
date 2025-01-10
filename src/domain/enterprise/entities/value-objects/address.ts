interface AddressProps {
  street: string
  city: string
  state: string
  neighborhood: string
  number: string
  zipCode: string
}

export class Address {
  private street: string
  private number: string
  private city: string
  private state: string
  private neighborhood: string
  private zipCode: string

  constructor(props: AddressProps) {
    this.street = props.street
    this.city = props.city
    this.state = props.state
    this.neighborhood = props.neighborhood
    this.number = props.number
    this.zipCode = props.zipCode
  }

  static create(value: AddressProps) {
    return new Address(value)
  }

  toString() {
    return `${this.street}, ${this.neighborhood}, ${this.number} - ${this.city}, ${this.state} (${this.zipCode})`
  }
}
