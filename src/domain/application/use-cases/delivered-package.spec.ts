import { InMemoryDeliveryRepository } from "@/../test/in-memory-repositories/in-memory-delivery-repository"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"
import { Delivery } from "@/domain/enterprise/entities/delivery"
import { DeliveredPackageUseCase } from "./delivered-package"

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let sut: DeliveredPackageUseCase

describe("Delivered Package", () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    sut = new DeliveredPackageUseCase(inMemoryDeliveryRepository)
  })

  it("should be able to mark package as delivered", async () => {
    const deliveryToMarkAsDelivered = Delivery.create({
      packageId: new UniqueId("package-id-1"),
    })

    deliveryToMarkAsDelivered.deliveryPersonId = new UniqueId(
      "delivery-person-id-1",
    )
    deliveryToMarkAsDelivered.pickedUpAt = new Date()

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
        deliveredAt: expect.any(Date),
      }),
    )
  })
})
