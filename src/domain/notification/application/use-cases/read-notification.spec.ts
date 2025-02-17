import { InMemoryNotificationRepository } from "test/in-memory-repositories/in-memory-notification-repository"
import { ReadNotificationUseCase } from "./read-notification"
import { Notification } from "../../enterprise/entities/notification"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it("should be able to read a notification", async () => {
    inMemoryNotificationsRepository.create(
      Notification.create(
        {
          recipientId: new UniqueId("recipient-id-1"),
          title: "title",
          content: "content",
        },
        new UniqueId("notification-id-1"),
      ),
    )

    const [error] = await sut.execute({
      notificationId: "notification-id-1",
      recipientId: "recipient-id-1",
    })

    expect(error).toEqual(undefined)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it("should not be able to read a notification that is not to recipient", async () => {
    inMemoryNotificationsRepository.create(
      Notification.create(
        {
          recipientId: new UniqueId("recipient-id-1"),
          title: "title",
          content: "content",
        },
        new UniqueId("notification-id-1"),
      ),
    )

    const [error] = await sut.execute({
      notificationId: "notification-id-1",
      recipientId: "recipient-id-2",
    })

    expect(error).toEqual({ code: "ACCESS_DENIED" })
  })
})
