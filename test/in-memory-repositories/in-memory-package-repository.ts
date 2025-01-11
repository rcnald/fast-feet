import { PackageRepository } from "@/domain/application/repositories/package-repository"
import { Package } from "@/domain/enterprise/entities/package"

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = []

  async create(pack: Package) {
    this.items.push(pack)
  }
}
