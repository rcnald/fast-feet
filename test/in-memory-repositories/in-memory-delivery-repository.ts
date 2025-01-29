import { Geocoder } from "@/domain/application/geolocation/geocoder"
import { DeliveryRepository } from "@/domain/application/repositories/delivery-repository"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "./in-memory-package-repository"
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates"
import { Address } from "@/domain/enterprise/entities/value-objects/address"

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

  constructor(
    private packageRepository: InMemoryPackageRepository,
    private geocoder: Geocoder,
  ) {}

  async create(delivery: Delivery) {
    this.items.push(delivery)
  }

  async findByPackageId(packageId: string): Promise<Delivery | null> {
    const delivery = this.items.find(
      (delivery) => delivery.packageId.toString() === packageId,
    )

    if (!delivery) return null

    return delivery
  }

  async findById(id: string): Promise<Delivery | null> {
    const delivery = this.items.find(
      (delivery) => delivery.id.toString() === id,
    )

    if (!delivery) return null

    return delivery
  }

  async save(delivery: Delivery): Promise<void> {
    const deliveryIndex = this.items.findIndex((pack) =>
      pack.id.equals(delivery.id),
    )

    this.items[deliveryIndex] = delivery
  }

  async findManyNearbyByDeliveryPersonId(
    deliveryPersonCoordinate: {
      latitude: number
      longitude: number
    },
    deliveryPersonId: string,
  ) {
    const deliveryWithCoordinate = await Promise.all(
      this.items
        .filter((delivery) => {
          return delivery.deliveryPersonId?.toString() === deliveryPersonId
        })
        .map(async (delivery) => {
          const pack = await this.packageRepository.findById(
            delivery.packageId.toString(),
          )

          if (!pack) return

          const coordinate = await this.geocoder.geocode(
            new Address(pack.deliveryAddress).toValue(),
          )
          return {
            deliveryId: delivery.id.toString(),
            coordinate,
          }
        }),
    )

    const nearbyDeliveriesIds = deliveryWithCoordinate
      .filter((delivery) => {
        if (!delivery) return false

        const distance = getDistanceBetweenCoordinates(
          {
            latitude: deliveryPersonCoordinate.latitude,
            longitude: deliveryPersonCoordinate.longitude,
          },
          {
            latitude: delivery.coordinate.latitude,
            longitude: delivery.coordinate.longitude,
          },
        )

        return distance < 5
      })
      .filter((delivery) => !!delivery)
      .map((delivery) => delivery.deliveryId)

    const nearbyDeliveries = await Promise.all(
      nearbyDeliveriesIds.map((deliveryId) => {
        return this.findById(deliveryId)
      }),
    )

    return nearbyDeliveries.filter((delivery) => !!delivery)
  }
}
