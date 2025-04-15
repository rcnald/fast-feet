import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { randomUUID } from "crypto"

import {
  Admin,
  AdminProps,
} from "@/domain/delivery/enterprise/entities/admin"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-user-mapper"
import { PrismaService } from "@/infra/database/prisma/prisma.service"

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueId,
) {
  const admin = Admin.create(
    {
      name: "John Doe",
      cpf: "77586573034",
      password: randomUUID(),
      ...override,
    },
    id,
  )

  return admin
}

@Injectable()
export class AdminFactory {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async makePrismaAdmin(
    override: Partial<AdminProps> = {},
    id?: UniqueId,
  ) {
    const admin = makeAdmin(override, id)

    const prismaAdmin = await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(admin),
    })

    return prismaAdmin
  }

  async makeAndAuthenticatePrismaAdmin(
    override: Partial<AdminProps> = {},
    id?: UniqueId,
  ) {
    const admin = await this.makePrismaAdmin(override, id)

    const token = await this.jwtService.signAsync({
      sub: admin.id.toString(),
      role: admin.role,
    })

    return { admin, token }
  }
}
