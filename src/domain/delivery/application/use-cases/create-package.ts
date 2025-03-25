import { Injectable } from "@nestjs/common"

import { nice } from "@/core/error"
import { Package } from "@/domain/delivery/enterprise/entities/package"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

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

@Injectable()
export class CreatePackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ recipientId, deliveryAddress }: CreatePackageUseCaseRequest) {
    const pack = Package.create({
      recipientId: new UniqueId(recipientId),
      deliveryAddress: new Address(deliveryAddress),
    })

    await this.packageRepository.create(pack)

    return nice({ pack })
  }
}
