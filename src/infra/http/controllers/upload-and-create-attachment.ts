/* eslint-disable no-undef */
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

import { UploadAndCreateAttachmentUseCase } from "@/domain/delivery/application/use-cases/upload-and-create-attachment"

@Controller("/attachments")
export class UploadAndCreateAttachmentController {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2mb
          new FileTypeValidator({ fileType: ".(png|jpg|jpeg|pdf)" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const [error, result] = await this.uploadAndCreateAttachment.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    })

    if (error) {
      if (error.code === "INVALID_FILE_TYPE") {
        throw new BadRequestException("File type not allowed!")
      }

      throw new BadRequestException()
    }

    const { attachment } = result

    return {
      attachmentId: attachment.id.toString(),
    }
  }
}
