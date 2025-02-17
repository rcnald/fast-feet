import { InMemoryNotificationRepository } from "test/in-memory-repositories/in-memory-notification-repository"
import { SendNotificationUseCase } from "./send-notification"

let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it("should be able to send a notification", async () => {
    const [error, result] = await sut.execute({
      recipientId: "recipient-id-1",
      title: "Nova notificação",
      content: "Conteúdo da notificação",
    })

    expect(error).toBe(undefined)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.notification,
    )
  })
})
