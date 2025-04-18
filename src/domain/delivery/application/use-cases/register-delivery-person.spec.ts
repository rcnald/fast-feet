import { FakeHasher } from "test/cryptography/fake-hasher"
import { makeDeliveryPerson } from "test/factories/make-delivery-person"
import { InMemoryDeliveryPersonRepository } from "test/in-memory-repositories/in-memory-delivery-person-repository"

import { RegisterDeliveryPersonUseCase } from "./register-delivery-person"

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let hasher: FakeHasher
let sut: RegisterDeliveryPersonUseCase

describe("Register Delivery Person", () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    hasher = new FakeHasher()
    sut = new RegisterDeliveryPersonUseCase(
      inMemoryDeliveryPersonRepository,
      hasher,
    )
  })

  it("should be able to register a delivery person", async () => {
    await sut.execute({
      name: "John Doe",
      cpf: "38979332092",
      password: "password",
    })

    expect(inMemoryDeliveryPersonRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "John Doe",
        cpf: "38979332092",
      }),
    )
  })

  it("should be able to hash delivery person password", async () => {
    const [error, result] = await sut.execute({
      name: "John Doe",
      cpf: "38979332092",
      password: "password",
    })

    const hashedPassword = await hasher.hash("password")

    expect(error).toEqual(undefined)
    expect(result?.deliveryPerson.password).toEqual(hashedPassword)
  })

  it("should not be able to register a delivery person with an already registered cpf", async () => {
    const deliveryPerson = makeDeliveryPerson()

    inMemoryDeliveryPersonRepository.create(deliveryPerson)

    const [error] = await sut.execute({
      name: "John Doe",
      cpf: deliveryPerson.cpf,
      password: "password",
    })

    expect(error).toEqual({ code: "RESOURCE_ALREADY_EXISTS" })
  })
})
