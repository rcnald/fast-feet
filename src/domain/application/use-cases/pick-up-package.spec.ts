import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { PickUpPackageUseCase } from "./pick-up-package"
import { InMemoryDeliveryRepository } from "../../../../test/in-memory-repositories/in-memory-delivery-repository"
import { Package } from "@/domain/enterprise/entities/package"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let sut: PickUpPackageUseCase

describe("Pick Up Package", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    sut = new PickUpPackageUseCase(
      inMemoryPackageRepository,
      inMemoryDeliveryRepository,
    )
  })

  it("should be able to pick up a package", async () => {
    const pack = Package.create({
      recipientId: new UniqueId("recipient-1"),
      deliveryAddress: {
        city: "Sao Paulo",
        state: "SP",
        street: "Rua da avenida",
        neighborhood: "Bairro da esquina",
        number: "13A",
        zipCode: "73674289",
      },
    })

    pack.status = "awaiting_pickup"

    inMemoryPackageRepository.create(pack)

    await sut.execute({
      deliveryPersonId: "delivery-id-1",
      packageId: pack.id.toString(),
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: new UniqueId("delivery-id-1"),
        packageId: pack.id,
      }),
    )
  })

  it("should not be able to pick up a package with a statuses different from 'awaiting_pickup'", async () => {
    const pack = Package.create({
      recipientId: new UniqueId("recipient-1"),
      deliveryAddress: {
        city: "Sao Paulo",
        state: "SP",
        street: "Rua da avenida",
        neighborhood: "Bairro da esquina",
        number: "13A",
        zipCode: "73674289",
      },
    })

    inMemoryPackageRepository.create(pack)

    await expect(() =>
      sut.execute({
        deliveryPersonId: "delivery-id-1",
        packageId: pack.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
