import { Body, Controller, HttpCode, Post } from "@nestjs/common"
import { z } from "zod"

import { CreateDeliveryUseCase } from "@/domain/delivery/application/use-cases/create-delivery"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const createDeliveryBodySchema = z.object({
  package_id: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(createDeliveryBodySchema)

type CreateDeliveryBody = z.infer<typeof createDeliveryBodySchema>

@Controller("/deliveries")
export class CreateDeliveryController {
  constructor(private createDelivery: CreateDeliveryUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateDeliveryBody) {
    const { package_id } = body

    await this.createDelivery.execute({
      packageId: package_id,
    })
  }
}
