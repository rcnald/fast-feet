import { Recipient } from "@/domain/enterprise/entities/recipient"
import { RecipientRepository } from "../repositories/recipient-repository"

export interface RegisterRecipientUseCaseRequest {
  name: string
}

export interface RegisterRecipientUseCaseResponse {
  recipient: Recipient
}

export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    name,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({ name })

    await this.recipientRepository.create(recipient)

    return {
      recipient,
    }
  }
}
