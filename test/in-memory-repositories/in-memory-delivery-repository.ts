import { DeliveryRepository } from "@/domain/application/repositories/delivery-repository"
import { Delivery } from "@/domain/enterprise/entities/delivery"

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

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
}
