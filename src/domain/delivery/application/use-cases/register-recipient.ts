import { nice } from '@/core/error'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

import { RecipientRepository } from '../repositories/recipient-repository'

export interface RegisterRecipientUseCaseRequest {
  name: string
}

export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({ name }: RegisterRecipientUseCaseRequest) {
    const recipient = Recipient.create({ name })

    await this.recipientRepository.create(recipient)

    return nice({
      recipient,
    })
  }
}
