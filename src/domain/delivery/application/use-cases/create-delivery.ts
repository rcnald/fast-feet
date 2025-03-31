import { Injectable } from "@nestjs/common"

import { bad, nice } from "@/core/error"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

import { DeliveryRepository } from "../repositories/delivery-repository"

export interface CreateDeliveryUseCaseRequest {
  packageId: string
}

@Injectable()
export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({ packageId }: CreateDeliveryUseCaseRequest) {
    const deliveryExists =
      await this.deliveryRepository.findByPackageId(packageId)

    if (deliveryExists) {
      return bad({ code: "RESOURCE_ALREADY_EXISTS" })
    }

    const delivery = Delivery.create({
      packageId: new UniqueId(packageId),
    })

    await this.deliveryRepository.create(delivery)

    return nice({ delivery })
  }
}
