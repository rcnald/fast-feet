import { Delivery } from "@/domain/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface FetchNearbyDeliveriesUseCaseRequest {
  deliveryPersonLatitude: string
  deliveryPersonLongitude: string
  deliveryPersonId: string
}

export interface FetchNearbyDeliveriesUseCaseResponse {
  deliveries: Delivery[]
}

export class FetchNearbyDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryPersonLatitude,
    deliveryPersonLongitude,
    deliveryPersonId,
  }: FetchNearbyDeliveriesUseCaseRequest): Promise<FetchNearbyDeliveriesUseCaseResponse> {
    const deliveries =
      await this.deliveryRepository.findManyNearbyByDeliveryPersonId(
        {
          latitude: Number(deliveryPersonLatitude),
          longitude: Number(deliveryPersonLongitude),
        },
        deliveryPersonId,
      )

    return {
      deliveries,
    }
  }
}
