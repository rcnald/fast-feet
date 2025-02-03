import { UniqueId } from "@/domain/delivery/enterprise/entities/value-objects/unique-id"

export class Entity<Props> {
  private _id: UniqueId
  protected props: Props

  protected constructor(props: Props, id?: UniqueId) {
    this.props = props
    this._id = id ?? new UniqueId()
  }

  get id() {
    return this._id
  }

  public equals(entity: Entity<Props>) {
    return entity === this || entity.id === this._id
  }
}
