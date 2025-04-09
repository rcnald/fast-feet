import {
  BadRequestException,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common"
import { z } from "zod"

import { CompleteDeliveryUseCase } from "@/domain/delivery/application/use-cases/complete-delivery"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"
import { CurrentUser } from "@/infra/auth/current-user"
import { UserPayload } from "@/infra/auth/jwt.strategy"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

const completeDeliveryParamsSchema = z.object({
  id: z.string().uuid(),
})

const paramsValidationPipe = new ZodValidationPipe(completeDeliveryParamsSchema)

type CompleteDeliveryParams = z.infer<typeof completeDeliveryParamsSchema>

@Controller("/deliveries/:id/complete")
export class CompleteDeliveryController {
  constructor(private completeDelivery: CompleteDeliveryUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user : UserPayload,
    @Param(paramsValidationPipe) { id }: CompleteDeliveryParams
  ) {

    if(user.role === "ADMIN") throw new ForbiddenException('Admin are not allowed to pick up packages!')

    const [error] = await this.completeDelivery.execute({
      deliveryId: id,
      deliveryPersonId: user.sub,
      attachmentId: new UniqueId().toString()
    })

    if (error) {
      if (error.code === "RESOURCE_NOT_FOUND") {
        throw new NotFoundException("Delivery not found!")
      }

      if (error.code === "DELIVERY_ALREADY_PICKED_UP") {
        throw new ForbiddenException("Delivery already picked up!")
      }

      if (error.code === "STATUS_RESTRICTION") {
        throw new ForbiddenException("Delivery is not picked up yet!")
      }

      throw new BadRequestException()
    }
  }
}
