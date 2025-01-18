import { InMemoryDeliveryPersonRepository } from "../../../../test/in-memory-repositories/in-memory-delivery-person-repository"
import { RegisterDeliveryPersonUseCase } from "./register-delivery-person"

let inMemoryDeliveryPersonRepository: InMemoryDeliveryPersonRepository
let sut: RegisterDeliveryPersonUseCase

describe("Register Delivery Person", () => {
  beforeEach(() => {
    inMemoryDeliveryPersonRepository = new InMemoryDeliveryPersonRepository()
    sut = new RegisterDeliveryPersonUseCase(inMemoryDeliveryPersonRepository)
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
})
