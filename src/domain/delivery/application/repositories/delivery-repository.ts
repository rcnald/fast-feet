import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"

export abstract class DeliveryRepository {
  abstract create(pack: Delivery): Promise<void>
  abstract findByPackageId(packageId: string): Promise<Delivery | null>
  abstract findById(id: string): Promise<Delivery | null>
  abstract save(delivery: Delivery): Promise<void>
  abstract findManyNearbyByDeliveryPersonId(
    deliveryPersonCoordinate: {
      latitude: number
      longitude: number
    },
    deliveryPersonId: string,
  ): Promise<Delivery[]>

  abstract findManyByRecipientId(recipientId: string): Promise<Delivery[]>
}
