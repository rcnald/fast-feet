import { Package } from "@/domain/enterprise/entities/package"
import { PackageRepository } from "../repositories/package-repository"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { DeliveryRepository } from "../repositories/delivery-repository"

export interface PickUpPackageUseCaseRequest {
  packageId: string
  deliveryPersonId: string
}

export interface PickUpPackageUseCaseResponse {
  pack: Package
}

export class PickUpPackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private deliveryRepository: DeliveryRepository,
  ) {}

  async execute({
    packageId,
    deliveryPersonId,
  }: PickUpPackageUseCaseRequest): Promise<PickUpPackageUseCaseResponse> {
    const pack = await this.packageRepository.findById(packageId)

    if (!pack) {
      throw new Error()
    }

    if (pack.status !== "awaiting_pickup") {
      throw new Error()
    }

    const delivery = Delivery.create({
      deliveryPersonId: new UniqueId(deliveryPersonId),
      packageId: new UniqueId(packageId),
    })

    await this.deliveryRepository.create(delivery)

    pack.status = "picked_up"

    await this.packageRepository.save(pack)

    return {
      pack,
    }
  }
}
