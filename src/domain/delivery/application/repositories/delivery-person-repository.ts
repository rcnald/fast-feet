import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"

export abstract class DeliveryPersonRepository {
  abstract create(deliveryPerson: DeliveryPerson): Promise<void>
  abstract findByCPF(cpf: string): Promise<DeliveryPerson | null>
}
