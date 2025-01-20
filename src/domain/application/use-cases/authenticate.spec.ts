import { DeliveryPerson } from "@/domain/enterprise/entities/delivery-person"
import { FakeEncrypter } from "../../../../test/cryptography/fake-encrypter"
import { FakeHasher } from "../../../../test/cryptography/fake-hasher"
import { InMemoryUserRepository } from "../../../../test/in-memory-repositories/in-memory-user-repository"
import { AuthenticateUserUseCase } from "./authenticate"

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

  it("should be able to create a package", async () => {
    inMemoryUserRepository.items.push(
      DeliveryPerson.create({
        name: "John Doe",
        cpf: "38979332092",
        password: "password-hashed",
      }),
    )

    const { token } = await sut.execute({
      cpf: "38979332092",
      password: "password",
    })

    expect(token).toEqual(expect.any(String))
  })
})
