import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Package } from "@/domain/enterprise/entities/package"
import { ReturnPackageUseCase } from "./return-package"
import { Geocoder } from "../geolocation/geocoder"
import { FakeGeocoder } from "../../../../test/geolocation/fake-geocoder"
import { Address } from "@/domain/enterprise/entities/value-objects/address"

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
    sut = new ReturnPackageUseCase(
      inMemoryDeliveryRepository,
      inMemoryPackageRepository,
    )
  })

  it("should be able to return a package", async () => {
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

    const deliveryToReturnPackage = Delivery.create({
      packageId: pack.id,
    })

    deliveryToReturnPackage.deliveryPersonId = new UniqueId(
      "delivery-person-id-1",
    )

    pack.pickedUpAt = new Date()
    pack.deliveredAt = new Date()

    inMemoryPackageRepository.create(pack)
    inMemoryDeliveryRepository.create(deliveryToReturnPackage)

    const { delivery } = await sut.execute({
      deliveryId: deliveryToReturnPackage.id.toString(),
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
        returnedAt: expect.any(Date),
      }),
    )
  })
})
