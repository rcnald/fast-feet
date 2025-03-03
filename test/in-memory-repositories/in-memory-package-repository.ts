import { PackageRepository } from '@/domain/delivery/application/repositories/package-repository'
import { Package } from '@/domain/delivery/enterprise/entities/package'

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = []

  async create(pack: Package) {
    this.items.push(pack)
  }

  async findById(id: string): Promise<Package | null> {
    const pack = this.items.find((pack) => {
      return pack.id.toString() === id
    })

    if (!pack) return null

    return pack
  }

  async save(packToSave: Package): Promise<void> {
    const packIndex = this.items.findIndex((pack) =>
      pack.id.equals(packToSave.id),
    )

    this.items[packIndex] = packToSave
  }

  async findManyByRecipientId(recipientId: string): Promise<Package[]> {
    const pack = this.items.filter((pack) => {
      return pack.recipientId.toString() === recipientId
    })

    return pack
  }
}
