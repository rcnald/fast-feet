import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Package } from "@/domain/delivery/enterprise/entities/package"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient"
import { FetchRecipientDeliveriesUseCase } from "./fetch-recipient-deliveries"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: FetchRecipientDeliveriesUseCase

describe("Fetch Recipient Deliveries", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new FetchRecipientDeliveriesUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to fetch recipient deliveries", async () => {
    Recipient.create({ name: "John Doe" }, new UniqueId("recipient-id-1"))

    Array.from({ length: 10 }).forEach((_, index) => {
      const pack = Package.create(
        {
          recipientId:
            index >= 5
              ? new UniqueId("recipient-id-2")
              : new UniqueId("recipient-id-1"),
          deliveryAddress: new Address({
            city: "Sao Paulo",
            state: "SP",
            street: "Rua da avenida",
            neighborhood: "Bairro da esquina",
            number: "13A",
            zipCode: "73674289",
          }),
        },
        new UniqueId(`package-id-${index + 1}`),
      )
      const delivery = Delivery.create({
        packageId: new UniqueId(`package-id-${index + 1}`),
      })

      inMemoryPackageRepository.create(pack)
      inMemoryDeliveryRepository.create(delivery)
    })

    const { deliveries } = await sut.execute({ recipientId: "recipient-id-1" })

    expect(deliveries).toHaveLength(5)
    expect(deliveries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          packageId: new UniqueId("package-id-1"),
        }),
        expect.objectContaining({
          packageId: new UniqueId("package-id-5"),
        }),
      ]),
    )
  })
})
