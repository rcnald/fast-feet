import {
  BadRequestException,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from "@nestjs/common"
import { z } from "zod"

import { PickUpPackageUseCase } from "@/domain/delivery/application/use-cases/pick-up-package"
import { CurrentUser } from "@/infra/auth/current-user"
import { UserPayload } from "@/infra/auth/jwt.strategy"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const pickUpPackageParamsSchema = z.object({
  id: z.string().uuid(),
})

const paramsValidationPipe = new ZodValidationPipe(pickUpPackageParamsSchema)

type PickUpPackageParams = z.infer<typeof pickUpPackageParamsSchema>

@Controller("/deliveries/:id/pick-up")
export class PickUpPackageController {
  constructor(private pickUpPackage: PickUpPackageUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(paramsValidationPipe) { id }: PickUpPackageParams,
  ) {
    if (user.role === "ADMIN")
      throw new ForbiddenException("Admin are not allowed to pick up packages!")

    const [error] = await this.pickUpPackage.execute({
      deliveryId: id,
      deliveryPersonId: user.sub,
    })

    if (error) {
      if (error.code === "RESOURCE_NOT_FOUND") {
        throw new NotFoundException("Delivery not found!")
      }

      if (error.code === "DELIVERY_ALREADY_PICKED_UP") {
        throw new ForbiddenException("Delivery already picked up!")
      }

      if (error.code === "STATUS_RESTRICTION") {
        throw new ForbiddenException("Delivery is not ready to be picked up!")
      }

      throw new BadRequestException()
    }
  }
}
