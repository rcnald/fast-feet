import { Package } from "@/domain/enterprise/entities/package"
import { PackageRepository } from "../repositories/package-repository"

export interface MarkPackageAsAwaitingToPickUpUseCaseRequest {
  packageId: string
}

export interface MarkPackageAsAwaitingToPickUpUseCaseResponse {
  pack: Package
}

export class MarkPackageAsAwaitingToPickUpUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    packageId,
  }: MarkPackageAsAwaitingToPickUpUseCaseRequest): Promise<MarkPackageAsAwaitingToPickUpUseCaseResponse> {
    const pack = await this.packageRepository.findById(packageId)

    if (!pack) {
      throw new Error()
    }

    if (pack.status !== "uninitialized") {
      throw new Error()
    }

    pack.status = "awaiting_pickup"

    await this.packageRepository.save(pack)

    return {
      pack,
    }
  }
}
