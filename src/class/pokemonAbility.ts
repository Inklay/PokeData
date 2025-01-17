export class PokemonAbility {
  public id: number
  public isHidden : boolean

  public constructor (id : number, isHidden : boolean) {
    this.id = id
    this.isHidden = isHidden
  }
}
