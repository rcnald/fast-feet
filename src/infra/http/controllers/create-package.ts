import { Body, Controller, HttpCode, Post } from "@nestjs/common"
import { z } from "zod"

import { CreatePackageUseCase } from "@/domain/delivery/application/use-cases/create-package"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const createPackageBodySchema = z.object({
  recipient_id: z.string().uuid(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  number: z.string(),
  zip_code: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createPackageBodySchema)

type CreatePackageBody = z.infer<typeof createPackageBodySchema>

@Controller("/packages")
export class CreatePackageController {
  constructor(private createPackage: CreatePackageUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreatePackageBody) {
    const {
      recipient_id,
      street,
      city,
      state,
      neighborhood,
      number,
      zip_code,
    } = body

    await this.createPackage.execute({
      recipientId: recipient_id,
      deliveryAddress: {
        street,
        city,
        state,
        neighborhood,
        number,
        zipCode: zip_code,
      },
    })
  }
}
