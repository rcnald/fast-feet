import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface PostPackageUseCaseRequest {
  deliveryId: string
}

export interface PostPackageUseCaseResponse {
  delivery: Delivery
}

export class PostPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
  }: PostPackageUseCaseRequest): Promise<PostPackageUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    delivery.packagePostedAt = new Date()

    await this.deliveryRepository.save(delivery)

    return {
      delivery,
    }
  }
}
