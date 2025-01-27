import { Delivery } from "@/domain/enterprise/entities/delivery"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"
import { PackageRepository } from "../repositories/package-repository"

export interface PickUpPackageUseCaseRequest {
  deliveryId: string
  deliveryPersonId: string
}

export interface PickUpPackageUseCaseResponse {
  delivery: Delivery
}

export class PickUpPackageUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private packageRepository: PackageRepository,
  ) {}

  async execute({
    deliveryId,
    deliveryPersonId,
  }: PickUpPackageUseCaseRequest): Promise<PickUpPackageUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      throw new Error()
    }

    if (delivery.deliveryPersonId) {
      throw new Error()
    }

    const pack = await this.packageRepository.findById(
      delivery.packageId.toString(),
    )

    if (!pack) {
      throw new Error()
    }

    delivery.deliveryPersonId = new UniqueId(deliveryPersonId)
    pack.pickedUpAt = new Date()

    await this.deliveryRepository.save(delivery)
    await this.packageRepository.save(pack)

    return {
      delivery,
    }
  }
}
