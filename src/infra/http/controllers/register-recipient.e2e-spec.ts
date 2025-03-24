import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { DeliveryPersonFactory } from "test/factories/make-delivery-person"

import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"

describe("Create account (E2E)", () => {
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

  test("[POST] /recipients", async () => {
    const { token } =
      await deliveryPersonFactory.makeAndAuthenticatePrismaDeliveryPerson()

    const response = await request(app.getHttpServer())
      .post("/recipients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John Doe",
      })

    expect(response.statusCode).toBe(201)
  })
})
