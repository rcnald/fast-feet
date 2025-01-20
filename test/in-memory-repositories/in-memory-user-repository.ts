import {
  User,
  UserRepository,
} from "@/domain/application/repositories/user-repository"

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByCPF(cpf: string): Promise<User | null> {
    const user = this.items.find((user) => {
      return user.cpf === cpf
    })

    if (!user) return null

    return user
  }
}
