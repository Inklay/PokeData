enum EggGroupEnum {
  'Monster',
  'Water 1',
  'Water 2',
  'Water 3',
  'Bug',
  'Flying',
  'Grass',
  'Human-Like',
  'Mineral',
  'Amorphous',
  'Dragon',
  'Ditto',
  'No Eggs Discovered',
  'Field',
  'Fairy',
  'Gender unknown'
}

export type EggGroup = keyof typeof EggGroupEnum
