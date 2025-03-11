import { DeliveryPersonRepository } from '@/domain/delivery/application/repositories/delivery-person-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaDeliveryPersonRepository } from './prisma/repositories/prisma-delivery-person-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DeliveryPersonRepository,
      useClass: PrismaDeliveryPersonRepository,
    },
  ],
  exports: [PrismaService, DeliveryPersonRepository],
})
export class DatabaseModule {}
