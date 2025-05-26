import { Module } from "@nestjs/common"

import { AuthenticateUserUseCase } from "@/domain/delivery/application/use-cases/authenticate"
import { CompleteDeliveryUseCase } from "@/domain/delivery/application/use-cases/complete-delivery"
import { CreateDeliveryUseCase } from "@/domain/delivery/application/use-cases/create-delivery"
import { CreatePackageUseCase } from "@/domain/delivery/application/use-cases/create-package"
import { FetchNearbyDeliveriesUseCase } from "@/domain/delivery/application/use-cases/fetch-nearby-deliveries"
import { PickUpPackageUseCase } from "@/domain/delivery/application/use-cases/pick-up-package"
import { PostPackageUseCase } from "@/domain/delivery/application/use-cases/post-package"
import { RegisterDeliveryPersonUseCase } from "@/domain/delivery/application/use-cases/register-delivery-person"
import { RegisterRecipientUseCase } from "@/domain/delivery/application/use-cases/register-recipient"
import { ReturnPackageUseCase } from "@/domain/delivery/application/use-cases/return-package"

import { CryptographyModule } from "../cryptography/cryptography.module"
import { DatabaseModule } from "../database/database.module"
import { GeolocationModule } from "../geolocation/geolocation.module"
import { AuthenticateController } from "./controllers/authenticate"
import { CompleteDeliveryController } from "./controllers/complete-delivery"
import { CreateAccountController } from "./controllers/create-account"
import { CreateDeliveryController } from "./controllers/create-delivery"
import { CreatePackageController } from "./controllers/create-package"
import { FetchNearbyDeliveriesController } from "./controllers/fetch-nearby-deliveries"
import { PickUpPackageController } from "./controllers/pick-up-package"
import { PostPackageController } from "./controllers/post-package"
import { RegisterRecipientController } from "./controllers/register-recipient"
import { ReturnPackageController } from "./controllers/return-package"

@Module({
  imports: [DatabaseModule, CryptographyModule, GeolocationModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreatePackageController,
    CreateDeliveryController,
    PostPackageController,
    PickUpPackageController,
    CompleteDeliveryController,
    ReturnPackageController,
    FetchNearbyDeliveriesController,
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
    ReturnPackageUseCase,
    FetchNearbyDeliveriesUseCase,
  ],
})
export class HTTPModule {}
