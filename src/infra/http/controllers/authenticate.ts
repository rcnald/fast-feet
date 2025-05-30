import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from "@nestjs/common"
import { z } from "zod"

import { AuthenticateUserUseCase } from "@/domain/delivery/application/use-cases/authenticate"
import { Public } from "@/infra/auth/public"

import { ZodValidationPipe } from "../pipes/zod-validate.pipe"

const AuthenticateBodySchema = z.object({
  cpf: z.string().min(11).max(11),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(AuthenticateBodySchema)

type AuthenticateBody = z.infer<typeof AuthenticateBodySchema>

@Public()
@Controller("/sessions")
export class AuthenticateController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @Post()
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

      throw new BadRequestException()
    }

    return { token: result.token }
  }
}
