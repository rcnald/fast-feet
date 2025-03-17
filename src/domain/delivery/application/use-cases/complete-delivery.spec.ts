import { makeDelivery } from 'test/factories/make-delivery'
import { FakeGeocoder } from 'test/geolocation/fake-geocoder'

import { InMemoryDeliveryRepository } from '@/../test/in-memory-repositories/in-memory-delivery-repository'
import { InMemoryPackageRepository } from '@/../test/in-memory-repositories/in-memory-package-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'

import { Geocoder } from '../geolocation/geocoder'
import { CompleteDeliveryUseCase } from './complete-delivery'

let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPackageRepository: InMemoryPackageRepository
let fakeGeocoder: Geocoder
let sut: CompleteDeliveryUseCase

describe('Complete Delivery', () => {
  beforeEach(() => {
    fakeGeocoder = new FakeGeocoder()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      inMemoryPackageRepository,
      fakeGeocoder,
    )
    sut = new CompleteDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it('should be able to complete a delivery', async () => {
    const delivery = makeDelivery({
      packagePickedUpAt: new Date(),
      deliveryPersonId: new UniqueId('delivery-person-id-1'),
    })

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryPersonId: 'delivery-person-id-1',
      attachmentId: 'attachment-id-1',
    })

    expect(error).toEqual(undefined)
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryPersonId: delivery.deliveryPersonId,
        packageId: delivery.packageId,
        packagePickedUpAt: expect.any(Date),
        packageDeliveredAt: expect.any(Date),
      }),
    )
  })

  it('should not be able to complete a delivery which not exists', async () => {
    const [error] = await sut.execute({
      deliveryId: 'delivery-id-1',
      deliveryPersonId: 'wrong-delivery-person-id-1',
      attachmentId: 'attachment-id-1',
    })

    expect(error).toEqual({
      code: 'RESOURCE_NOT_FOUND',
    })
  })

  it('should not be able to complete a delivery which not belongs to delivery person', async () => {
    const delivery = makeDelivery({
      packagePickedUpAt: new Date(),
      deliveryPersonId: new UniqueId('delivery-person-id-1'),
    })

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryPersonId: 'wrong-delivery-person-id-1',
      attachmentId: 'attachment-id-1',
    })

    expect(error).toEqual({
      code: 'ACCESS_DENIED',
    })
  })

  it('should not be able to complete a delivery that is not picked up', async () => {
    const delivery = Delivery.create(
      {
        packageId: new UniqueId('package-id-1'),
        deliveryPersonId: new UniqueId('delivery-person-id-1'),
      },
      new UniqueId('delivery-id-1'),
    )

    await inMemoryDeliveryRepository.create(delivery)

    const [error] = await sut.execute({
      deliveryId: delivery.id.toString(),
      deliveryPersonId: 'delivery-person-id-1',
      attachmentId: 'attachment-id-1',
    })

    expect(error).toEqual({
      code: 'STATUS_RESTRICTION',
    })
  })
})
