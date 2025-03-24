import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common"
import { z } from "zod"

import { RegisterDeliveryPersonUseCase } from "@/domain/delivery/application/use-cases/register-delivery-person"
import { Public } from "@/infra/auth/public"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const createAccountBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBody = z.infer<typeof createAccountBodySchema>

@Public()
@Controller("/accounts")
export class CreateAccountController {
  constructor(private registerDeliveryPerson: RegisterDeliveryPersonUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateAccountBody) {
    const { name, cpf, password } = body

    const [error] = await this.registerDeliveryPerson.execute({
      name,
      cpf,
      password,
    })

    if (error) {
      if (error.code === "RESOURCE_ALREADY_EXISTS") {
        throw new ConflictException("User already exists!")
      }

      throw new BadRequestException()
    }
  }
}
