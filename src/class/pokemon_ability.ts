export class PokemonAbility {
  public id: number
  public isHidden : boolean

  protected constructor (id : number, isHidden : boolean) {
    this.id = id
    this.isHidden = isHidden
  }
}
