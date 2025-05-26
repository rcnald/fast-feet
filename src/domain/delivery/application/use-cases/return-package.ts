import { Injectable } from "@nestjs/common"

import { bad, nice } from "@/core/error"

import { DeliveryRepository } from "../repositories/delivery-repository"

export interface ReturnPackageUseCaseRequest {
  deliveryId: string
}

@Injectable()
export class ReturnPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ deliveryId }: ReturnPackageUseCaseRequest) {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return bad({ code: "RESOURCE_NOT_FOUND" })
    }

    if (delivery.status !== "delivered") {
      return bad({ code: "STATUS_RESTRICTION" })
    }

    delivery.packageReturned()

    await this.deliveryRepository.save(delivery)

    return nice({
      delivery,
    })
  }
}
