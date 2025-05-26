import { Injectable } from "@nestjs/common"

import { bad, nice } from "@/core/error"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

import { DeliveryRepository } from "../repositories/delivery-repository"

export interface CompleteDeliveryUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
  attachmentId: string
}

@Injectable()
export class CompleteDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    deliveryPersonId,
    attachmentId,
  }: CompleteDeliveryUseCaseRequest) {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return bad({ code: "RESOURCE_NOT_FOUND" })
    }

    if (delivery.deliveryPersonId?.toString() !== deliveryPersonId) {
      return bad({ code: "DELIVERY_ALREADY_PICKED_UP" })
    }

    if (delivery.status !== "picked_up") {
      return bad({ code: "STATUS_RESTRICTION" })
    }

    delivery.attachmentId = new UniqueId(attachmentId)
    delivery.packageDelivered()

    await this.deliveryRepository.save(delivery)

    return nice({
      delivery,
    })
  }
}
