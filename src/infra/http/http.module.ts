import { Module } from "@nestjs/common"

import { AuthenticateUserUseCase } from "@/domain/delivery/application/use-cases/authenticate"
import { CreateDeliveryUseCase } from "@/domain/delivery/application/use-cases/create-delivery"
import { CreatePackageUseCase } from "@/domain/delivery/application/use-cases/create-package"
import { PostPackageUseCase } from "@/domain/delivery/application/use-cases/post-package"
import { RegisterDeliveryPersonUseCase } from "@/domain/delivery/application/use-cases/register-delivery-person"
import { RegisterRecipientUseCase } from "@/domain/delivery/application/use-cases/register-recipient"

import { CryptographyModule } from "../cryptography/cryptography.module"
import { DatabaseModule } from "../database/database.module"
import { AuthenticateController } from "./controllers/authenticate"
import { CreateAccountController } from "./controllers/create-account"
import { CreateDeliveryController } from "./controllers/create-delivery"
import { CreatePackageController } from "./controllers/create-package"
import { PostPackageController } from "./controllers/post-package"
import { RegisterRecipientController } from "./controllers/register-recipient"
import { PickUpPackageController } from "./controllers/pick-up-package"
import { PickUpPackageUseCase } from "@/domain/delivery/application/use-cases/pick-up-package"
import { CompleteDeliveryController } from "./controllers/complete-delivery"
import { CompleteDeliveryUseCase } from "@/domain/delivery/application/use-cases/complete-delivery"
import { ReturnPackageController } from "./controllers/return-package"
import { ReturnPackageUseCase } from "@/domain/delivery/application/use-cases/return-package"

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreatePackageController,
    CreateDeliveryController,
    PostPackageController,
    PickUpPackageController,
    CompleteDeliveryController,
    ReturnPackageController
  ],
  providers: [
    RegisterDeliveryPersonUseCase,
    AuthenticateUserUseCase,
    RegisterRecipientUseCase,
    CreatePackageUseCase,
    CreateDeliveryUseCase,
    PostPackageUseCase,
    PickUpPackageUseCase,
    CompleteDeliveryUseCase,
    ReturnPackageUseCase
  ],
})
export class HTTPModule {}
