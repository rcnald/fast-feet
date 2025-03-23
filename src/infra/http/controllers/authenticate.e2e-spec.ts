import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { hash } from "bcryptjs"
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

  test("[POST] /sessions", async () => {
    await deliveryPersonFactory.makePrismaDeliveryPerson({
      cpf: "87481603006",
      password: await hash("password", 8),
    })

    const response = await request(app.getHttpServer()).post("/sessions").send({
      cpf: "87481603006",
      password: "password",
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
