import { DeliveryPerson } from "@/domain/enterprise/entities/delivery-person"
import { FakeHasher } from "../../../../test/cryptography/fake-hasher"
import { InMemoryUserRepository } from "../../../../test/in-memory-repositories/in-memory-user-repository"
import { ChangePasswordUseCase } from "./change-password"

let inMemoryUserRepository: InMemoryUserRepository
let hasher: FakeHasher
let sut: ChangePasswordUseCase

describe("Change Password", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    sut = new ChangePasswordUseCase(inMemoryUserRepository, hasher, hasher)
  })

  it("should be able to change password", async () => {
    const user = DeliveryPerson.create({
      name: "John Doe",
      cpf: "38979332092",
      password: "password-hashed",
    })

    inMemoryUserRepository.items.push(user)

    await sut.execute({
      currentPassword: "password",
      password: "new-password",
      userId: user.id.toString(),
    })

    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        password: "new-password-hashed",
        id: user.id,
      }),
    )
  })
})
