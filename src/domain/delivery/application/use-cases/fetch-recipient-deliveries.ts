import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface FetchRecipientDeliveriesUseCaseRequest {
  recipientId: string
}

export interface FetchRecipientDeliveriesUseCaseResponse {
  deliveries: Delivery[]
}

export class FetchRecipientDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    recipientId,
  }: FetchRecipientDeliveriesUseCaseRequest): Promise<FetchRecipientDeliveriesUseCaseResponse> {
    const deliveries =
      await this.deliveryRepository.findManyByRecipientId(recipientId)

    return {
      deliveries,
    }
  }
}
