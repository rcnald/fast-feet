import {
  Recipient,
  RecipientProps,
} from "@/domain/delivery/enterprise/entities/recipient"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueId,
) {
  const recipient = Recipient.create({ name: "John Doe", ...override }, id)

  return recipient
}
