import { makeDelivery } from "test/factories/make-delivery"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"

import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"

import { Geocoder } from "../geolocation/geocoder"
import { PostPackageUseCase } from "./post-package"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: PostPackageUseCase

describe("Post Package", () => {
  beforeEach(() => {
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new PostPackageUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to post a package", async () => {
    const delivery = makeDelivery()

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        packageId: delivery.packageId,
        packagePostedAt: expect.any(Date),
      }),
    )
  })
})
