import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { DeliveryFactory } from "test/factories/make-delivery"
import { DeliveryPersonFactory } from "test/factories/make-delivery-person"
import { PackageFactory } from "test/factories/make-package"
import { RecipientFactory } from "test/factories/make-recipient"

import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"

describe("Complete delivery (E2E)", () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let deliveryPersonFactory: DeliveryPersonFactory
  let recipientFactory: RecipientFactory
  let deliveryFactory: DeliveryFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        DeliveryPersonFactory,
        RecipientFactory,
        PackageFactory,
        DeliveryFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    deliveryPersonFactory = moduleRef.get(DeliveryPersonFactory)
    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test("[PATCH] /deliveries/:id/complete", async () => {
    const { token, deliveryPerson } =
      await deliveryPersonFactory.makeAndAuthenticatePrismaDeliveryPerson()
    const recipient = await recipientFactory.makePrismaRecipient()
    const pack = await packageFactory.makePrismaPackage({
      recipientId: new UniqueId(recipient.id),
    })

    const delivery = await deliveryFactory.makePrismaDelivery({
      packageId: new UniqueId(pack.id),
      packagePickedUpAt: new Date(),
      deliveryPersonId: new UniqueId(deliveryPerson.id),
    })

    const response = await request(app.getHttpServer())
      .patch(`/deliveries/${delivery.id}/complete`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toBe(204)
  })
})
