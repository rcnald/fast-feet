import { Package as PrismaPackage, Prisma } from "@prisma/client"

import { Package } from "@/domain/delivery/enterprise/entities/package"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export class PrismaPackageMapper {
  static toPrisma(pack: Package): Prisma.PackageUncheckedCreateInput {
    return {
      id: pack.id.toString(),
      recipientId: pack.recipientId.toString(),
      city: pack.deliveryAddress.city,
      state: pack.deliveryAddress.state,
      street: pack.deliveryAddress.street,
      number: pack.deliveryAddress.number,
      neighborhood: pack.deliveryAddress.neighborhood,
      zipCode: pack.deliveryAddress.zipCode,
      createdAt: pack.createdAt,
    }
  }

  static toDomain(raw: PrismaPackage): Package {
    return Package.create(
      {
        recipientId: new UniqueId(raw.recipientId),
        deliveryAddress: new Address({
          city: raw.city,
          neighborhood: raw.neighborhood,
          number: raw.number,
          state: raw.state,
          street: raw.street,
          zipCode: raw.zipCode,
        }),
        createdAt: raw.createdAt,
      },
      new UniqueId(raw.id),
    )
  }
}
