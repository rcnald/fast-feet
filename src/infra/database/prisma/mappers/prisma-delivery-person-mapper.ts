import { Prisma, User as PrismaUser } from '@prisma/client'

import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'
import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'

export class PrismaDeliveryPersonMapper {
  static toPrisma(
    deliveryPerson: DeliveryPerson,
  ): Prisma.UserUncheckedCreateInput {
    return {
      id: deliveryPerson.id.toString(),
      name: deliveryPerson.name,
      cpf: deliveryPerson.cpf,
      password: deliveryPerson.password,
      role: deliveryPerson.role,
    }
  }

  static toDomain(raw: PrismaUser): DeliveryPerson {
    return DeliveryPerson.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        password: raw.password,
      },
      new UniqueId(raw.id),
    )
  }
}
