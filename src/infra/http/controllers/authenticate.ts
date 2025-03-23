import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from "@nestjs/common"
import { z } from "zod"

import { AuthenticateUserUseCase } from "@/domain/delivery/application/use-cases/authenticate"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const AuthenticateBodySchema = z.object({
  cpf: z.string().min(11).max(11),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(AuthenticateBodySchema)

type AuthenticateBody = z.infer<typeof AuthenticateBodySchema>

@Controller("/sessions")
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: AuthenticateBody) {
    const { cpf, password } = body

    const [error, result] = await this.authenticateUser.execute({
      cpf,
      password,
    })

    if (error) {
      if (error.code === "INVALID_CREDENTIALS") {
        throw new NotFoundException("Invalid credentials!")
      }

      throw new InternalServerErrorException()
    }

    return { token: result.token }
  }
}
