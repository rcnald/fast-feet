import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { EnvService } from "./env.service"

@Module({
  imports: [ConfigModule],
  exports: [EnvService],
  providers: [EnvService],
})
export class EnvModule {}
