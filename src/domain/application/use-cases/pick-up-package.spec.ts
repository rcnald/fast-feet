import { PickUpPackageUseCase } from "./pick-up-package"
import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Package } from "@/domain/enterprise/entities/package"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "../../../../test/geolocation/fake-geocoder"
import { Address } from "@/domain/enterprise/entities/value-objects/address"

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
    sut = new PickUpPackageUseCase(
      inMemoryDeliveryRepository,
      inMemoryPackageRepository,
    )
  })

  it("should be able to pick up a package", async () => {
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

    const deliveryToPickup = Delivery.create({
      packageId: pack.id,
    })

    inMemoryPackageRepository.create(pack)
    inMemoryDeliveryRepository.create(deliveryToPickup)

    const { delivery } = await sut.execute({
      deliveryId: deliveryToPickup.id.toString(),
      deliveryPersonId: "delivery-person-id-1",
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
      }),
    )
  })
})
