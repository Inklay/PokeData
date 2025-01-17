import { Item } from './class/item.ts'
import { Ability } from './class/ability.ts'
import { Pokemon } from './class/pokemon.ts'

export class DataPackage {
  constructor (abilities : Ability[], items : Item[], pokemon : Pokemon[]) {
    this.abilities = abilities
    this.items = items
    this.pokemon = pokemon
  }
  
  public abilities : Ability[]
  public items : Item[]
  public pokemon : Pokemon[]
}
