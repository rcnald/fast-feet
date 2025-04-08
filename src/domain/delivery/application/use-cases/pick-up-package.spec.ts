import { makeDelivery } from "test/factories/make-delivery"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"

import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

import { Geocoder } from "../geolocation/geocoder"
import { PickUpPackageUseCase } from "./pick-up-package"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: PickUpPackageUseCase

describe("Pick Up Package", () => {
  beforeEach(() => {
    fakeGeocoder = new FakeGeocoder()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new PickUpPackageUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to pick up a package", async () => {
    const delivery = makeDelivery({ packagePostedAt: new Date() })

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryPersonId: "delivery-person-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
        packageId: delivery.packageId,
        packagePostedAt: expect.any(Date),
        packagePickedUpAt: expect.any(Date),
      }),
    )
  })

  it("should not be able to pick up a package which belongs to a delivery person", async () => {
    const delivery = makeDelivery({
      packagePostedAt: new Date(),
      deliveryPersonId: new UniqueId("delivery-person-id-2"),
    })

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryPersonId: "delivery-person-id-2",
    })

    expect(error).toEqual({ code: "DELIVERY_ALREADY_PICKED_UP" })
  })

  it("should not be able to pick up a package that its not posted", async () => {
    const delivery = makeDelivery()

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryPersonId: "delivery-person-id-1",
    })

    expect(error).toEqual({ code: "STATUS_RESTRICTION" })
  })
})
