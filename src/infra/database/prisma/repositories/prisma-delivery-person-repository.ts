import { Injectable } from "@nestjs/common"

import { DeliveryPersonRepository } from "@/domain/delivery/application/repositories/delivery-person-repository"
import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"

import { PrismaUserMapper } from "../mappers/prisma-user-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  constructor(private prisma: PrismaService) {}

  async create(deliveryPerson: DeliveryPerson): Promise<void> {
    const data = PrismaUserMapper.toPrisma(deliveryPerson)

    await this.prisma.user.create({
      data,
    })
  }

  async findByCPF(cpf: string): Promise<DeliveryPerson | null> {
    const deliveryPerson = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!deliveryPerson) return null

    const domainDeliveryPerson = PrismaUserMapper.toDomain(deliveryPerson)

    if (domainDeliveryPerson.role === "ADMIN") return null

    return domainDeliveryPerson
  }
}
