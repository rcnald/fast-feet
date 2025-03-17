import { Module } from '@nestjs/common'

import { RegisterDeliveryPersonUseCase } from '@/domain/delivery/application/use-cases/register-delivery-person'

import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController],
  providers: [RegisterDeliveryPersonUseCase],
})
export class HTTPModule {}
