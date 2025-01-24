import { DeliveryRepository } from "@/domain/application/repositories/delivery-repository"
import { Delivery } from "@/domain/enterprise/entities/delivery"

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

  async create(delivery: Delivery) {
    this.items.push(delivery)
  }
}
