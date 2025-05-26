import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { DeliveryPersonFactory } from "test/factories/make-delivery-person"

import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"

describe("Upload and Create Attachment (E2E)", () => {
  let app: INestApplication
  let deliveryPersonFactory: DeliveryPersonFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test("[POST] /attachments", async () => {
    const { token } =
      await deliveryPersonFactory.makeAndAuthenticatePrismaDeliveryPerson()

    const response = await request(app.getHttpServer())
      .post("/attachments")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", "./test/e2e/blank-page.png")

    expect(response.statusCode).toBe(201)
  })
})
