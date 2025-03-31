import { Injectable } from "@nestjs/common"

import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"

import { PrismaDeliveryMapper } from "../mappers/prisma-delivery-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(private prisma: PrismaService) {}

  async create(delivery: Delivery): Promise<void> {
    const data = PrismaDeliveryMapper.toPrisma(delivery)

    await this.prisma.delivery.create({
      data,
    })
  }

  async findByPackageId(packageId: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findFirst({
      where: {
        packageId,
      },
    })

    if (!delivery) return null

    return PrismaDeliveryMapper.toDomain(delivery)
  }

  async findById(id: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id,
      },
    })

    if (!delivery) return null

    return PrismaDeliveryMapper.toDomain(delivery)
  }

  async save(delivery: Delivery): Promise<void> {
    const data = PrismaDeliveryMapper.toPrisma(delivery)

    await this.prisma.package.update({
      where: {
        id: delivery.id.toString(),
      },
      data,
    })
  }

  async findManyNearbyByDeliveryPersonId(
    deliveryPersonCoordinate: { latitude: number; longitude: number },
    deliveryPersonId: string,
  ): Promise<Delivery[]> {
    throw new Error("Method not implemented.")
  }

  async findManyByRecipientId(recipientId: string): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      where: {
        package: {
          recipientId,
        },
      },
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }
}
