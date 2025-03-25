import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { DeliveryPersonFactory } from "test/factories/make-delivery-person"
import { RecipientFactory } from "test/factories/make-recipient"

import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"

describe("Create package (E2E)", () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test("[POST] /packages", async () => {
    const { token } =
      await deliveryPersonFactory.makeAndAuthenticatePrismaDeliveryPerson()
    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer())
      .post("/packages")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipient_id: recipient.id,
        street: "Rua das Palmeiras",
        city: "São Paulo",
        state: "SP",
        neighborhood: "Bairro Centro",
        number: "123",
        zip_code: "01000-000",
      })

    expect(response.statusCode).toBe(201)
  })
})
