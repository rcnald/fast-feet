import { bad, nice } from "@/core/error"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

import { DeliveryRepository } from "../repositories/delivery-repository"
import { Injectable } from "@nestjs/common"

export interface PickUpPackageUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
}

@Injectable()
export class PickUpPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ deliveryId, deliveryPersonId }: PickUpPackageUseCaseRequest) {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return bad({ code: "RESOURCE_NOT_FOUND" })
    }

    if (delivery.deliveryPersonId) {
      return bad({ code: "DELIVERY_ALREADY_PICKED_UP" })
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
