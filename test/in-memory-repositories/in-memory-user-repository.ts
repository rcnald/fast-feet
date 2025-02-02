import {
  User,
  UserRepository,
} from "@/domain/application/repositories/user-repository"
import { Admin } from "@/domain/enterprise/entities/admin"
import { DeliveryPerson } from "@/domain/enterprise/entities/delivery-person"

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.items.find((user) => {
      return user.cpf === cpf
    })

    if (!user) return null

    return user
  }

  async findById(id: string): Promise<Admin | DeliveryPerson | null> {
    const user = this.items.find((user) => {
      return user.id.toString() === id
    })

    if (!user) return null

    return user
  }

  async save(userToSave: User): Promise<void> {
    const userIndex = this.items.findIndex((pack) =>
      pack.id.equals(userToSave.id),
    )

    this.items[userIndex] = userToSave
  }
}
