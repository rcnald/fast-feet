import { PickUpPackageUseCase } from "./pick-up-package"
import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/enterprise/entities/delivery"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let sut: PickUpPackageUseCase

describe("Pick Up Package", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    sut = new PickUpPackageUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to pick up a package", async () => {
    const deliveryToPickup = Delivery.create({
      packageId: new UniqueId("package-id-1"),
    })

    inMemoryDeliveryRepository.create(deliveryToPickup)

    const { delivery } = await sut.execute({
      deliveryId: deliveryToPickup.id.toString(),
      deliveryPersonId: "delivery-person-id-1",
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: delivery.deliveryPersonId,
        packageId: delivery.packageId,
        pickedUpAt: expect.any(Date),
      }),
    )
  })
})
