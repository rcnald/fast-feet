import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface CompleteDeliveryUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
  attachmentId: string
}

export interface CompleteDeliveryUseCaseResponse {
  delivery: Delivery
}

export class CompleteDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliveryId,
    deliveryPersonId,
    attachmentId,
  }: CompleteDeliveryUseCaseRequest): Promise<CompleteDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    if (delivery.deliveryPersonId?.toString() !== deliveryPersonId) {
      throw new Error()
    }

    if (delivery.status !== "picked_up") {
      throw new Error()
    }

    delivery.attachmentId = new UniqueId(attachmentId)
    delivery.packageDeliveredAt = new Date()

    await this.deliveryRepository.save(delivery)

    return {
      delivery,
    }
  }
}
