import { nice } from '@/core/error'

import { DeliveryRepository } from '../repositories/delivery-repository'

export interface FetchRecipientDeliveriesUseCaseRequest {
  recipientId: string
}

export class FetchRecipientDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ recipientId }: FetchRecipientDeliveriesUseCaseRequest) {
    const deliveries =
      await this.deliveryRepository.findManyByRecipientId(recipientId)

    return nice({ deliveries })
  }
}
