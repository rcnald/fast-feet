import { Injectable } from "@nestjs/common"
import { randomUUID } from "crypto"

import {
  DeliveryPerson,
  DeliveryPersonProps,
} from "@/domain/delivery/enterprise/entities/delivery-person"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-user-mapper"
import { PrismaService } from "@/infra/database/prisma/prisma.service"

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueId,
) {
  const deliveryPerson = DeliveryPerson.create(
    {
      name: "John Doe",
      cpf: "77586573034",
      password: randomUUID(),
      ...override,
    },
    id,
  )

  return deliveryPerson
}

@Injectable()
export class DeliveryPersonFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDeliveryPerson(
    override: Partial<DeliveryPersonProps> = {},
    id?: UniqueId,
  ) {
    const deliveryPerson = makeDeliveryPerson(override, id)

    const prismaDeliveryPerson = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(deliveryPerson),
    })

    return prismaDeliveryPerson
  }
}
