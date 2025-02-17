import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"
import { bad, nice } from "@/core/error"

export interface PickUpPackageUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
}

export class PickUpPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ deliveryId, deliveryPersonId }: PickUpPackageUseCaseRequest) {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return bad({ code: "RESOURCE_NOT_FOUND" })
    }

    if (delivery.deliveryPersonId) {
      return bad({ code: "ACCESS_DENIED" })
    }

    if (delivery.status !== "awaiting_pickup") {
      return bad({ code: "STATUS_RESTRICTION" })
    }

    delivery.deliveryPersonId = new UniqueId(deliveryPersonId)
    delivery.packagePickedUp()

    await this.deliveryRepository.save(delivery)

    return nice({ delivery })
  }
}
