import { Admin } from '@/domain/delivery/enterprise/entities/admin'
import { DeliveryPerson } from '@/domain/delivery/enterprise/entities/delivery-person'

export type User = Admin | DeliveryPerson

export abstract class UserRepository {
  abstract findByCPF(cpf: string): Promise<Admin | DeliveryPerson | null>
  abstract findById(id: string): Promise<Admin | DeliveryPerson | null>
  abstract save(user: User): Promise<void>
}
