import type { Type } from './type.ts'
import type { Name } from './name.ts'
import type { Sprite } from './sprite.ts'
import { DexNumber } from './dexNumber.ts'
import type { EggGroup } from './eggGroup.ts'
import { PokemonAbility } from './pokemonAbility.ts'
import type { PokedexEntry } from './pokedexEntry.ts'
import type { PokemonFormType } from './pokemonForm.ts'
import type { Stats } from './stats.ts'

export class Pokemon {
  public dexNumbers! : DexNumber
  public types! : Type[]
  public abilities! : PokemonAbility[]
  public names! : Name[]
  public formType! : PokemonFormType
  public formName! : string
  public sprites! : Sprite[]
  public baseFriendship!: number
  public catchRate!: number
  public eggGroups!: EggGroup[]
  public genderRate!: number
  public growthRate!: string
  public height!: number
  public weight!: number
  public category!: Name[]
  public pokedexEntries!: PokedexEntry[]
  public stats!: Stats[]
}
