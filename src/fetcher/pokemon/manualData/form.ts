import { Name } from '../../../class/name.ts'

export class ManualDataForm {
  public names : Name[]
  public flavor_texts_keyword : Name[]

  constructor (names : Name[], flavor_texts_keyword : Name[]) {
    this.names = names
    this.flavor_texts_keyword = flavor_texts_keyword
  }
}
