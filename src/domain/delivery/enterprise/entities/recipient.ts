import { Entity } from '@/core/entities/entity'

import { UniqueId } from './value-objects/unique-id'

export interface RecipientProps {
  name: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  static create(props: RecipientProps, id?: UniqueId) {
    return new Recipient(props, id)
  }
}
