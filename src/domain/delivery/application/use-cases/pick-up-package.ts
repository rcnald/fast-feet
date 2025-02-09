import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
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

    if (delivery.status !== "awaiting_pickup") {
      throw Error()
    }

    delivery.deliveryPersonId = new UniqueId(deliveryPersonId)
    delivery.packagePickedUpAt = new Date()

    await this.deliveryRepository.save(delivery)

    return {
      delivery,
    }
  }
}
