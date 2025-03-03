import {
  Delivery,
  DeliveryProps,
} from '@/domain/delivery/enterprise/entities/delivery'
import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueId,
) {
  const delivery = Delivery.create(
    { packageId: new UniqueId(), ...override },
    id,
  )

  return delivery
}
