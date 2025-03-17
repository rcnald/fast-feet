import { DeliveryPersonRepository } from "@/domain/delivery/application/repositories/delivery-person-repository"
import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"

export class InMemoryDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  public items: DeliveryPerson[] = []

  async create(deliveryPerson: DeliveryPerson) {
    this.items.push(deliveryPerson)
  }

  async findByCPF(cpf: string): Promise<DeliveryPerson | null> {
    const deliveryPerson = this.items.find((deliveryPerson) => {
      return deliveryPerson.cpf === cpf
    })

    if (!deliveryPerson) return null

    return deliveryPerson
  }
}
