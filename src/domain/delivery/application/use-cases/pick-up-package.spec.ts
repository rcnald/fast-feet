import { PickUpPackageUseCase } from "./pick-up-package"
import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"

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
    const delivery = Delivery.create(
      {
        packageId: new UniqueId("package-id-1"),
        packagePostedAt: new Date(),
      },
      new UniqueId("delivery-id-1"),
    )

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: "delivery-id-1",
      deliveryPersonId: "delivery-person-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
        packageId: new UniqueId("package-id-1"),
        packagePostedAt: expect.any(Date),
        packagePickedUpAt: expect.any(Date),
      }),
    )
  })

  it("should not be able to pick up a package which belongs to a delivery person", async () => {
    const delivery = Delivery.create(
      {
        packageId: new UniqueId("package-id-1"),
        packagePostedAt: new Date(),
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
      },
      new UniqueId("delivery-id-1"),
    )

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: "delivery-id-1",
      deliveryPersonId: "delivery-person-id-2",
    })

    expect(error).toEqual({ code: "ACCESS_DENIED" })
  })

  it("should not be able to pick up a package that its not posted", async () => {
    const delivery = Delivery.create(
      {
        packageId: new UniqueId("package-id-1"),
      },
      new UniqueId("delivery-id-1"),
    )

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: "delivery-id-1",
      deliveryPersonId: "delivery-person-id-1",
    })

    expect(error).toEqual({ code: "STATUS_RESTRICTION" })
  })
})
