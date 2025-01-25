import { Delivery } from "@/domain/enterprise/entities/delivery"

export abstract class DeliveryRepository {
  abstract create(pack: Delivery): Promise<void>
  abstract findByPackageId(packageId: string): Promise<Delivery | null>
  abstract findById(id: string): Promise<Delivery | null>
  abstract save(delivery: Delivery): Promise<void>
}
