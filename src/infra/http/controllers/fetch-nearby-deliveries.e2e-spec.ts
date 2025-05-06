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
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"

describe("Fetch nearby deliveries (E2E)", () => {
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

  test("[GET] /deliveries/nearby", async () => {
    const { token, deliveryPerson } =
      await deliveryPersonFactory.makeAndAuthenticatePrismaDeliveryPerson()
    const recipient = await recipientFactory.makePrismaRecipient()
    const packFar = await packageFactory.makePrismaPackage({
      recipientId: new UniqueId(recipient.id),
    })

    const packNearby = await packageFactory.makePrismaPackage({
      recipientId: new UniqueId(recipient.id),
      deliveryAddress: new Address({
        city: "São Paulo",
        neighborhood: "Sumaré",
        number: "218",
        state: "SP",
        street: "Rua André Dreifus",
        zipCode: "01252010"
      })
    })

    const packNearbyTwo = await packageFactory.makePrismaPackage({
      recipientId: new UniqueId(recipient.id),
      deliveryAddress: new Address({
        city: "São Paulo",
        neighborhood: "Sumaré",
        number: "198 ",
        state: "SP",
        street: "Rua Zaíra",
        zipCode: "01252060"
      })
    })

    await deliveryFactory.makePrismaDelivery({
      packageId: new UniqueId(packNearby.id),
      packagePickedUpAt: new Date(),
      deliveryPersonId: new UniqueId(deliveryPerson.id)
    })

    await deliveryFactory.makePrismaDelivery({
      packageId: new UniqueId(packFar.id),
      packagePickedUpAt: new Date(),
      deliveryPersonId: new UniqueId(deliveryPerson.id),
    })
    
    await deliveryFactory.makePrismaDelivery({
      packageId: new UniqueId(packNearbyTwo.id),
      packagePickedUpAt: new Date(),
      deliveryPersonId: new UniqueId(deliveryPerson.id),
    })

    const response = await request(app.getHttpServer())
      .get("/deliveries/nearby")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_latitude: "-23.5416314",
        user_longitude: "-46.6823488"
      })

    expect(response.statusCode).toBe(200)
  })
})
