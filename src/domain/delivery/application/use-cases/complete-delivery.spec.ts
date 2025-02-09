import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { CompleteDeliveryUseCase } from "./complete-delivery"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: CompleteDeliveryUseCase

describe("Complete Delivery", () => {
  beforeEach(() => {
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new CompleteDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to complete a delivery", async () => {
    const delivery = Delivery.create(
      {
        packageId: new UniqueId("package-id-1"),
        packagePickedUpAt: new Date(),
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
      },
      new UniqueId("delivery-id-1"),
    )

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: "delivery-id-1",
      deliveryPersonId: "delivery-person-id-1",
      attachmentId: "attachment-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
        packageId: new UniqueId("package-id-1"),
        packagePickedUpAt: expect.any(Date),
        packageDeliveredAt: expect.any(Date),
      }),
    )
  })
})
