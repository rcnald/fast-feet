import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { CreatePackageUseCase } from "./create-package"
import { makePackage } from "test/factories/make-package"

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: CreatePackageUseCase

describe("Create Package", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new CreatePackageUseCase(inMemoryPackageRepository)
  })

  it("should be able to create a package", async () => {
    const pack = makePackage()

    const [error, result] = await sut.execute({
      recipientId: pack.recipientId.toString(),
      deliveryAddress: pack.deliveryAddress,
    })

    expect(error).toEqual(undefined)
    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: result?.pack.recipientId,
      }),
    )
  })
})
