import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository"
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient"

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }
}
