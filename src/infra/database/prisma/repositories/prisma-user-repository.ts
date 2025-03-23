import { Injectable } from "@nestjs/common"

import {
  User,
  UserRepository,
} from "@/domain/delivery/application/repositories/user-repository"
import { Admin } from "@/domain/delivery/enterprise/entities/admin"
import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"

import { PrismaUserMapper } from "../mappers/prisma-user-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findByCPF(cpf: string): Promise<Admin | DeliveryPerson | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async findById(id: string): Promise<Admin | DeliveryPerson | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data,
    })
  }
}
