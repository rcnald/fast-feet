import { randomUUID } from "crypto"

export class UniqueId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toString() {
    return this.value
  }

  equals(uniqueId: UniqueId) {
    return this.value === uniqueId.toString()
  }
}
