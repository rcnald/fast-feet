import { Delivery as PrismaDelivery, Prisma } from "@prisma/client"

import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export class PrismaDeliveryMapper {
  static toPrisma(delivery: Delivery): Prisma.DeliveryUncheckedCreateInput {
    return {
      id: delivery.id.toString(),
      deliveryPersonId: delivery.deliveryPersonId?.toString(),
      createdAt: delivery.createdAt,
      packageId: delivery.packageId.toString(),
      packageDeliveredAt: delivery.packageDeliveredAt,
      packagePickedUpAt: delivery.packagePickedUpAt,
      packagePostedAt: delivery.packagePostedAt,
      packageReturnedAt: delivery.packageReturnedAt,
    }
  }

  static toDomain(raw: PrismaDelivery): Delivery {
    return Delivery.create(
      {
        deliveryPersonId: raw.deliveryPersonId
          ? new UniqueId(raw.deliveryPersonId)
          : undefined,
        packageId: new UniqueId(raw.packageId),
        packageDeliveredAt: raw.packageDeliveredAt,
        packagePickedUpAt: raw.packagePickedUpAt,
        packagePostedAt: raw.packagePostedAt,
        packageReturnedAt: raw.packageReturnedAt,
        createdAt: raw.createdAt,
      },
      new UniqueId(raw.id),
    )
  }
}
