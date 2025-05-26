import { Module } from "@nestjs/common"

import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository"
import { DeliveryPersonRepository } from "@/domain/delivery/application/repositories/delivery-person-repository"
import { DeliveryRepository } from "@/domain/delivery/application/repositories/delivery-repository"
import { PackageRepository } from "@/domain/delivery/application/repositories/package-repository"
import { RecipientRepository } from "@/domain/delivery/application/repositories/recipient-repository"
import { UserRepository } from "@/domain/delivery/application/repositories/user-repository"

import { GeolocationModule } from "../geolocation/geolocation.module"
import { PrismaService } from "./prisma/prisma.service"
import { PrismaAttachmentRepository } from "./prisma/repositories/prisma-attachment-repository"
import { PrismaDeliveryPersonRepository } from "./prisma/repositories/prisma-delivery-person-repository"
import { PrismaDeliveryRepository } from "./prisma/repositories/prisma-delivery-repository"
import { PrismaPackageRepository } from "./prisma/repositories/prisma-package-repository"
import { PrismaRecipientRepository } from "./prisma/repositories/prisma-recipient-repository"
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository"

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
    {
      provide: AttachmentRepository,
      useClass: PrismaAttachmentRepository,
    },
  ],
  exports: [
    PrismaService,
    DeliveryPersonRepository,
    UserRepository,
    RecipientRepository,
    PackageRepository,
    DeliveryRepository,
    AttachmentRepository,
  ],
})
export class DatabaseModule {}
