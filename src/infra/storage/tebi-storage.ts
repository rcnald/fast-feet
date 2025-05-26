import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Injectable } from "@nestjs/common"
import { randomUUID } from "crypto"

import {
  Uploader,
  UploaderParams,
} from "@/domain/delivery/application/storage/uploader"

import { EnvService } from "../env/env.service"

@Injectable()
export class TebiStorage implements Uploader {
  private client: S3Client

  constructor(private envService: EnvService) {
    this.client = new S3Client({
      endpoint: "https://s3.tebi.io",
      region: "global",
      credentials: {
        accessKeyId: envService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: envService.get("AWS_SECRET_KEY"),
      },
    })
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploaderParams): Promise<{ url: string }> {
    const uniqueId = randomUUID()

    const uniqueFileName = `${uniqueId}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get("AWS_BUCKET_NAME"),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    )

    return {
      url: uniqueFileName,
    }
  }
}
