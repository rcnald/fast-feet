import { InMemoryPackageRepository } from "@/../test/in-memory-repositories/in-memory-package-repository"
import { Package } from "@/domain/enterprise/entities/package"
import { MarkPackageAsAwaitingToPickUpUseCase } from "./mark-package-as-awaiting-to-pick-up"
import { UniqueId } from "@/domain/enterprise/entities/value-objects/unique-id"

let inMemoryPackageRepository: InMemoryPackageRepository
let sut: MarkPackageAsAwaitingToPickUpUseCase

describe("Mark Package as 'awaiting to pickup'", () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    sut = new MarkPackageAsAwaitingToPickUpUseCase(inMemoryPackageRepository)
  })

  it("should be able to mark a package as 'awaiting to pickup'", async () => {
    const pack = Package.create({
      recipientId: new UniqueId("recipient-1"),
      deliveryAddress: {
        city: "Sao Paulo",
        state: "SP",
        street: "Rua da avenida",
        neighborhood: "Bairro da esquina",
        number: "13A",
        zipCode: "73674289",
      },
    })

    await inMemoryPackageRepository.create(pack)

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: pack.recipientId,
        status: "uninitialized",
      }),
    )

    await sut.execute({ packageId: pack.id.toString() })

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: pack.recipientId,
        status: "awaiting_pickup",
      }),
    )
  })

  it("should not be able to mark a package as 'awaiting to pickup' if it's status isn't 'uninitialized'", async () => {
    const pack = Package.create({
      recipientId: new UniqueId("recipient-1"),
      deliveryAddress: {
        city: "Sao Paulo",
        state: "SP",
        street: "Rua da avenida",
        neighborhood: "Bairro da esquina",
        number: "13A",
        zipCode: "73674289",
      },
    })

    await inMemoryPackageRepository.create(pack)

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: pack.recipientId,
        status: "uninitialized",
      }),
    )

    await sut.execute({ packageId: pack.id.toString() })

    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: pack.recipientId,
        status: "awaiting_pickup",
      }),
    )
  })
})
