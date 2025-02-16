import { DeliveryPerson } from "@/domain/delivery/enterprise/entities/delivery-person"
import { InMemoryUserRepository } from "test/in-memory-repositories/in-memory-user-repository"
import { AuthenticateUserUseCase } from "./authenticate"
import { FakeEncrypter } from "test/cryptography/fake-encrypter"
import { FakeHasher } from "test/cryptography/fake-hasher"

let inMemoryUserRepository: InMemoryUserRepository
let hasher: FakeHasher
let encrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe("Authenticate", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    encrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(inMemoryUserRepository, encrypter, hasher)
  })

  it("should be able to authenticate", async () => {
    inMemoryUserRepository.items.push(
      DeliveryPerson.create({
        name: "John Doe",
        cpf: "38979332092",
        password: "password-hashed",
      }),
    )

    const [error, result] = await sut.execute({
      cpf: "38979332092",
      password: "password",
    })

    expect(error).toEqual(undefined)
    expect(result?.token).toEqual(expect.any(String))
  })

  it("should not be able to authenticate with invalid password", async () => {
    inMemoryUserRepository.items.push(
      DeliveryPerson.create({
        name: "John Doe",
        cpf: "38979332092",
        password: "password-hashed",
      }),
    )

    const [error, result] = await sut.execute({
      cpf: "38979332092",
      password: "invalid-password",
    })

    expect(error).toEqual({
      code: "INVALID_CREDENTIALS",
    })
    expect(result?.token).toEqual(undefined)
  })
})
