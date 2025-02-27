import {
  Package,
  PackageProps,
} from "@/domain/delivery/enterprise/entities/package"
import { Address } from "@/domain/delivery/enterprise/entities/value-objects/address"
import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export function makePackage(
  override: Partial<PackageProps> = {},
  id?: UniqueId,
) {
  const pack = Package.create(
    {
      recipientId: new UniqueId(),
      deliveryAddress: new Address({
        state: "SP",
        city: "Mogi Mirim",
        street: "Rua João Zaniboni",
        neighborhood: "Vila Santa Eliza",
        zipCode: "13801-250",
        number: "13A",
      }),
      ...override,
    },
    id,
  )

  return pack
}
