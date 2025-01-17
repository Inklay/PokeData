enum PokemonFormTypeEnum {
  'mega',
  'gmax',
  'alola',
  'galar',
  'hisui',
  'paldea',
  'default',
  'other'
}

export type PokemonFormType = keyof typeof PokemonFormTypeEnum
