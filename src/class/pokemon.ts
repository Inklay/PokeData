import type { Type } from './type.ts'
import type { Name } from './name.ts'
import type { Sprite } from './sprite.ts'
import { DexNumber } from './dexNumber.ts'
import { PokemonAbility } from './pokemonAbility.ts'
import type { PokemonFormType } from './pokemonForm.ts'

export class Pokemon {
  public dex_numbers! : DexNumber
  public types! : Type[]
  public abilities! : PokemonAbility[]
  public names! : Name[]
  public form_type! : PokemonFormType
  public form_name! : string
  public sprites! : Sprite[]
}
