import { Injectable } from "@nestjs/common"

import { bad, nice } from "@/core/error"

import { Attachment } from "../../enterprise/entities/attachment"
import { AttachmentRepository } from "../repositories/attachment-repository"
import { Uploader } from "../storage/uploader"

export interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest) {
    const isFileTypeValidRegex = /^(image\/(jpeg|png))$|^application\/pdf$/

    if (!isFileTypeValidRegex.test(fileType)) {
      return bad({ code: "INVALID_FILE_TYPE" })
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentRepository.create(attachment)

    return nice({ attachment })
  }
}
