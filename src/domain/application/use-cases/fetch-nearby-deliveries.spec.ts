import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Package } from "@/domain/enterprise/entities/package"
import { Geocoder } from "../geolocation/geocoder"
import { FetchNearbyDeliveriesUseCase } from "./fetch-nearby-deliveries"
import { FakeGeocoder } from "../../../../test/geolocation/fake-geocoder"
import { Address } from "@/domain/enterprise/entities/value-objects/address"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: FetchNearbyDeliveriesUseCase

describe("Fetch Nearby Deliveries", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new FetchNearbyDeliveriesUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to fetch nearby deliveries", async () => {
    Array.from({ length: 10 }).forEach((_, index) => {
      const pack = Package.create(
        {
          recipientId: new UniqueId("recipient-id-1"),
          deliveryAddress: new Address({
            city: index >= 5 ? "rio de janeiro" : "sao paulo",
            state: "SP",
            street: "Rua da avenida",
            neighborhood: "Bairro da esquina",
            number: "13A",
            zipCode: "73674289",
          }),
        },
        new UniqueId(`package-id-${index}`),
      )

      const delivery = Delivery.create({
        packageId: pack.id,
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
      })

      inMemoryPackageRepository.create(pack)
      inMemoryDeliveryRepository.create(delivery)
    })

    const { deliveries } = await sut.execute({
      deliveryPersonId: "delivery-person-id-1",
      deliveryPersonLatitude: "-22.906847",
      deliveryPersonLongitude: "-43.172896",
    })

    expect(deliveries).toHaveLength(5)
    expect(deliveries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          packageId: new UniqueId("package-id-5"),
        }),
        expect.objectContaining({
          packageId: new UniqueId("package-id-9"),
        }),
      ]),
    )
  })
})
