import { Injectable } from "@nestjs/common"

import { Geocoder } from "@/domain/delivery/application/geolocation/geocoder"
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates"

import { PrismaDeliveryMapper } from "../mappers/prisma-delivery-mapper"
import { PrismaService } from "../prisma.service"

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(
    private prisma: PrismaService,
    private geocoder: Geocoder,
  ) {}

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

    await this.prisma.delivery.update({
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
    const deliveryPersonDeliveries = await this.prisma.delivery.findMany({
      where: {
        deliveryPersonId,
      },
      include: {
        package: true,
      },
    })

    const deliveriesWithCoordinates = await Promise.all(
      deliveryPersonDeliveries.map(async (delivery) => {
        const coordinate = await this.geocoder.geocode(
          new Address({
            city: delivery.package.city,
            neighborhood: delivery.package.neighborhood,
            number: delivery.package.number,
            state: delivery.package.state,
            street: delivery.package.street,
            zipCode: delivery.package.zipCode,
          }).toValue(),
        )

        return {
          deliveryId: delivery.id.toString(),
          coordinate,
        }
      }),
    )

    const nearbyDeliveriesIds = deliveriesWithCoordinates
      .filter((delivery) => {
        const distanceInKilometers = getDistanceBetweenCoordinates(
          {
            latitude: deliveryPersonCoordinate.latitude,
            longitude: deliveryPersonCoordinate.longitude,
          },
          {
            latitude: delivery.coordinate.latitude,
            longitude: delivery.coordinate.longitude,
          },
        )

        return distanceInKilometers < 5
      })
      .map((delivery) => delivery.deliveryId)

    const nearbyDeliveries = await Promise.all(
      nearbyDeliveriesIds.map(async (deliveryId) => {
        return await this.findById(deliveryId)
      }),
    )

    return nearbyDeliveries.filter((delivery) => !!delivery)
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
