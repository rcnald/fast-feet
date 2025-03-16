import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { HTTPModule } from './http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
    }),
    HTTPModule,
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
