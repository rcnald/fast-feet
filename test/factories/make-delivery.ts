import { Injectable } from "@nestjs/common"

import {
  Delivery,
  DeliveryProps,
} from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { PrismaDeliveryMapper } from "@/infra/database/prisma/mappers/prisma-delivery-mapper"
import { PrismaService } from "@/infra/database/prisma/prisma.service"

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueId,
) {
  const delivery = Delivery.create(
    { packageId: new UniqueId(), ...override },
    id,
  )

  return delivery
}

@Injectable()
export class DeliveryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDelivery(
    override: Partial<DeliveryProps> = {},
    id?: UniqueId,
  ) {
    const delivery = makeDelivery(override, id)

    const prismaDelivery = await this.prisma.delivery.create({
      data: PrismaDeliveryMapper.toPrisma(delivery),
    })

    return prismaDelivery
  }
}
