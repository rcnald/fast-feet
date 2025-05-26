import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"
import { AdminFactory } from "test/factories/make-admin"
import { DeliveryFactory } from "test/factories/make-delivery"
import { PackageFactory } from "test/factories/make-package"
import { RecipientFactory } from "test/factories/make-recipient"

import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"
import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"

describe("Return package (E2E)", () => {
  let app: INestApplication
  let packageFactory: PackageFactory
  let adminFactory: AdminFactory
  let recipientFactory: RecipientFactory
  let deliveryFactory: DeliveryFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        AdminFactory,
        RecipientFactory,
        PackageFactory,
        DeliveryFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    adminFactory = moduleRef.get(AdminFactory)
    packageFactory = moduleRef.get(PackageFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    deliveryFactory = moduleRef.get(DeliveryFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test("[PATCH] /deliveries/:id/return", async () => {
    const { token, admin } = await adminFactory.makeAndAuthenticatePrismaAdmin()
    const recipient = await recipientFactory.makePrismaRecipient()
    const pack = await packageFactory.makePrismaPackage({
      recipientId: new UniqueId(recipient.id),
    })

    const delivery = await deliveryFactory.makePrismaDelivery({
      packageId: new UniqueId(pack.id),
      packageDeliveredAt: new Date(),
      deliveryPersonId: new UniqueId(admin.id),
    })

    const response = await request(app.getHttpServer())
      .patch(`/deliveries/${delivery.id}/return`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toBe(204)
  })
})
