import { makeDelivery } from 'test/factories/make-delivery'
import { FakeGeocoder } from 'test/geolocation/fake-geocoder'

import { InMemoryDeliveryRepository } from '@/../test/in-memory-repositories/in-memory-delivery-repository'
import { InMemoryPackageRepository } from '@/../test/in-memory-repositories/in-memory-package-repository'
import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'

import { Geocoder } from '../geolocation/geocoder'
import { ReturnPackageUseCase } from './return-package'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: ReturnPackageUseCase

describe('Return Package', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new ReturnPackageUseCase(inMemoryDeliveryRepository)
  })

  it('should be able to return a package', async () => {
    const delivery = makeDelivery({
      packageDeliveredAt: new Date(),
      deliveryPersonId: new UniqueId('delivery-person-id-1'),
    })

    await inMemoryDeliveryRepository.create(delivery)

    await sut.execute({
      deliveryId: delivery.id.toString(),
    })

    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: delivery.deliveryPersonId,
        packageId: delivery.packageId,
        packageDeliveredAt: expect.any(Date),
        packageReturnedAt: expect.any(Date),
      }),
    )
  })
})
