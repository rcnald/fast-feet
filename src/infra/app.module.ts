import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { AuthModule } from "./auth/auth.module"
import { envSchema } from "./env/env"
import { EnvModule } from "./env/env.module"
import { HTTPModule } from "./http/http.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HTTPModule,
    EnvModule,
    AuthModule,
  ],
})
export class AppModule {}
