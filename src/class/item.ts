import { Name } from './name.ts'

export class Item {
  public id : number
  public names : Name[]

  protected constructor (id : number, names : Name[]) {
    this.id = id
    this.names = names
  }
}
