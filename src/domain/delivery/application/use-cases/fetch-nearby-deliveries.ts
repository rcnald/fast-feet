import { Injectable } from "@nestjs/common"

import { nice } from "@/core/error"

import { DeliveryRepository } from "../repositories/delivery-repository"

export interface FetchNearbyDeliveriesUseCaseRequest {
  deliveryPersonLatitude: string
  deliveryPersonLongitude: string
  deliveryPersonId: string
}

@Injectable()
export class FetchNearbyDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryPersonLatitude,
    deliveryPersonLongitude,
    deliveryPersonId,
  }: FetchNearbyDeliveriesUseCaseRequest) {
    const deliveries =
      await this.deliveryRepository.findManyNearbyByDeliveryPersonId(
        {
          latitude: Number(deliveryPersonLatitude),
          longitude: Number(deliveryPersonLongitude),
        },
        deliveryPersonId,
      )

    return nice({ deliveries })
  }
}
