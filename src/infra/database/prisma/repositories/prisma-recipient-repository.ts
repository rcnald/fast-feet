import { Injectable } from "@nestjs/common"

import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository"
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient"

import { PrismaRecipientMapper } from "../mappers/prisma-recipient-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prisma: PrismaService) {}

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prisma.recipient.create({
      data,
    })
  }
}
