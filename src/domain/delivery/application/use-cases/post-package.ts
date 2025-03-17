import { bad, nice } from "@/core/error"

import { DeliveryRepository } from "../repositories/delivery-repository"

export interface PostPackageUseCaseRequest {
  deliveryId: string
}

export class PostPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ deliveryId }: PostPackageUseCaseRequest) {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return bad({ code: "RESOURCE_NOT_FOUND" })
    }

    delivery.packagePosted()

    await this.deliveryRepository.save(delivery)

    return nice({ delivery })
  }
}
