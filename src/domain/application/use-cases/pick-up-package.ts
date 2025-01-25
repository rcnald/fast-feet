import { Delivery } from "@/domain/enterprise/entities/delivery"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface PickUpPackageUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
}

export interface PickUpPackageUseCaseResponse {
  delivery: Delivery
}

export class PickUpPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    deliveryPersonId,
  }: PickUpPackageUseCaseRequest): Promise<PickUpPackageUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    if (delivery.deliveryPersonId) {
      throw new Error()
    }

    delivery.deliveryPersonId = new UniqueId(deliveryPersonId)
    delivery.pickedUpAt = new Date()

    return {
      delivery,
    }
  }
}
