import {
  BadRequestException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch
} from "@nestjs/common"
import { z } from "zod"

import { PostPackageUseCase } from "@/domain/delivery/application/use-cases/post-package"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const postPackageParamsSchema = z.object({
  id: z.string().uuid(),
})

const paramsValidationPipe = new ZodValidationPipe(postPackageParamsSchema)

type PostPackageParams = z.infer<typeof postPackageParamsSchema>

@Controller("/deliveries/:id/post")
export class PostPackageController {
  constructor(private postPackage: PostPackageUseCase) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param(paramsValidationPipe) { id }: PostPackageParams) {
    const [error] = await this.postPackage.execute({
      deliveryId: id,
    })

    if (error) {
      if (error.code === "RESOURCE_NOT_FOUND") {
        throw new NotFoundException("Delivery not found!")
      }

      throw new BadRequestException()
    }
  }
}
