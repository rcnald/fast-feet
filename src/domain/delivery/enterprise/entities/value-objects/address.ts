interface AddressProps {
  street: string
  city: string
  state: string
  neighborhood: string
  number: string
  zipCode: string
}

export class Address {
  public street: string
  public number: string
  public city: string
  public state: string
  public neighborhood: string
  public zipCode: string

  constructor(props: AddressProps) {
    this.street = props.street
    this.city = props.city
    this.state = props.state
    this.neighborhood = props.neighborhood
    this.number = props.number
    this.zipCode = props.zipCode
  }

  toValue(): string {
    return `${this.street}, ${this.neighborhood}, ${this.number} - ${this.city}, ${this.state} (${this.zipCode})`
  }
}
