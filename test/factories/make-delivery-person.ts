import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/delivery/enterprise/entities/delivery-person'
import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'
import { randomUUID } from 'crypto'

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueId,
) {
  const deliveryPerson = DeliveryPerson.create(
    {
      name: 'John Doe',
      cpf: '77586573034',
      password: randomUUID(),
      ...override,
    },
    id,
  )

  return deliveryPerson
}
