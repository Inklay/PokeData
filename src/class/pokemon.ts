import type { Type } from './type.ts'
import { DexNumber } from './dex_number.ts'
import { PokemonAbility } from './pokemon_ability.ts'

export class Pokemon {
  public dex_numbers!: DexNumber
  public types!: Type[]
  public abilities!: PokemonAbility[]
}
