import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { ReturnPackageUseCase } from "./return-package"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: ReturnPackageUseCase

describe("Return Package", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new ReturnPackageUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to return a package", async () => {
    const delivery = Delivery.create(
      {
        packageId: new UniqueId("package-id-1"),
        packageDeliveredAt: new Date(),
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
      },
      new UniqueId("delivery-id-1"),
    )

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: "delivery-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
        packageId: new UniqueId("package-id-1"),
        packageDeliveredAt: expect.any(Date),
        packageReturnedAt: expect.any(Date),
      }),
    )
  })
})
