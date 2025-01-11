import { Package } from "@/domain/enterprise/entities/package"

export abstract class PackageRepository {
  abstract create(pack: Package): Promise<void>
}
