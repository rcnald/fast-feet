import { DeliveryRepository } from "../repositories/delivery-repository"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export interface CreateDeliveryUseCaseRequest {
  packageId: string
}

export interface CreateDeliveryUseCaseResponse {
  delivery: Delivery
}

export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    packageId,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
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
