import { Prisma } from "@prisma/client"

import { Recipient } from "@/domain/delivery/enterprise/entities/recipient"

export class PrismaRecipientMapper {
  static toPrisma(user: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
    }
  }
}
