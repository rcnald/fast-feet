import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { DeliveryRepository } from "../repositories/delivery-repository"
import { PackageRepository } from "../repositories/package-repository"

export interface ReturnPackageUseCaseRequest {
  deliveryId: string
}

export interface ReturnPackageUseCaseResponse {
  delivery: Delivery
}

export class ReturnPackageUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private packageRepository: PackageRepository,
  ) {}

  async execute({
    deliveryId,
  }: ReturnPackageUseCaseRequest): Promise<ReturnPackageUseCaseResponse> {
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

    if (pack.status !== "delivered") {
      throw new Error()
    }

    pack.returnedAt = new Date()

    await this.packageRepository.save(pack)

    return {
      delivery,
    }
  }
}
