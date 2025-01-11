import { UniqueId } from "../domain/enterprise/entities/value-objects/unique-id"

export class Entity<Props> {
  private _id: UniqueId
  protected props: Props

  constructor(props: Props, id?: UniqueId) {
    this.props = props
    this._id = id ?? new UniqueId()
  }

  get id() {
    return this._id
  }
}
