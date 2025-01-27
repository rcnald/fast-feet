import { Delivery } from "@/domain/enterprise/entities/delivery"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"
import { PackageRepository } from "../repositories/package-repository"

export interface CompleteDeliveryUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
  attachmentId: string
}

export interface CompleteDeliveryUseCaseResponse {
  delivery: Delivery
}

export class CompleteDeliveryUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private packageRepository: PackageRepository,
  ) {}

  async execute({
    deliveryId,
    deliveryPersonId,
    attachmentId,
  }: CompleteDeliveryUseCaseRequest): Promise<CompleteDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    const pack = await this.packageRepository.findById(
      delivery.packageId.toString(),
    )

    if (!pack) {
      throw new Error()
    }

    if (pack.status !== "picked_up") {
      throw new Error()
    }

    if (delivery.deliveryPersonId?.toString() !== deliveryPersonId) {
      throw new Error()
    }

    delivery.attachmentId = new UniqueId(attachmentId)
    pack.deliveredAt = new Date()

    await this.deliveryRepository.save(delivery)
    await this.packageRepository.save(pack)

    return {
      delivery,
    }
  }
}
