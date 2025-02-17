import { InMemoryPackageRepository } from "test/in-memory-repositories/in-memory-package-repository"
import { OnPackageStatusChanged } from "./on-package-status-changed"
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
} from "../use-cases/send-notification"
import { InMemoryNotificationRepository } from "test/in-memory-repositories/in-memory-notification-repository"
import { MockInstance } from "vitest"
import { Delivery } from "@/domain/delivery/enterprise/entities/delivery"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { Recipient } from "@/domain/delivery/enterprise/entities/recipient"
import { Package } from "@/domain/delivery/enterprise/entities/package"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { InMemoryRecipientRepository } from "test/in-memory-repositories/in-memory-recipient-repository"
import { InMemoryDeliveryRepository } from "test/in-memory-repositories/in-memory-delivery-repository"
import { FakeGeocoder } from "test/geolocation/fake-geocoder"
import { waitFor } from "@/utils/wait-for"

let inMemoryPackageRepository: InMemoryPackageRepository
let inMemoryRecipientRepository: InMemoryRecipientRepository
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase
let fakeGeocoder: FakeGeocoder

let sendNotificationExecuteSpy: MockInstance<
  (request: SendNotificationUseCaseRequest) => Promise<any>
>

describe("On Package Status Changed", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute")

    new OnPackageStatusChanged(
      sendNotificationUseCase,
      inMemoryPackageRepository,
    )
  })

  it("should send a notification when delivery package status has changed", async () => {
    const recipient = Recipient.create(
      { name: "John Doe" },
      new UniqueId("recipient-id-1"),
    )

    const pack = Package.create(
      {
        recipientId: recipient.id,
        deliveryAddress: new Address({
          city: "Sao Paulo",
          state: "SP",
          street: "Rua da avenida",
          neighborhood: "Bairro da esquina",
          number: "13A",
          zipCode: "73674289",
        }),
      },
      new UniqueId("package-id-1"),
    )

    const delivery = Delivery.create(
      {
        packageId: pack.id,
        packagePostedAt: new Date(),
      },
      new UniqueId("delivery-id-1"),
    )

    inMemoryRecipientRepository.create(recipient)
    inMemoryPackageRepository.create(pack)
    inMemoryDeliveryRepository.create(delivery)

    delivery.packagePickedUp()

    inMemoryDeliveryRepository.save(delivery)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
      expect(inMemoryNotificationRepository.items).toHaveLength(1)
    })
  })
})
