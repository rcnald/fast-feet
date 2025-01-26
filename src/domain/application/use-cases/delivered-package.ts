import { Delivery } from "@/domain/enterprise/entities/delivery"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface DeliveredPackageUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
  attachmentId: string
}

export interface DeliveredPackageUseCaseResponse {
  delivery: Delivery
}

export class DeliveredPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    deliveryPersonId,
    attachmentId,
  }: DeliveredPackageUseCaseRequest): Promise<DeliveredPackageUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    if (delivery.status !== "picked_up") {
      throw new Error()
    }

    if (delivery.deliveryPersonId?.toString() !== deliveryPersonId) {
      throw new Error()
    }

    delivery.attachmentId = new UniqueId(attachmentId)
    delivery.deliveredAt = new Date()

    return {
      delivery,
    }
  }
}
