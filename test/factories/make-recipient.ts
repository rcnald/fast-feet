import { Injectable } from "@nestjs/common"

import {
  Recipient,
  RecipientProps,
} from "@/domain/delivery/enterprise/entities/recipient"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { PrismaRecipientMapper } from "@/infra/database/prisma/mappers/prisma-recipient-mapper"
import { PrismaService } from "@/infra/database/prisma/prisma.service"

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueId,
) {
  const recipient = Recipient.create({ name: "John Doe", ...override }, id)

  return recipient
}

@Injectable()
export class RecipientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRecipient(
    override: Partial<RecipientProps> = {},
    id?: UniqueId,
  ) {
    const recipient = makeRecipient(override, id)

    const prismaRecipient = await this.prisma.recipient.create({
      data: PrismaRecipientMapper.toPrisma(recipient),
    })

    return prismaRecipient
  }
}
