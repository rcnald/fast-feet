import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"
import { bad, nice } from "@/core/error"

export interface ReturnPackageUseCaseRequest {
  deliveryId: string
}

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
