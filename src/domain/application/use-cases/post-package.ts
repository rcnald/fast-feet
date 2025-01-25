import { DeliveryRepository } from "../repositories/delivery-repository"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"

export interface PostPackageUseCaseRequest {
  packageId: string
}

export interface PostPackageUseCaseResponse {
  delivery: Delivery
}

export class PostPackageUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    packageId,
  }: PostPackageUseCaseRequest): Promise<PostPackageUseCaseResponse> {
    const deliveryExists =
      await this.deliveryRepository.findByPackageId(packageId)

    if (deliveryExists) {
      throw new Error()
    }

    const delivery = Delivery.create({
      packageId: new UniqueId(packageId),
    })

    await this.deliveryRepository.create(delivery)

    return {
      delivery,
    }
  }
}
