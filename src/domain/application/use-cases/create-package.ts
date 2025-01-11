import { Package } from "@/domain/enterprise/entities/package"
import { PackageRepository } from "../repositories/package-repository"

export interface CreatePackageUseCaseRequest {
  recipient: string
  recipientAddress: {
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
  constructor(private packagesRepository: PackageRepository) {}

  async execute({
    recipient,
    recipientAddress,
  }: CreatePackageUseCaseRequest): Promise<CreatePackageUseCaseResponse> {
    const pack = Package.create({ recipient, recipientAddress })

    await this.packagesRepository.create(pack)

    return {
      pack,
    }
  }
}
