import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"
import { FakeHasher } from "test/cryptography/fake-hasher"
import { InMemoryUserRepository } from "test/in-memory-repositories/in-memory-user-repository"
import { ChangePasswordUseCase } from "./change-password"
import { makeDeliveryPerson } from "test/factories/make-delivery-person"

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
    const user = makeDeliveryPerson({ password: "password-hashed" })

    inMemoryUserRepository.items.push(user)

    const [error] = await sut.execute({
      currentPassword: "password",
      password: "new-password",
      userId: user.id.toString(),
    })

    expect(error).toEqual(undefined)
    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        password: "new-password-hashed",
        id: user.id,
      }),
    )
  })

  it("should not be able to change password with invalid current password", async () => {
    const user = makeDeliveryPerson({ password: "password-hashed" })

    inMemoryUserRepository.items.push(user)

    const [error] = await sut.execute({
      currentPassword: "invalid-current-password",
      password: "new-password",
      userId: user.id.toString(),
    })

    expect(error).toEqual({
      code: "PASSWORD_INVALID",
    })
    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        password: user.password,
        id: user.id,
      }),
    )
  })
})
