import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export abstract class RecipientRepository {
  abstract create(recipient: Recipient): Promise<void>
}
