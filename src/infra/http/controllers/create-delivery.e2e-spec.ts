import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { DeliveryPersonFactory } from "test/factories/make-delivery-person"
import { PackageFactory } from "test/factories/make-package"
import { RecipientFactory } from "test/factories/make-recipient"

import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"

describe("Create delivery (E2E)", () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let recipientFactory: RecipientFactory
  let deliveryPersonFactory: DeliveryPersonFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeliveryPersonFactory, PackageFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test("[POST] /deliveries", async () => {
    const { token } =
      await deliveryPersonFactory.makeAndAuthenticatePrismaDeliveryPerson()
    const recipient = await recipientFactory.makePrismaRecipient()
    const pack = await packageFactory.makePrismaPackage({
      recipientId: new UniqueId(recipient.id),
    })

    const response = await request(app.getHttpServer())
      .post("/deliveries")
      .set("Authorization", `Bearer ${token}`)
      .send({
        package_id: pack.id,
      })

    expect(response.statusCode).toBe(201)
  })
})
