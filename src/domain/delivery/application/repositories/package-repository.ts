import { Package } from "@/domain/delivery/enterprise/entities/package"

export abstract class PackageRepository {
  abstract create(pack: Package): Promise<void>
  abstract findById(id: string): Promise<Package | null>
  abstract findManyByRecipientId(recipientId: string): Promise<Package[]>
  abstract save(pack: Package): Promise<void>
}
