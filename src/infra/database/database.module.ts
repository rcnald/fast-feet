import { Module } from "@nestjs/common"

import { DeliveryPersonRepository } from "@/domain/delivery/application/repositories/delivery-person-repository"
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository"
import { PackageRepository } from "@/domain/delivery/application/repositories/package-repository"
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository"
import { UserRepository } from "@/domain/delivery/application/repositories/user-repository"

import { PrismaService } from "./prisma/prisma.service"
import { PrismaDeliveryPersonRepository } from "./prisma/repositories/prisma-delivery-person-repository"
import { PrismaDeliveryRepository } from "./prisma/repositories/prisma-delivery-repository"
import { PrismaPackageRepository } from "./prisma/repositories/prisma-package-repository"
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository"
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository"
import { GeolocationModule } from "../geolocation/geolocation.module"

@Module({
  imports: [GeolocationModule],
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
    {
      provide: PackageRepository,
      useClass: PrismaPackageRepository,
    },
    {
      provide: DeliveryRepository,
      useClass: PrismaDeliveryRepository,
    },
  ],
  exports: [
    PrismaService,
    DeliveryPersonRepository,
    UserRepository,
    RecipientRepository,
    PackageRepository,
    DeliveryRepository,
  ],
})
export class DatabaseModule {}
