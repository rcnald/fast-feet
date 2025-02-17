import { FakeGeocoder } from "test/geolocation/fake-geocoder"
import { InMemoryPackageRepository } from "test/in-memory-repositories/in-memory-package-repository"
import { Geocoder } from "../geolocation/geocoder"
import { CreateDeliveryUseCase } from "./create-delivery"
import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: CreateDeliveryUseCase

describe("Post Package", () => {
  beforeEach(() => {
    fakeGeocoder = new FakeGeocoder()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to post a package", async () => {
    const [error, result] = await sut.execute({
      packageId: "package-id-1",
    })

    expect(error).toEqual(undefined)
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        packageId: result?.delivery.packageId,
      }),
    )
  })

  it("should not be able to post a package that was previous posted", async () => {
    await sut.execute({
      packageId: "package-id-1",
    })

    const [error] = await sut.execute({
      packageId: "package-id-1",
    })

    expect(error).toEqual({
      code: "RESOURCE_ALREADY_EXISTS",
    })
  })
})
