import { UniqueId } from '@/domain/delivery/enterprise/entities/value-objects/unique-id'

export interface DomainEvent {
  occurredAt: Date
  getAggregateId(): UniqueId
}
