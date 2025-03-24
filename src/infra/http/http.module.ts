import { Module } from "@nestjs/common"

import { AuthenticateUserUseCase } from "@/domain/delivery/application/use-cases/authenticate"
import { RegisterDeliveryPersonUseCase } from "@/domain/delivery/application/use-cases/register-delivery-person"
import { RegisterRecipientUseCase } from "@/domain/delivery/application/use-cases/register-recipient"

import { CryptographyModule } from "../cryptography/cryptography.module"
import { DatabaseModule } from "../database/database.module"
import { AuthenticateController } from "./controllers/authenticate"
import { CreateAccountController } from "./controllers/create-account"
import { RegisterRecipientController } from "./controllers/register-recipient"

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterRecipientController,
  ],
  providers: [
    RegisterDeliveryPersonUseCase,
    AuthenticateUserUseCase,
    RegisterRecipientUseCase,
  ],
})
export class HTTPModule {}
