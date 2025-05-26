import { Injectable } from "@nestjs/common"

import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository"
import { Attachment } from "@/domain/delivery/enterprise/entities/attachment"

import { PrismaAttachmentMapper } from "../mappers/prisma-attachment-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaAttachmentRepository implements AttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}
