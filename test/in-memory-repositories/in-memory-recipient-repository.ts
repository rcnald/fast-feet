import { RecipientRepository } from "@/domain/application/repositories/recipient-repository"
import { Recipient } from "@/domain/enterprise/entities/recipient"

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }
}
