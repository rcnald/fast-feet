import { PostPackageUseCase } from "./post-package"
import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let sut: PostPackageUseCase

describe("Post Package", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    sut = new PostPackageUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to post a package", async () => {
    const { delivery } = await sut.execute({
      packageId: "package-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        packageId: delivery.packageId,
      }),
    )
  })

  it("should not be able to post a package that was previous posted", async () => {
    await sut.execute({
      packageId: "package-id-1",
    })

    await expect(() =>
      sut.execute({
        packageId: "package-id-1",
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
