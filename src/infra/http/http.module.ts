import { Module } from "@nestjs/common"

import { AuthenticateUserUseCase } from "@/domain/delivery/application/use-cases/authenticate"
import { CreatePackageUseCase } from "@/domain/delivery/application/use-cases/create-package"
import { RegisterDeliveryPersonUseCase } from "@/domain/delivery/application/use-cases/register-delivery-person"
import { RegisterRecipientUseCase } from "@/domain/delivery/application/use-cases/register-recipient"

import { CryptographyModule } from "../cryptography/cryptography.module"
import { DatabaseModule } from "../database/database.module"
import { AuthenticateController } from "./controllers/authenticate"
import { CreateAccountController } from "./controllers/create-account"
import { CreatePackageController } from "./controllers/create-package"
import { RegisterRecipientController } from "./controllers/register-recipient"

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreatePackageController,
  ],
  providers: [
    RegisterDeliveryPersonUseCase,
    AuthenticateUserUseCase,
    RegisterRecipientUseCase,
    CreatePackageUseCase,
  ],
})
export class HTTPModule {}
