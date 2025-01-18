import { DeliveryPersonRepository } from "@/domain/application/repositories/delivery-person-repository"
import { DeliveryPerson } from "@/domain/enterprise/entities/delivery-person"

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson) {
    this.items.push(deliveryPerson)
  }
}
