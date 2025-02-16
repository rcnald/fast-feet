import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { CreatePackageUseCase } from "./create-package"

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: CreatePackageUseCase

describe("Create Package", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new CreatePackageUseCase(inMemoryPackageRepository)
  })

  it("should be able to create a package", async () => {
    const [error, result] = await sut.execute({
      recipientId: "recipient-1",
      deliveryAddress: {
        city: "Sao Paulo",
        state: "SP",
        street: "Rua da avenida",
        neighborhood: "Bairro da esquina",
        number: "13A",
        zipCode: "73674289",
      },
    })

    expect(error).toEqual(undefined)
    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: result?.pack.recipientId,
      }),
    )
  })
})
