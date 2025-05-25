import { bad, nice } from "@/core/error"

import { DeliveryRepository } from "../repositories/delivery-repository"
import { Injectable } from "@nestjs/common"
import { AttachmentsRepository } from "../repositories/attachment-repository"
import { Uploader } from "../storage/uploader"
import { Attachment } from "../../enterprise/entities/attachment"

export interface UploadAndCreateAttachmentsUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

@Injectable()
export class UploadAndCreateAttachmentsUseCase {
  constructor(private attachmentRepository: AttachmentsRepository, private uploader: Uploader) {}

  async execute({ fileName, fileType, body }: UploadAndCreateAttachmentsUseCaseRequest) {
    const isFileTypeValidRegex = /^(image\/(jpeg|png))$|^application\/pdf$/

    if (!isFileTypeValidRegex.test(fileType)) {
      return bad({code: "INVALID_FILE_TYPE"})
    }

    const { url } = await this.uploader.upload({fileName,fileType,body})

    const attachment = Attachment.create({
      title: fileName, 
      url
    })

    await this.attachmentRepository.create(attachment)

    return nice({ attachment })
  }
}
