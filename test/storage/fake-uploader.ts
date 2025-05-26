import { randomUUID } from "crypto"

import {
  Uploader,
  UploaderParams,
} from "@/domain/delivery/application/storage/uploader"

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  private uploads: Upload[] = []

  async upload({ fileName }: UploaderParams): Promise<{ url: string }> {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url,
    })

    return { url }
  }
}
