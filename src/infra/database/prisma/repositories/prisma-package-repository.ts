import { Injectable } from "@nestjs/common"

import { PackageRepository } from "@/domain/delivery/application/repositories/package-repository"
import { Package } from "@/domain/delivery/enterprise/entities/package"

import { PrismaPackageMapper } from "../mappers/prisma-package-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaPackageRepository implements PackageRepository {
  constructor(private prisma: PrismaService) {}

  async create(pack: Package): Promise<void> {
    const data = PrismaPackageMapper.toPrisma(pack)

    await this.prisma.package.create({
      data,
    })
  }

  async findById(id: string): Promise<Package | null> {
    const pack = await this.prisma.package.findUnique({
      where: {
        id,
      },
    })

    if (!pack) return null

    return PrismaPackageMapper.toDomain(pack)
  }

  async findManyByRecipientId(recipientId: string): Promise<Package[]> {
    const packages = await this.prisma.package.findMany({
      where: {
        recipientId,
      },
    })

    return packages.map(PrismaPackageMapper.toDomain)
  }

  async save(pack: Package): Promise<void> {
    const data = PrismaPackageMapper.toPrisma(pack)

    await this.prisma.package.update({
      where: {
        id: pack.id.toString(),
      },
      data,
    })
  }
}
