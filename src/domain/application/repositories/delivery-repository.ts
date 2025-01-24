import { Delivery } from "@/domain/enterprise/entities/delivery"

export abstract class DeliveryRepository {
  abstract create(pack: Delivery): Promise<void>
}
