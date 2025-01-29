import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { CompleteDeliveryUseCase } from "./complete-delivery"
import { Package } from "@/domain/enterprise/entities/package"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "../../../../test/geolocation/fake-geocoder"
import { Address } from "@/domain/enterprise/entities/value-objects/address"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: CompleteDeliveryUseCase

describe("Complete Delivery", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new CompleteDeliveryUseCase(
      inMemoryDeliveryRepository,
      inMemoryPackageRepository,
    )
  })

  it("should be able to complete a delivery", async () => {
    const pack = Package.create({
      recipientId: new UniqueId("recipient-id-1"),
      deliveryAddress: new Address({
        city: "Sao Paulo",
        state: "SP",
        street: "Rua da avenida",
        neighborhood: "Bairro da esquina",
        number: "13A",
        zipCode: "73674289",
      }),
    })

    const deliveryToMarkAsDelivered = Delivery.create({
      packageId: pack.id,
    })

    deliveryToMarkAsDelivered.deliveryPersonId = new UniqueId(
      "delivery-person-id-1",
    )

    pack.pickedUpAt = new Date()

    inMemoryPackageRepository.create(pack)
    inMemoryDeliveryRepository.create(deliveryToMarkAsDelivered)

    const { delivery } = await sut.execute({
      deliveryId: deliveryToMarkAsDelivered.id.toString(),
      deliveryPersonId: "delivery-person-id-1",
      attachmentId: "attachment-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: delivery.deliveryPersonId,
        packageId: delivery.packageId,
      }),
    )
    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        pickedUpAt: expect.any(Date),
        deliveredAt: expect.any(Date),
      }),
    )
  })
})
