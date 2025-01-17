import { Name } from './name.ts'

export class Ability {
  protected constructor (id : number, names : Name[]) {
    this.id = id
    this.names = names
  }

  public id : number
  public names : Name[]
}
