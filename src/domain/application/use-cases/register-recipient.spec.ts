import { InMemoryRecipientRepository } from "@/../test/in-memory-repositories/in-memory-recipient-repository"
import { RegisterRecipientUseCase } from "./register-recipient"

let inMemoryRecipientRepository: InMemoryRecipientRepository
let sut: RegisterRecipientUseCase

describe("Register Recipient", () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    sut = new RegisterRecipientUseCase(inMemoryRecipientRepository)
  })

  it("should be able to register a recipient", async () => {
    await sut.execute({
      name: "John Doe",
    })

    expect(inMemoryRecipientRepository.items[0].name).toEqual("John Doe")
  })
})
