import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ROLE } from "@prisma/client"
import { ExtractJwt, Strategy } from "passport-jwt"
import { z } from "zod"

import { EnvService } from "../env/env.service"

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  role: z.nativeEnum(ROLE),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get("PUBLIC_KEY")

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    })
  }

  validate(payload: UserPayload): UserPayload {
    return tokenPayloadSchema.parse(payload)
  }
}
