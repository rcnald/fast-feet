import { InMemoryAttachmentRepository } from "test/in-memory-repositories/in-memory-attachment-repository"
import { FakeUploader } from "test/storage/fake-uploader"

import { UploadAndCreateAttachmentsUseCase } from "./upload-and-create-attachments"

let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentsUseCase

describe("Upload and create attachment", () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentsUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    )
  })

  it("should be able to upload and create a attachment", async () => {
    const [error, result] = await sut.execute({
      fileName: "attachment-name",
      fileType: "image/png",
      body: Buffer.from(""),
    })

    expect(error).toEqual(undefined)
    expect(result?.attachment).toEqual(
      expect.objectContaining({ title: "attachment-name" }),
    )
  })

  it("should not be able to upload and create a attachment with wrong file type", async () => {
    const [error] = await sut.execute({
      fileName: "attachment-name",
      fileType: "audio/mp3",
      body: Buffer.from(""),
    })

    expect(error).toEqual({
      code: "INVALID_FILE_TYPE",
    })
  })
})
