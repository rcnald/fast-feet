import { makeDelivery } from 'test/factories/make-delivery'
import { makePackage } from 'test/factories/make-package'
import { makeRecipient } from 'test/factories/make-recipient'
import { FakeGeocoder } from 'test/geolocation/fake-geocoder'

import { InMemoryDeliveryRepository } from '@/../test/in-memory-repositories/in-memory-delivery-repository'
import { InMemoryPackageRepository } from '@/../test/in-memory-repositories/in-memory-package-repository'
import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'

import { Geocoder } from '../geolocation/geocoder'
import { FetchRecipientDeliveriesUseCase } from './fetch-recipient-deliveries'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: FetchRecipientDeliveriesUseCase

describe('Fetch Recipient Deliveries', () => {
  beforeEach(() => {
    inMemoryPackageRepository = new InMemoryPackageRepository()
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new FetchRecipientDeliveriesUseCase(inMemoryDeliveryRepository)
  })

  it('should be able to fetch recipient deliveries', async () => {
    const recipientOne = makeRecipient()
    const recipientTwo = makeRecipient()

    Array.from({ length: 10 }).forEach((_, index) => {
      const pack = makePackage(
        {
          recipientId: index >= 5 ? recipientOne.id : recipientTwo.id,
        },
        new UniqueId(`package-id-${index + 1}`),
      )

      const delivery = makeDelivery({
        packageId: new UniqueId(`package-id-${index + 1}`),
      })

      inMemoryPackageRepository.create(pack)
      inMemoryDeliveryRepository.create(delivery)
    })

    const [_, result] = await sut.execute({
      recipientId: recipientTwo.id.toString(),
    })

    expect(result?.deliveries).toHaveLength(5)
    expect(result?.deliveries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          packageId: new UniqueId('package-id-1'),
        }),
        expect.objectContaining({
          packageId: new UniqueId('package-id-5'),
        }),
      ]),
    )
  })
})
