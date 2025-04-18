import { Body, Controller, HttpCode, Post } from "@nestjs/common"
import { z } from "zod"

import { RegisterRecipientUseCase } from "@/domain/delivery/application/use-cases/register-recipient"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const registerRecipientBodySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(registerRecipientBodySchema)

type RegisterRecipientBody = z.infer<typeof registerRecipientBodySchema>

@Controller("/recipients")
export class RegisterRecipientController {
  constructor(private registerRecipient: RegisterRecipientUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: RegisterRecipientBody) {
    const { name } = body

    await this.registerRecipient.execute({
      name,
    })
  }
}
