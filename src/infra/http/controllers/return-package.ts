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

import { ReturnPackageUseCase } from "@/domain/delivery/application/use-cases/return-package"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"
import { CurrentUser } from "@/infra/auth/current-user"
import { UserPayload } from "@/infra/auth/jwt.strategy"

const returnPackageParamsSchema = z.object({
  id: z.string().uuid(),
})

const paramsValidationPipe = new ZodValidationPipe(returnPackageParamsSchema)

type ReturnPackageParams = z.infer<typeof returnPackageParamsSchema>

@Controller("/deliveries/:id/return")
export class ReturnPackageController {
  constructor(private returnPackage: ReturnPackageUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user : UserPayload,
    @Param(paramsValidationPipe) { id }: ReturnPackageParams
  ) {

    if(user.role === "DELIVERY_PERSON") throw new ForbiddenException('Only Admin are allowed to return packages!')

    const [error] = await this.returnPackage.execute({
      deliveryId: id,
    })

    if (error) {
      if (error.code === "RESOURCE_NOT_FOUND") {
        throw new NotFoundException("Delivery not found!")
      }

      if (error.code === "STATUS_RESTRICTION") {
        throw new ForbiddenException("Delivery was not complete!")
      }

      throw new BadRequestException()
    }
  }
}
