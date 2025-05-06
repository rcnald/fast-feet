import { Injectable } from "@nestjs/common"

import {
  Package,
  PackageProps,
} from "@/domain/delivery/enterprise/entities/package"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { PrismaPackageMapper } from "@/infra/database/prisma/mappers/prisma-package-mapper"
import { PrismaService } from "@/infra/database/prisma/prisma.service"

export function makePackage(
  override: Partial<PackageProps> = {},
  id?: UniqueId,
) {
  const pack = Package.create(
    {
      recipientId: new UniqueId(),
      deliveryAddress: new Address({
        state: "SP",
        city: "São Paulo",
        street: "Rua Ernest Renan",
        neighborhood: "Morumbi",
        zipCode: "05659020",
        number: "480",
      }),
      ...override,
    },
    id,
  )

  return pack
}

@Injectable()
export class PackageFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPackage(override: Partial<PackageProps> = {}, id?: UniqueId) {
    const pack = makePackage(override, id)

    const prismaPackage = await this.prisma.package.create({
      data: PrismaPackageMapper.toPrisma(pack),
    })

    return prismaPackage
  }
}
