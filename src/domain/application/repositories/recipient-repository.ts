import { Recipient } from "@/domain/enterprise/entities/recipient"

export abstract class RecipientRepository {
  abstract create(pack: Recipient): Promise<void>
}
