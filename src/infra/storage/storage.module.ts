import { Module } from "@nestjs/common"

import { Uploader } from "@/domain/delivery/application/storage/uploader"

import { EnvModule } from "../env/env.module"
import { TebiStorage } from "./tebi-storage"

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: TebiStorage }],
  exports: [Uploader],
})
export class StorageModule {}
