import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface ReturnPackageUseCaseRequest {
  deliveryId: string
}

export interface ReturnPackageUseCaseResponse {
  delivery: Delivery
}

export class ReturnPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
  }: ReturnPackageUseCaseRequest): Promise<ReturnPackageUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    if (delivery.status !== "delivered") {
      throw new Error()
    }

    delivery.packageReturnedAt = new Date()

    await this.deliveryRepository.save(delivery)

    return {
      delivery,
    }
  }
}
