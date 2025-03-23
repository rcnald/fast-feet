import { Prisma, User as PrismaUser } from "@prisma/client"

import { User } from "@/domain/delivery/application/repositories/user-repository"
import { Admin } from "@/domain/delivery/enterprise/entities/admin"
import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      role: user.role,
    }
  }

  static toDomain(raw: PrismaUser): User {
    if (raw.role === "DELIVERY_PERSON") {
      return DeliveryPerson.create(
        {
          name: raw.name,
          cpf: raw.cpf,
          password: raw.password,
        },
        new UniqueId(raw.id),
      )
    }

    return Admin.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        password: raw.password,
      },
      new UniqueId(raw.id),
    )
  }
}
