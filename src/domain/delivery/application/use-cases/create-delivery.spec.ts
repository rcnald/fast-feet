import { makeDelivery } from 'test/factories/make-delivery'
import { FakeGeocoder } from 'test/geolocation/fake-geocoder'
import { InMemoryPackageRepository } from 'test/in-memory-repositories/in-memory-package-repository'

import { InMemoryDeliveryRepository } from '@/../test/in-memory-repositories/in-memory-delivery-repository'

import { Geocoder } from '../geolocation/geocoder'
import { CreateDeliveryUseCase } from './create-delivery'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: CreateDeliveryUseCase

describe('Post Package', () => {
  beforeEach(() => {
    fakeGeocoder = new FakeGeocoder()
    inMemoryPackageRepository = new InMemoryPackageRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new CreateDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it('should be able to post a package', async () => {
    const [error, result] = await sut.execute({
      packageId: 'package-id-1',
    })

    expect(error).toEqual(undefined)
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        packageId: result?.delivery.packageId,
      }),
    )
  })

  it('should not be able to post a package that was previous posted', async () => {
    const delivery = makeDelivery({ packagePostedAt: new Date() })

    inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      packageId: delivery.packageId.toString(),
    })

    expect(error).toEqual({
      code: 'RESOURCE_ALREADY_EXISTS',
    })
  })
})
