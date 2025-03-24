import { Module } from "@nestjs/common"

import { DeliveryPersonRepository } from "@/domain/delivery/application/repositories/delivery-person-repository"
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository"
import { UserRepository } from "@/domain/delivery/application/repositories/user-repository"

import { PrismaService } from "./prisma/prisma.service"
import { PrismaDeliveryPersonRepository } from "./prisma/repositories/prisma-delivery-person-repository"
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository"
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository"

@Module({
  providers: [
    PrismaService,
    {
      provide: DeliveryPersonRepository,
      useClass: PrismaDeliveryPersonRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository,
    },
  ],
  exports: [
    PrismaService,
    DeliveryPersonRepository,
    UserRepository,
    RecipientRepository,
  ],
})
export class DatabaseModule {}
