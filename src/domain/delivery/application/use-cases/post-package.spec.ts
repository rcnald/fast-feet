import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"
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
    const delivery = Delivery.create(
      {
        packageId: new UniqueId("packed-id-1"),
      },
      new UniqueId("delivery-id-1"),
    )

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: "delivery-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        packageId: new UniqueId("packed-id-1"),
        packagePostedAt: expect.any(Date),
      }),
    )
  })
})
