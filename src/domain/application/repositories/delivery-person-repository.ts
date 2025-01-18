import { DeliveryPerson } from "@/domain/enterprise/entities/delivery-person"

export abstract class DeliveryPersonRepository {
  abstract create(pack: DeliveryPerson): Promise<void>
}
