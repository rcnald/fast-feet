import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"
import { bad, nice } from "@/core/error"

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
