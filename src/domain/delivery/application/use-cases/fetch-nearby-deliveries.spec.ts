import { makeDelivery } from "test/factories/make-delivery"
import { makePackage } from "test/factories/make-package"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"

import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

import { Geocoder } from "../geolocation/geocoder"
import { FetchNearbyDeliveriesUseCase } from "./fetch-nearby-deliveries"

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
      const pack = makePackage(
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

      const delivery = makeDelivery({
        packageId: pack.id,
        deliveryPersonId: new UniqueId("delivery-person-id-1"),
      })

      inMemoryPackageRepository.create(pack)
      inMemoryDeliveryRepository.create(delivery)
    })

    const [error, result] = await sut.execute({
      deliveryPersonId: "delivery-person-id-1",
      deliveryPersonLatitude: "-22.906847",
      deliveryPersonLongitude: "-43.172896",
    })

    expect(error).toEqual(undefined)
    expect(result?.deliveries).toHaveLength(5)
    expect(result?.deliveries).toEqual(
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
