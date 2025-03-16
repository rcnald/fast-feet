import { Module } from '@nestjs/common'
import { EnvService } from './env.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule],
  exports: [EnvService],
  providers: [EnvService],
})
export class EnvModule {}
