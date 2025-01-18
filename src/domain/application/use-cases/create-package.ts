import { Package } from "@/domain/enterprise/entities/package"
import { PackageRepository } from "../repositories/package-repository"

export interface CreatePackageUseCaseRequest {
  recipientId: string
  deliveryAddress: {
    street: string
    city: string
    state: string
    neighborhood: string
    number: string
    zipCode: string
  }
}

export interface CreatePackageUseCaseResponse {
  pack: Package
}

export class CreatePackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    recipientId,
    deliveryAddress,
  }: CreatePackageUseCaseRequest): Promise<CreatePackageUseCaseResponse> {
    const pack = Package.create({ recipientId, deliveryAddress })

    await this.packageRepository.create(pack)

    return {
      pack,
    }
  }
}
