import { AttachmentRepository } from "@/domain/delivery/application/repositories/attachment-repository"
import { Attachment } from "@/domain/delivery/enterprise/entities/attachment"

export class InMemoryAttachmentRepository implements AttachmentRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
