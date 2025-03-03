import { EventHandler } from '@/core/events/event-handler'
import { DeliveryPackageStatusChangedEvent } from '@/domain/delivery/enterprise/events/delivery-package-status-changed-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { PackageRepository } from '@/domain/delivery/application/repositories/package-repository'
import { DomainEvents } from '@/core/events/domain-events'

export const DELIVERY_STATUS = {
  returned: 'foi devolvido ao remetente',
  delivered: 'foi entregue ao destinatário',
  picked_up: 'esta em rota de entrega',
  awaiting_pickup: 'esta aguardando retirada',
  uninitialized: 'não foi processado',
} as const

export class OnPackageStatusChanged implements EventHandler {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private packageRepository: PackageRepository,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendChangedPackageStatusNotification.bind(this),
      DeliveryPackageStatusChangedEvent.name,
    )
  }

  private async sendChangedPackageStatusNotification({
    delivery,
  }: DeliveryPackageStatusChangedEvent) {
    const pack = await this.packageRepository.findById(
      delivery.packageId.toString(),
    )

    if (pack) {
      await this.sendNotificationUseCase.execute({
        recipientId: pack.recipientId.toString(),
        title: 'Atualizações do seu pacote!',
        content: `Seu pacote ${DELIVERY_STATUS[delivery.status]}`,
      })
    }
  }
}
