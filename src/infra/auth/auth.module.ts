import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { EnvModule } from "../env/env.module"
import { EnvService } from "../env/env.service"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      imports: [EnvModule],
      global: true,
      useFactory(config: EnvService) {
        const publicKey = config.get("PUBLIC_KEY")
        const privateKey = config.get("PRIVATE_KEY")

        return {
          signOptions: { algorithm: "RS256" },
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64"),
        }
      },
    }),
  ],
  providers: [JwtStrategy, EnvService],
})
export class AuthModule {}
